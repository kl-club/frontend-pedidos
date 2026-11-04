import { Icone } from '../Icone/Icone.jsx';
import styles from './CategoriasMenu.module.css';

const ICONE_TODOS = 'restaurant_menu';
const ICONE_PADRAO = 'restaurant';

export function CategoriasMenu({ categorias, selecionadaId, aoSelecionar }) {
  const opcoes = [
    { id: undefined, nome: 'Todos', icone: ICONE_TODOS },
    ...categorias.map(categoria => ({ ...categoria, icone: categoria.icone || ICONE_PADRAO })),
  ];

  return (
    <nav className={styles.menu} aria-label="Categorias">
      <span className={styles.rotulo}>Categorias</span>
      {opcoes.map(opcao => {
        const ativo = selecionadaId === opcao.id;
        return (
          <button
            key={opcao.id ?? 'todos'}
            type="button"
            className={ativo ? `${styles.item} ${styles.ativo}` : styles.item}
            aria-pressed={ativo}
            onClick={() => aoSelecionar(opcao.id)}
          >
            <span className={styles.icone}>
              <Icone nome={opcao.icone} preenchido={ativo} />
            </span>
            <span className={styles.nome}>{opcao.nome}</span>
            {ativo && <span className={styles.indicador} aria-hidden="true" />}
          </button>
        );
      })}
    </nav>
  );
}
