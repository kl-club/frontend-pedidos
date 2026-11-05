import { useState } from 'react';
import { Icone } from '../Icone/Icone.jsx';
import styles from './ImagemProduto.module.css';

// Sem imagem (ou com a imagem quebrada), mostra o ícone da categoria no lugar.
export function ImagemProduto({ src, alt = '', icone, className = '' }) {
  const [quebrada, setQuebrada] = useState(false);
  const classes = `${styles.imagem} ${className}`;

  if (!src || quebrada) {
    return (
      <span
        className={`${classes} ${styles.placeholder}`}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
      >
        {icone && <Icone nome={icone} className={styles.icone} />}
      </span>
    );
  }

  return <img className={classes} src={src} alt={alt} onError={() => setQuebrada(true)} />;
}
