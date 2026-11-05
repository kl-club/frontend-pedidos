import { httpClient } from '../api/httpClient.js';
import { estaDisponivel } from '../entities/produto.js';

// GET /categorias devolve também as inativas, que o totem não mostra.
export async function listarCategoriasAtivas() {
  const resposta = await httpClient.get('/categorias');
  return resposta.data.filter(categoria => categoria.ativo === true);
}

/**
 * Produtos que o cardápio exibe, na ordem da API: sem os de categoria inativa e
 * com os indisponíveis no fim (eles aparecem esmaecidos).
 */
export async function listarProdutosDoCardapio(idCategoria) {
  const params = idCategoria === undefined ? {} : { categoria: idCategoria };
  const resposta = await httpClient.get('/produtos', { params });
  const visiveis = resposta.data.filter(produto => produto.categoria?.ativo === true);
  return [
    ...visiveis.filter(estaDisponivel),
    ...visiveis.filter(produto => !estaDisponivel(produto)),
  ];
}

// Todos os produtos, sem filtro: usado para descobrir quais itens do carrinho a API recusou.
export async function listarTodosProdutos() {
  const resposta = await httpClient.get('/produtos');
  return resposta.data;
}
