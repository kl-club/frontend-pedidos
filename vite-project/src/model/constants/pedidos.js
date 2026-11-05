// Valores dos enums da API (FormaPagamento, Modalidade e StatusPedido do backend).
export const FORMAS_PAGAMENTO = {
  PIX: 'PIX',
  CREDITO: 'CREDITO',
  DEBITO: 'DEBITO',
  VOUCHER: 'VOUCHER',
  DINHEIRO: 'DINHEIRO',
};

// Ordem dos cards na tela de pagamento (grade 3 + 2).
export const FORMAS_PAGAMENTO_TOTEM = [
  FORMAS_PAGAMENTO.PIX,
  FORMAS_PAGAMENTO.CREDITO,
  FORMAS_PAGAMENTO.DEBITO,
  FORMAS_PAGAMENTO.VOUCHER,
  FORMAS_PAGAMENTO.DINHEIRO,
];

export const ROTULOS_PAGAMENTO_TOTEM = {
  PIX: 'Pix',
  CREDITO: 'Cartão de Crédito',
  DEBITO: 'Cartão de Débito',
  VOUCHER: 'Voucher / VR',
  DINHEIRO: 'Dinheiro',
};

// O totem só atende consumo no local.
export const MODALIDADE_TOTEM = 'LOCAL';

export const ROTULOS_MODALIDADE = {
  LOCAL: 'Comer no local',
};

export const STATUS_PEDIDO = {
  // Pedido em DINHEIRO nasce PENDENTE: o pagamento é feito no balcão.
  PENDENTE: 'PENDENTE',
};

// Erros do POST /pedidos causados por um item do carrinho.
export const CODIGOS_ERRO_ITEM = ['PRODUTO_INDISPONIVEL', 'PRODUTO_NAO_ENCONTRADO'];
