import { Header } from '../../shared/components/Header';
import { Button } from '../../shared/components/Button';
import { formatCurrency } from '../../shared/utils/formatCurrency';
import { CategorySidebar } from './components/CategorySidebar';
import { ProductCard } from './components/ProductCard';
import { useMenuViewModel } from './useMenuViewModel';
import styles from './MenuView.module.css';

export function MenuView() {
  const {
    search, setSearch,
    categories, selectedCategoryId, selectCategory,
    loading, error, products,
    addToCart, cartCount, cartTotalInCents, goToCart
  } = useMenuViewModel();

  function renderizarProdutos() {
    if (loading) return <p className={styles.message}>Carregando...</p>;
    if (error) return <p className={styles.message}>{error}</p>;
    if (products.length === 0) return <p className={styles.message}>Nenhum item encontrado.</p>;

    return products.map(product => (
      <ProductCard
        key={product.id}
        product={product}
        onAdd={() => addToCart(product)}
      />
    ));
  }

  return (
    <div className={styles.screen}>
      <Header
        right={
          <input
            type="search"
            placeholder="Buscar no cardápio..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        }
      />

      <div className={styles.body}>
        <CategorySidebar
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={selectCategory}
        />
        <main className={styles.grid}>
          {renderizarProdutos()}
        </main>
      </div>

      <footer className={styles.footer}>
        <Button onClick={goToCart} disabled={cartCount === 0}>
          Pedido ({cartCount}) · {formatCurrency(cartTotalInCents)}
        </Button>
      </footer>
    </div>
  );
}