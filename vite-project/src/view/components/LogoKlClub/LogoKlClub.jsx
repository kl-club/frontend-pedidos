import { Icone } from '../Icone/Icone.jsx';
import styles from './LogoKlClub.module.css';

export function LogoKlClub({ aoClicar }) {
  const conteudo = (
    <>
      <span className={styles.selo}>
        <Icone nome="eco" preenchido />
      </span>
      <span className={styles.texto}>
        KL <span>Club</span>
      </span>
    </>
  );

  if (!aoClicar) return <span className={styles.logo}>{conteudo}</span>;

  return (
    <button type="button" className={`${styles.logo} ${styles.clicavel}`} onClick={aoClicar} aria-label="KL Club, voltar ao início">
      {conteudo}
    </button>
  );
}
