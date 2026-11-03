import { Header } from '../../shared/components/Header';
import { Button } from '../../shared/components/Button';
import { formatCurrency } from '../../shared/utils/formatCurrency';
import { CartItemRow } from './components/CartItemRow';
import { useCartViewModel } from './useCartViewModel';
import styles from './CartView.module.css';

export function CartView() {
  const vm = useCartViewModel();

  return (
    <div className={styles.screen}>
      <Header onBack={vm.goBack} title="Revisão do Pedido" />

      <div className={styles.body}>
        <section className={styles.list}>
          {vm.isEmpty && <p className={styles.empty}>Seu carrinho está vazio.</p>}

          {vm.items.map(item => (
            <CartItemRow
              key={item.product.id}
              item={item}
              onIncrement={() => vm.increment(item.product)}
              onDecrement={() => vm.decrement(item.product.id)}
              onRemove={() => vm.remove(item.product.id)}
              onNoteChange={note => vm.setNote(item.product.id, note)}
            />
          ))}
        </section>

        <aside className={styles.summary}>
          <div className={styles.total}>
            <span>Total</span>
            <strong>{formatCurrency(vm.totalInCents)}</strong>
          </div>
          <Button onClick={vm.continueToPayment} disabled={vm.isEmpty}>
            Avançar para pagamento →
          </Button>
        </aside>
      </div>
    </div>
  );
}