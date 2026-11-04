import { createContext, useContext, useState } from 'react';

const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const [formaPagamento, setFormaPagamento] = useState(null);
  const [pedido, setPedido] = useState(null);

  function reiniciar() {
    setFormaPagamento(null);
    setPedido(null);
  }

  return (
    <CheckoutContext.Provider
      value={{
        formaPagamento,
        definirFormaPagamento: setFormaPagamento,
        pedido,
        definirPedido: setPedido,
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
