import { httpClient } from '../api/httpClient.js';
import { MODALIDADE_TOTEM, ORIGEM_TOTEM } from '../constants/pedidos.js';
import { TOTEM } from '../constants/totem.js';

export async function criar({ formaPagamento, observacao, itens }) {
  const textoObservacao = observacao?.trim();

  const corpo = {
    modalidade: MODALIDADE_TOTEM,
    formaPagamento,
    observacao: textoObservacao || null,
    itens: itens.map(item => ({
      produtoId: item.produto.id,
      quantidade: item.quantidade,
    })),
    origem: {
      tipo: ORIGEM_TOTEM,
      identificacao: TOTEM.identificacao || null,
    },
  };

  const resposta = await httpClient.post('/pedidos', corpo);
  return resposta.data;
}
