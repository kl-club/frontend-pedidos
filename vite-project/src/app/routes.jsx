import { createBrowserRouter, Navigate } from 'react-router-dom';
import { TotemLayout } from './TotemLayout.jsx';
import { CardapioPage } from '../view/pages/CardapioPage/CardapioPage.jsx';
import { CarrinhoPage } from '../view/pages/CarrinhoPage/CarrinhoPage.jsx';
import { FormaPagamentoPage } from '../view/pages/FormaPagamentoPage/FormaPagamentoPage.jsx';
import { MaquininhaPage } from '../view/pages/MaquininhaPage/MaquininhaPage.jsx';
import { PedidoConfirmadoPage } from '../view/pages/PedidoConfirmadoPage/PedidoConfirmadoPage.jsx';

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/totem" replace /> },
  {
    path: '/totem',
    element: <TotemLayout />,
    children: [
      { index: true, element: <CardapioPage /> },
      { path: 'carrinho', element: <CarrinhoPage /> },
      { path: 'pagamento', element: <FormaPagamentoPage /> },
      { path: 'maquininha', element: <MaquininhaPage /> },
      { path: 'confirmado', element: <PedidoConfirmadoPage /> },
      { path: '*', element: <Navigate to="/totem" replace /> },
    ],
  },
]);
