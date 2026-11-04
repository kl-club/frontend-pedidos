import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarCategorias, listarProdutos } from '../model/services/cardapioService.js';
import { useCarrinho } from './contexts/CarrinhoContext.jsx';

const MENSAGEM_ERRO = 'Não foi possível carregar o cardápio.';
const BLOCO_INICIAL = { status: 'loading', data: [], error: null };

export function useCardapioViewModel() {
  const navigate = useNavigate();
  const carrinho = useCarrinho();

  const [categorias, setCategorias] = useState(BLOCO_INICIAL);
  const [produtos, setProdutos] = useState(BLOCO_INICIAL);
  const [categoriaSelecionadaId, setCategoriaSelecionadaId] = useState(undefined);
  const [busca, setBusca] = useState('');
  const [tentativa, setTentativa] = useState(0);

  useEffect(() => {
    let cancelado = false;

    listarCategorias()
      .then(dados => {
        if (!cancelado) setCategorias({ status: 'success', data: dados, error: null });
      })
      .catch(() => {
        if (!cancelado) setCategorias({ status: 'error', data: [], error: MENSAGEM_ERRO });
      });

    return () => {
      cancelado = true;
    };
  }, [tentativa]);

  useEffect(() => {
    let cancelado = false;

    listarProdutos(categoriaSelecionadaId)
      .then(dados => {
        if (!cancelado) setProdutos({ status: 'success', data: dados, error: null });
      })
      .catch(() => {
        if (!cancelado) setProdutos({ status: 'error', data: [], error: MENSAGEM_ERRO });
      });

    return () => {
      cancelado = true;
    };
  }, [categoriaSelecionadaId, tentativa]);

  function marcarCarregando(definirBloco) {
    definirBloco(anterior => ({ ...anterior, status: 'loading', error: null }));
  }

  function selecionarCategoria(id) {
    if (id === categoriaSelecionadaId) return;
    marcarCarregando(setProdutos);
    setCategoriaSelecionadaId(id);
  }

  function recarregar() {
    marcarCarregando(setCategorias);
    marcarCarregando(setProdutos);
    setTentativa(anterior => anterior + 1);
  }

  function irParaInicio() {
    setBusca('');
    selecionarCategoria(undefined);
  }

  const textoBusca = busca.trim().toLowerCase();
  const produtosFiltrados = produtos.data.filter(produto =>
    (produto.nome ?? '').toLowerCase().includes(textoBusca)
  );

  return {
    categorias,
    produtos: { ...produtos, data: produtosFiltrados },
    categoriaSelecionadaId,
    selecionarCategoria,
    busca,
    definirBusca: setBusca,
    adicionarAoCarrinho: carrinho.adicionar,
    quantidadeNoCarrinho: carrinho.quantidadeTotal,
    valorTotalCarrinho: carrinho.valorTotal,
    irParaCarrinho: () => navigate('/totem/carrinho'),
    irParaInicio,
    recarregar,
  };
}
