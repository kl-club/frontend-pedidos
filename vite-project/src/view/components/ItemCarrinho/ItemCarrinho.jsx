import { iconeDaCategoria } from '../../../model/entities/categoria.js';
import { formatarMoeda } from '../../../model/entities/pedido.js';
import { pontosDoProduto, valorDoItem } from '../../../model/entities/produto.js';
import { ChipPontos } from '../ChipPontos/ChipPontos.jsx';
import { Icone } from '../Icone/Icone.jsx';
import { ImagemProduto } from '../ImagemProduto/ImagemProduto.jsx';
import styles from './ItemCarrinho.module.css';

// Item recusado pela API (`indisponivel`): fica destacado e só pode ser removido.
export function ItemCarrinho({ item, indisponivel = false, aoAumentar, aoDiminuir, aoRemover }) {
  const { produto, quantidade } = item;

  return (
    <li className={indisponivel ? `${styles.item} ${styles.indisponivel}` : styles.item}>
      <ImagemProduto
        className={styles.imagem}
        src={produto.imagem}
        icone={iconeDaCategoria(produto.categoria?.nome)}
      />

      <div className={styles.info}>
        <strong className={styles.nome}>{produto.nome}</strong>
        {indisponivel ? (
          <span className={styles.aviso}>Indisponível</span>
        ) : (
          <ChipPontos pontos={pontosDoProduto(produto) * quantidade} />
        )}
      </div>

      <span className={styles.valor}>{formatarMoeda(valorDoItem(produto, quantidade))}</span>

      <div className={styles.quantidade}>
        <button
          type="button"
          onClick={aoDiminuir}
          disabled={indisponivel}
          aria-label={`Diminuir ${produto.nome}`}
        >
          <Icone nome="remove" />
        </button>
        <span aria-live="polite">{quantidade}</span>
        <button
          type="button"
          onClick={aoAumentar}
          disabled={indisponivel}
          aria-label={`Aumentar ${produto.nome}`}
        >
          <Icone nome="add" />
        </button>
      </div>

      <button
        type="button"
        className={styles.remover}
        onClick={aoRemover}
        aria-label={`Remover ${produto.nome}`}
      >
        <Icone nome="delete" />
      </button>
    </li>
  );
}
