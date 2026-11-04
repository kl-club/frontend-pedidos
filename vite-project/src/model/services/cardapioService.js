import { httpClient } from '../api/httpClient.js';

export async function listarCategorias() {
  const resposta = await httpClient.get('/categorias');
  return resposta.data;
}

export async function listarProdutos(categoriaId) {
  const params = categoriaId === undefined ? {} : { categoriaId };
  const resposta = await httpClient.get('/produtos', { params });
  return resposta.data;
}
