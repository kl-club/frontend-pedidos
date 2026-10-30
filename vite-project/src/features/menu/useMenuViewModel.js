import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { menuRepository } from '../../data/menuRepository';
import { useCart } from '../../store/CartContext';

export function useMenuViewModel() {
  const navigate = useNavigate();
  const cart = useCart();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(undefined);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(function () {
    async function carregarCategorias() {
      try {
        const dados = await menuRepository.getCategories();
        setCategories(dados);
      } catch (erro) {
        setError('Não foi possível carregar as categorias.');
      }
    }
    
    carregarCategorias();
  }, []);

  useEffect(function () {
    async function carregarProdutos() {
      setLoading(true);
      setError('');

      try {
        const dados = await menuRepository.getProducts(selectedCategoryId);
        setProducts(dados);
      } catch (erro) {
        setError('Não foi possível carregar o cardápio.');
      } 
    }
    
    carregarProdutos();
  }, [selectedCategoryId]);

  const produtosFiltrados = products.filter(function (produto) {
    const nomeDoProduto = produto.name.toLowerCase();
    const textoDigitado = search.trim().toLowerCase();
    
    return nomeDoProduto.includes(textoDigitado);
  });

  function goToCart() {
    navigate('/carrinho');
  }

  return {
    categories,
    products: produtosFiltrados,
    selectedCategoryId,
    search,
    loading,
    error,
    cartCount: cart.totalQuantity,
    cartTotalInCents: cart.totalInCents,
    selectCategory: setSelectedCategoryId,
    setSearch,
    addToCart: cart.add,
    goToCart
  };
}