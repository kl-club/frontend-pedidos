import { httpClient } from '../api/httpClient.js';
import { MODALIDADE_TOTEM } from '../constants/pedidos.js';

/**
 * POST /pedidos. Envia só os itens (idProduto e quantidade) e os dados do pedido:
 * preço, total, pontos, status e data são calculados pela API.
 * O totem ainda não identifica o cliente, então o pedido vai sem idUsuario.
 */
export async function criar({ formaPagamento, observacoes, itens }) {
  const corpo = {
    modalidade: MODALIDADE_TOTEM,
    formaPagamento,
    observacoes: observacoes?.trim() || null,
    itens: itens.map(item => ({
      idProduto: item.produto.idProduto,
      quantidade: item.quantidade,
    })),
  };

  const resposta = await httpClient.post('/pedidos', corpo);
  return resposta.data;
}
