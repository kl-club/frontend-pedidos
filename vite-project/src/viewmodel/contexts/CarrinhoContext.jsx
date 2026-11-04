import { createContext, useContext, useState } from 'react';
import { pontosDoProduto } from '../../model/entities/produto.js';

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [observacao, setObservacao] = useState('');

  function adicionar(produto) {
    setItens(anterior => {
      const existe = anterior.some(item => item.produto.id === produto.id);
      if (!existe) return [...anterior, { produto, quantidade: 1 }];
      return anterior.map(item =>
        item.produto.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
    });
  }

  function diminuir(produtoId) {
    setItens(anterior =>
      anterior
        .map(item =>
          item.produto.id === produtoId ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter(item => item.quantidade > 0)
    );
  }

  function remover(produtoId) {
    setItens(anterior => anterior.filter(item => item.produto.id !== produtoId));
  }

  function limpar() {
    setItens([]);
    setObservacao('');
  }

  const somaCentavos = itens.reduce(
    (soma, item) => soma + Math.round(item.produto.valorUnitario * 100) * item.quantidade,
    0
  );
  const valorTotal = somaCentavos / 100;
  const quantidadeTotal = itens.reduce((soma, item) => soma + item.quantidade, 0);
  const pontosTotal = itens.reduce(
    (soma, item) => soma + pontosDoProduto(item.produto) * item.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        observacao,
        definirObservacao: setObservacao,
        valorTotal,
        quantidadeTotal,
        pontosTotal,
        adicionar,
        diminuir,
        remover,
        limpar,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const contexto = useContext(CarrinhoContext);
  if (!contexto) throw new Error('useCarrinho deve ser usado dentro do CarrinhoProvider');
  return contexto;
}
