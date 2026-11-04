export function formatarPorcao(produto) {
  const partes = [];
  if (produto?.porcao) partes.push(produto.porcao);
  if (Number.isFinite(produto?.calorias)) partes.push(`${produto.calorias} kcal`);
  return partes.join(' • ');
}

export function pontosDoProduto(produto) {
  return Number.isFinite(produto?.pontos) ? produto.pontos : 0;
}
