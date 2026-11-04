export const FORMAS_PAGAMENTO = {
  PIX: 'PIX',
  CARTAO_CREDITO: 'CARTAO_CREDITO',
  CARTAO_DEBITO: 'CARTAO_DEBITO',
  DINHEIRO: 'DINHEIRO',
  VOUCHER: 'VOUCHER',
};

export const FORMAS_PAGAMENTO_TOTEM = [
  FORMAS_PAGAMENTO.PIX,
  FORMAS_PAGAMENTO.CARTAO_CREDITO,
  FORMAS_PAGAMENTO.VOUCHER,
];

export const ROTULOS_PAGAMENTO = {
  PIX: 'PIX Instantâneo',
  CARTAO_CREDITO: 'Cartão de Crédito',
  CARTAO_DEBITO: 'Cartão de Débito',
  DINHEIRO: 'Dinheiro',
  VOUCHER: 'Voucher',
};

export const ROTULOS_PAGAMENTO_TOTEM = {
  PIX: 'Pix',
  CARTAO_CREDITO: 'Cartão de Crédito',
  VOUCHER: 'Voucher / VR',
};

export const MODALIDADES = {
  RETIRADA: 'RETIRADA',
  CONSUMO_LOCAL: 'CONSUMO_LOCAL',
};

export const ROTULOS_MODALIDADE = {
  RETIRADA: 'Retirada Balcão',
  CONSUMO_LOCAL: 'Comer no local',
};

export const MODALIDADE_TOTEM = MODALIDADES.CONSUMO_LOCAL;

export const STATUS_PEDIDO = {
  PAGO: 'PAGO',
};

export const ORIGEM_TOTEM = 'TOTEM';
