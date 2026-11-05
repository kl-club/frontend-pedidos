import { useNavigate } from 'react-router-dom';
import { useCarrinho } from './contexts/CarrinhoContext.jsx';

export function useCarrinhoViewModel() {
  const navigate = useNavigate();
  const carrinho = useCarrinho();

  const temIndisponiveis = carrinho.idsIndisponiveis.length > 0;

  // A faixa de erro some ao sair do carrinho; as marcas dos itens continuam.
  function sair(destino) {
    carrinho.fecharAviso();
    navigate(destino);
  }

  return {
    itens: carrinho.itens.map(item => ({
      ...item,
      indisponivel: carrinho.idsIndisponiveis.includes(item.produto.idProduto),
    })),
    observacao: carrinho.observacao,
    valorTotal: carrinho.valorTotal,
    quantidadeTotal: carrinho.quantidadeTotal,
    pontosAGanhar: carrinho.pontosTotal,
    aviso: carrinho.aviso,
    vazio: carrinho.itens.length === 0,
    podeAvancar: carrinho.itens.length > 0 && !temIndisponiveis,
    aumentar: carrinho.adicionar,
    diminuir: carrinho.diminuir,
    remover: carrinho.remover,
    limpar: carrinho.limpar,
    definirObservacao: carrinho.definirObservacao,
    voltar: () => sair('/totem'),
    avancar: () => sair('/totem/pagamento'),
  };
}
