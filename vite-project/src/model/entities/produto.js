export function pontosDoProduto(produto) {
  return Number.isFinite(produto?.pontuacao) ? produto.pontuacao : 0;
}

export function estaDisponivel(produto) {
  return produto?.disponibilidade === true;
}

// Soma em centavos para evitar erro de ponto flutuante (ex.: 3 × 12,90).
export function valorDoItem(produto, quantidade) {
  return (Math.round(Number(produto?.preco ?? 0) * 100) * quantidade) / 100;
}
