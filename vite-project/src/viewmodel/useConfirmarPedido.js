import { useNavigate } from 'react-router-dom';
import { ehSemConexao, MENSAGEM_SEM_CONEXAO } from '../model/api/httpClient.js';
import { CODIGOS_ERRO_ITEM } from '../model/constants/pedidos.js';
import { estaDisponivel } from '../model/entities/produto.js';
import { listarTodosProdutos } from '../model/services/cardapioService.js';
import { criar } from '../model/services/pedidoService.js';
import { useCarrinho } from './contexts/CarrinhoContext.jsx';
import { useCheckout } from './contexts/CheckoutContext.jsx';

export const MENSAGEM_ERRO_PEDIDO = 'Não foi possível registrar o pedido.';
export const MENSAGEM_VARIOS_INDISPONIVEIS =
  'Alguns produtos ficaram indisponíveis. Remova os itens destacados para continuar.';

/**
 * Cria o pedido com o carrinho atual. Usado pela maquininha (depois da cobrança) e
 * pelo Dinheiro (direto da tela de pagamento).
 *
 * Retorna null quando o fluxo seguiu para outra tela (confirmação ou carrinho) e a
 * mensagem de erro quando a tela atual deve mostrar a falha.
 */
export function useConfirmarPedido() {
  const navigate = useNavigate();
  const carrinho = useCarrinho();
  const { concluir } = useCheckout();

  // A API informa só o primeiro produto recusado, no texto. Para marcar todos, o
  // front consulta os produtos de novo e compara com o carrinho.
  async function marcarItensRecusados(mensagemDaApi) {
    let ids = [];
    try {
      const produtos = await listarTodosProdutos();
      const porId = new Map(produtos.map(produto => [produto.idProduto, produto]));
      ids = carrinho.itens
        .map(item => item.produto.idProduto)
        .filter(id => !estaDisponivel(porId.get(id)));
    } catch {
      // Sem a reconsulta, nenhum item é marcado: fica só a faixa com a mensagem da API.
    }
    const mensagem = ids.length >= 2 ? MENSAGEM_VARIOS_INDISPONIVEIS : mensagemDaApi;
    carrinho.marcarIndisponiveis(ids, mensagem);
  }

  async function confirmar(formaPagamento) {
    try {
      const pedido = await criar({
        formaPagamento,
        observacoes: carrinho.observacao,
        itens: carrinho.itens,
      });
      concluir(pedido, carrinho.pontosTotal);
      navigate('/totem/confirmado', { replace: true });
      carrinho.limpar();
      return null;
    } catch (erro) {
      if (CODIGOS_ERRO_ITEM.includes(erro?.codigo)) {
        await marcarItensRecusados(erro.message);
        navigate('/totem/carrinho', { replace: true });
        return null;
      }
      return ehSemConexao(erro) ? MENSAGEM_SEM_CONEXAO : MENSAGEM_ERRO_PEDIDO;
    }
  }

  return confirmar;
}
