import { formatarPontos } from '../../../model/entities/pedido.js';
import styles from './ChipPontos.module.css';

export function ChipPontos({ pontos, sufixo = '', className = '' }) {
  if (!(pontos > 0)) return null;
  return (
    <span className={`${styles.chip} ${className}`}>
      {formatarPontos(pontos)}
      {sufixo && ` ${sufixo}`}
    </span>
  );
}
