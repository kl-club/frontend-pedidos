const TEMPO_APROVACAO_MS = 4000;

export function cobrar(_valorTotal, _formaPagamento) {
  return new Promise(resolve => {
    setTimeout(() => resolve('APROVADO'), TEMPO_APROVACAO_MS);
  });
}
