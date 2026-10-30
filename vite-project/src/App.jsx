import { useState } from 'react';
import { MenuView } from './features/menu/MenuView';
import { CartView } from './features/cart/CartView';
import { PaymentMethodView } from './features/payment-method/PaymentMethodView';
import { PaymentTerminalView } from './features/payment-terminal/PaymentTerminalView';
import { OrderConfirmedView } from './features/order-confirmed/OrderConfirmedView';
import styles from './App.module.css';

const screens = [
  { id: 'menu', label: '4. Cardápio', element: <MenuView /> },
  { id: 'cart', label: '5. Carrinho', element: <CartView /> },
  { id: 'method', label: '5.5. Forma de pagamento', element: <PaymentMethodView /> },
  { id: 'terminal', label: '6. Maquininha', element: <PaymentTerminalView /> },
  { id: 'error', label: '6. Maquininha (erro)', element: <PaymentTerminalView status="declined" /> },
  { id: 'confirmed', label: '7. Pedido confirmado', element: <OrderConfirmedView /> },
];

export default function App() {
  const [current, setCurrent] = useState('menu');
  const screen = screens.find(s => s.id === current);

  return (
    <div className={styles.app}>
      <nav className={styles.preview}>
        {screens.map(s => (
          <button
            key={s.id}
            className={s.id === current ? styles.active : ''}
            onClick={() => setCurrent(s.id)}
          >
            {s.label}
          </button>
        ))}
      </nav>

      <div className={styles.screen}>{screen.element}</div>
    </div>
  );
}