// src/features/cart/useCartViewModel.js
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/CartContext';

export function useCartViewModel() {
  const navigate = useNavigate();
  const cart = useCart();

  return {
    items: cart.items,
    totalInCents: cart.totalInCents,
    isEmpty: cart.items.length == 0,
    increment: product => cart.add(product),
    decrement: cart.decrement,
    remove: cart.remove,
    setNote: cart.setNote,
    goBack: () => navigate('/'),
    continueToPayment: () => navigate('/pagamento/forma'),
  };
}