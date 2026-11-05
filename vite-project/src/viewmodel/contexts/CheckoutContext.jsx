import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [formaPagamento, setFormaPagamento] = useState(null);
  const [pedido, setPedido] = useState(null);
  // Soma da pontuação dos itens, guardada antes de limpar o carrinho. Sem cliente,
  // a API grava 0 pontos, mas a confirmação mostra essa soma (versão de demonstração).
  const [pontosDoPedido, setPontosDoPedido] = useState(0);

  function concluir(pedidoCriado, pontos) {
    setPedido(pedidoCriado);
    setPontosDoPedido(pontos);
  }

  function reiniciar() {
    setFormaPagamento(null);
    setPedido(null);
    setPontosDoPedido(0);
  }

  return (
    <CheckoutContext.Provider
      value={{
        formaPagamento,
        definirFormaPagamento: setFormaPagamento,
        pedido,
        pontosDoPedido,
        concluir,
        reiniciar,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const contexto = useContext(CheckoutContext);
  if (!contexto) throw new Error('useCheckout deve ser usado dentro do CheckoutProvider');
  return contexto;
}
