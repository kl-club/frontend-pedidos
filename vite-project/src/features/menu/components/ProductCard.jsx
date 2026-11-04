import { Button } from '../../../shared/components/Button';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import styles from './ProductCard.module.css';

export function ProductCard({ product, onAdd }) {
  return (
    <article className={styles.card}>
      <img className={styles.image} src={product.imageUrl} alt={product.name} />
      <h3 className={styles.name}>{product.name}</h3>
      <span className={styles.price}>{formatCurrency(product.price)}</span>
      <Button onClick={onAdd}>+ Adicionar</Button>
    </article>
  );
}