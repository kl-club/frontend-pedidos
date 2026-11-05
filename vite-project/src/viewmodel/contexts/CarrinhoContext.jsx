import { createContext, useContext, useState } from 'react';
import { pontosDoProduto, valorDoItem } from '../../model/entities/produto.js';

const CarrinhoContext = createContext(null);

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [observacao, setObservacao] = useState('');
  // Itens que a API recusou no último pedido (indisponíveis ou inexistentes).
  // Ficam marcados até serem removidos, mesmo que a pessoa saia do carrinho.
  const [idsIndisponiveis, setIdsIndisponiveis] = useState([]);
  // Faixa de erro do carrinho, com o motivo da recusa.
  const [aviso, setAviso] = useState(null);

  // Após mudar os itens: sem nenhum item marcado, a faixa some.
  function aposMudarItens(idsRestantes) {
    if (idsRestantes.length === 0) setAviso(null);
  }

  function adicionar(produto) {
    setItens(anterior => {
      const existe = anterior.some(item => item.produto.idProduto === produto.idProduto);
      if (!existe) return [...anterior, { produto, quantidade: 1 }];
      return anterior.map(item =>
        item.produto.idProduto === produto.idProduto
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    });
    aposMudarItens(idsIndisponiveis);
  }

  function diminuir(idProduto) {
    setItens(anterior =>
      anterior
        .map(item =>
          item.produto.idProduto === idProduto ? { ...item, quantidade: item.quantidade - 1 } : item
        )
        .filter(item => item.quantidade > 0)
    );
    aposMudarItens(idsIndisponiveis);
  }

  function remover(idProduto) {
    setItens(anterior => anterior.filter(item => item.produto.idProduto !== idProduto));
    const idsRestantes = idsIndisponiveis.filter(id => id !== idProduto);
    setIdsIndisponiveis(idsRestantes);
    aposMudarItens(idsRestantes);
  }

  function limpar() {
    setItens([]);
    setObservacao('');
    setIdsIndisponiveis([]);
    setAviso(null);
  }

  function marcarIndisponiveis(ids, mensagem) {
    setIdsIndisponiveis(ids);
    setAviso(mensagem);
  }

  const somaCentavos = itens.reduce(
    (soma, item) => soma + Math.round(valorDoItem(item.produto, item.quantidade) * 100),
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
        idsIndisponiveis,
        aviso,
        fecharAviso: () => setAviso(null),
        marcarIndisponiveis,
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
