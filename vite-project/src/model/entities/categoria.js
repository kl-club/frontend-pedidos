export const ICONE_CATEGORIA_PADRAO = 'restaurant';

// A API não tem ícone de categoria: o ícone vem do nome. Categoria fora do mapa usa o padrão.
// Chaves em minúsculas, com os nomes das categorias do seed (cardápio da KD Lanches).
const ICONES_POR_NOME = {
  'sucos clássicos': 'local_drink',
  'sucos kd saúde': 'eco',
  'vitaminas kd': 'blender',
  'shake de açaí': 'glass_cup',
  'açaí na tigela': 'rice_bowl',
  'japonesinhos kd': 'ramen_dining',
  'tapiocas salgadas': 'tapas',
  'tapiocas doces': 'cake',
  'lanches prensados': 'breakfast_dining',
  'lanches naturais': 'lunch_dining',
  'especiais': 'star',
  'sobremesas': 'icecream',
};

export function iconeDaCategoria(nome) {
  const chave = (nome ?? '').trim().toLowerCase();
  return ICONES_POR_NOME[chave] ?? ICONE_CATEGORIA_PADRAO;
}
