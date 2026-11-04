import {
  ROTULOS_MODALIDADE,
  ROTULOS_PAGAMENTO,
  ROTULOS_PAGAMENTO_TOTEM,
} from '../constants/pedidos.js';

export function formatarMoeda(valor) {
  const numero = Number(valor);
  return (Number.isFinite(numero) ? numero : 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatarPontos(pontos) {
  return `+${pontos} pts`;
}

export function formatarItem(item) {
  return `${item.quantidade}× ${item.nome}`;
}

export function formatarItens(itens) {
  return (itens ?? []).map(formatarItem).join(', ');
}

export function rotuloPagamento(codigo) {
  return ROTULOS_PAGAMENTO[codigo] ?? codigo ?? '';
}

export function rotuloPagamentoTotem(codigo) {
  return ROTULOS_PAGAMENTO_TOTEM[codigo] ?? rotuloPagamento(codigo);
}

export function rotuloModalidade(codigo) {
  return ROTULOS_MODALIDADE[codigo] ?? codigo ?? '';
}
