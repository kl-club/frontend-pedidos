import { Icone } from '../Icone/Icone.jsx';
import { LogoKlClub } from '../LogoKlClub/LogoKlClub.jsx';
import styles from './CabecalhoTotem.module.css';

export function CabecalhoTotem({
  aoVoltar,
  rotuloVoltar = 'Voltar',
  voltarDesabilitado = false,
  aoClicarLogo,
  mostrarLogo = true,
  icone,
  titulo,
  subtitulo,
  centralizado = false,
  children,
}) {
  const voltar = aoVoltar && (
    <button
      type="button"
      className={styles.voltar}
      onClick={aoVoltar}
      disabled={voltarDesabilitado}
    >
      <Icone nome="arrow_back" />
      {rotuloVoltar}
    </button>
  );

  if (centralizado) {
    return (
      <header className={`${styles.cabecalho} ${styles.centralizado}`}>
        <div>{voltar}</div>
        <div className={styles.centro}>
          <LogoKlClub aoClicar={aoClicarLogo} />
          {subtitulo && <span className={styles.subtitulo}>{subtitulo}</span>}
        </div>
        <div className={styles.fim}>{children}</div>
      </header>
    );
  }

  return (
    <header className={styles.cabecalho}>
      {voltar}
      {mostrarLogo && <LogoKlClub aoClicar={aoClicarLogo} />}
      {titulo && (
        <h1 className={styles.titulo}>
          {icone && (
            <span className={styles.iconeTitulo}>
              <Icone nome={icone} />
            </span>
          )}
          {titulo}
        </h1>
      )}
      {children && <div className={styles.conteudo}>{children}</div>}
    </header>
  );
}
