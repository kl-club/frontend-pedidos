import { useNavigate } from 'react-router-dom';
import { useCarrinho } from './contexts/CarrinhoContext.jsx';

export function useCarrinhoViewModel() {
  const navigate = useNavigate();
  const carrinho = useCarrinho();

  return {
    itens: carrinho.itens,
    observacao: carrinho.observacao,
    valorTotal: carrinho.valorTotal,
    quantidadeTotal: carrinho.quantidadeTotal,
    pontosAGanhar: carrinho.pontosTotal,
    vazio: carrinho.itens.length === 0,
    aumentar: carrinho.adicionar,
    diminuir: carrinho.diminuir,
    remover: carrinho.remover,
    limpar: carrinho.limpar,
    definirObservacao: carrinho.definirObservacao,
    voltar: () => navigate('/totem'),
    avancar: () => navigate('/totem/pagamento'),
  };
}
