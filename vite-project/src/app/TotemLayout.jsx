import { Outlet } from 'react-router-dom';
import { CarrinhoProvider } from '../viewmodel/contexts/CarrinhoContext.jsx';
import { CheckoutProvider } from '../viewmodel/contexts/CheckoutContext.jsx';

export function TotemLayout() {
  return (
    <CarrinhoProvider>
      <CheckoutProvider>
        <Outlet />
      </CheckoutProvider>
    </CarrinhoProvider>
  );
}
