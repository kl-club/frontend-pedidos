import { Icone } from '../Icone/Icone.jsx';
import styles from './SeloSeguro.module.css';

export function SeloSeguro({ texto = 'Ambiente Seguro' }) {
  return (
    <span className={styles.selo}>
      <Icone nome="lock" />
      {texto}
    </span>
  );
}
