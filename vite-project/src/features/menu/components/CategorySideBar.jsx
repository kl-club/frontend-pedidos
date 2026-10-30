import styles from './CategorySidebar.module.css';

export function CategorySidebar({ categories, selectedId, onSelect }) {
  
  function obterClasseDoBotao(estaAtivo) {
    if (estaAtivo) {
      return `${styles.item} ${styles.active}`;
    }
    return styles.item;
  }

  return (
    <nav className={styles.sidebar}>
    
      <button 
        className={obterClasseDoBotao(!selectedId)} 
        onClick={function () { 
          onSelect(undefined); 
        }}
      >
        Todos
      </button>

      {categories.map(function (category) {
        
        const esteBotaoEstaSelecionado = selectedId == category.id;
        
        return (
          <button
            key={category.id}
            className={obterClasseDoBotao(esteBotaoEstaSelecionado)}
            onClick={function () { 
              onSelect(category.id); 
            }}
          >
            {category.name}
          </button>
        );
      })}
    </nav>
  );
}