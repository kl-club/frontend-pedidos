import { copyFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import jsonServer from 'json-server';
import { FORMAS_PAGAMENTO, MODALIDADES, STATUS_PEDIDO } from '../src/model/constants/pedidos.js';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const arquivoDb = process.env.MOCK_DB ?? join(raiz, 'db.json');
const arquivoExemplo = join(raiz, 'db.example.json');
const PORTA = Number(process.env.PORT ?? 3001);
const ID_INICIAL_PEDIDO = 1000;

if (!existsSync(arquivoDb)) {
  copyFileSync(arquivoExemplo, arquivoDb);
  console.log('db.json criado a partir de db.example.json');
}

const server = jsonServer.create();
const router = jsonServer.router(arquivoDb);

server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  const atraso = Number(req.query._delay ?? 0);
  const statusErro = Number(req.query._erro ?? 0);
  delete req.query._delay;
  delete req.query._erro;

  setTimeout(() => {
    if (statusErro >= 400) {
      res.status(statusErro).json({ codigo: 'ERRO_SIMULADO', mensagem: `Erro ${statusErro} simulado.` });
      return;
    }
    next();
  }, atraso);
});

function responderErro(res, status, codigo, mensagem) {
  res.status(status).json({ codigo, mensagem });
}

function arredondar(valor) {
  return Math.round(valor * 100) / 100;
}

function agoraComFuso() {
  const agora = new Date();
  const deslocamento = -agora.getTimezoneOffset();
  const sinal = deslocamento >= 0 ? '+' : '-';
  const doisDigitos = numero => String(Math.floor(Math.abs(numero))).padStart(2, '0');
  const local = new Date(agora.getTime() + deslocamento * 60000).toISOString().slice(0, 19);
  return `${local}${sinal}${doisDigitos(deslocamento / 60)}:${doisDigitos(deslocamento % 60)}`;
}

server.post('/pedidos', (req, res) => {
  const { itens, formaPagamento, observacao, modalidade, origem, cliente } = req.body ?? {};
  const db = router.db;

  if (!Array.isArray(itens) || itens.length === 0) {
    return responderErro(res, 400, 'PARAMETRO_INVALIDO', 'O pedido precisa ter ao menos um item.');
  }
  if (!Object.values(FORMAS_PAGAMENTO).includes(formaPagamento)) {
    return responderErro(res, 400, 'PARAMETRO_INVALIDO', 'Forma de pagamento inválida.');
  }
  if (itens.some(item => !Number.isInteger(item?.quantidade) || item.quantidade < 1)) {
    return responderErro(res, 400, 'PARAMETRO_INVALIDO', 'A quantidade de cada item deve ser pelo menos 1.');
  }

  const itensDoPedido = [];
  for (const item of itens) {
    const produto = db.get('produtos').find({ id: item.produtoId }).value();
    if (!produto) {
      return responderErro(res, 404, 'PRODUTO_NAO_ENCONTRADO', `Produto ${item.produtoId} não encontrado.`);
    }
    itensDoPedido.push({
      produtoId: produto.id,
      nome: produto.nome,
      quantidade: item.quantidade,
      valorUnitario: produto.valorUnitario,
      valorTotal: arredondar(produto.valorUnitario * item.quantidade),
    });
  }

  const valorTotal = arredondar(itensDoPedido.reduce((soma, item) => soma + item.valorTotal, 0));
  const maiorId = db.get('pedidos').map('id').max().value() ?? ID_INICIAL_PEDIDO - 1;

  const pedido = {
    id: Math.max(maiorId, ID_INICIAL_PEDIDO - 1) + 1,
    status: STATUS_PEDIDO.PAGO,
    modalidade: modalidade ?? MODALIDADES.RETIRADA,
    criadoEm: agoraComFuso(),
    itens: itensDoPedido,
    observacao: observacao ?? null,
    formaPagamento,
    valorTotal,
    pontosGanhos: Math.floor(valorTotal),
    origem: origem ?? null,
    cliente: cliente ?? null,
  };

  db.get('pedidos').push(pedido).write();
  return res.status(201).json(pedido);
});

server.use(router);

server.listen(PORTA, () => {
  console.log(`Mock da API em http://localhost:${PORTA}`);
});
