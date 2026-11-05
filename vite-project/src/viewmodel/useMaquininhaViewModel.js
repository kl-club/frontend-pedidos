import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatarItens, rotuloPagamentoTotem } from '../model/entities/pedido.js';
import { valorDoItem } from '../model/entities/produto.js';
import { cobrar } from '../model/services/pagamentoService.js';
import { useCarrinho } from './contexts/CarrinhoContext.jsx';
import { useCheckout } from './contexts/CheckoutContext.jsx';
import { useConfirmarPedido } from './useConfirmarPedido.js';

export function useMaquininhaViewModel() {
  const navigate = useNavigate();
  const carrinho = useCarrinho();
  const { formaPagamento } = useCheckout();
  const confirmarPedido = useConfirmarPedido();

  const [etapa, setEtapa] = useState('aguardando');
  const [mensagemErro, setMensagemErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);
  // Depois de uma cobrança aprovada, "Tentar novamente" só reenvia o pedido.
  const cobrancaAprovada = useRef(false);

  // Depende só de `tentativa` de propósito: incluir o carrinho faria cobrar de novo.
  useEffect(() => {
    if (!formaPagamento || carrinho.itens.length === 0) {
      navigate('/totem', { replace: true });
      return;
    }

    let cancelado = false;

    async function pagarEConfirmar() {
      if (!cobrancaAprovada.current) {
        let resultado;
        try {
          resultado = await cobrar(carrinho.valorTotal, formaPagamento);
        } catch {
          resultado = 'RECUSADO';
        }
        if (cancelado) return;

        if (resultado !== 'APROVADO') {
          setEtapa('recusado');
          return;
        }
        cobrancaAprovada.current = true;
      }

      setEtapa('processando');
      const mensagem = await confirmarPedido(formaPagamento);
      if (mensagem && !cancelado) {
        setMensagemErro(mensagem);
        setEtapa('falhou');
      }
    }

    pagarEConfirmar();

    return () => {
      cancelado = true;
    };
  }, [tentativa]);

  const itens = carrinho.itens.map(item => ({
    idProduto: item.produto.idProduto,
    nome: item.produto.nome,
    quantidade: item.quantidade,
    valorTotal: valorDoItem(item.produto, item.quantidade),
  }));

  return {
    etapa,
    mensagemErro: etapa === 'recusado' ? 'Pagamento não aprovado.' : mensagemErro,
    itens,
    descricaoItens: formatarItens(itens),
    valorTotal: carrinho.valorTotal,
    pontosAGanhar: carrinho.pontosTotal,
    formaPagamento,
    rotuloForma: rotuloPagamentoTotem(formaPagamento),
    // Durante o POST, voltar deixaria um pedido criado com o carrinho ainda cheio.
    podeVoltar: etapa !== 'processando',
    tentarNovamente: () => {
      setEtapa(cobrancaAprovada.current ? 'processando' : 'aguardando');
      setTentativa(anterior => anterior + 1);
    },
    trocarForma: () => navigate('/totem/pagamento'),
    cancelar: () => navigate('/totem/carrinho'),
  };
}
