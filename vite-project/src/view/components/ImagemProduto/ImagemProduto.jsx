import { useState } from 'react';
import styles from './ImagemProduto.module.css';

export function ImagemProduto({ src, alt = '', className = '' }) {
  const [quebrada, setQuebrada] = useState(false);
  const classes = `${styles.imagem} ${className}`;

  if (!src || quebrada) {
    return <span className={classes} role={alt ? 'img' : undefined} aria-label={alt || undefined} />;
  }

  return <img className={classes} src={src} alt={alt} onError={() => setQuebrada(true)} />;
}
