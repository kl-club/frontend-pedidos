import { formatarMoeda } from '../../../model/entities/pedido.js';
import { pontosDoProduto } from '../../../model/entities/produto.js';
import { ChipPontos } from '../ChipPontos/ChipPontos.jsx';
import { Icone } from '../Icone/Icone.jsx';
import { ImagemProduto } from '../ImagemProduto/ImagemProduto.jsx';
import styles from './ItemCarrinho.module.css';

export function ItemCarrinho({ item, aoAumentar, aoDiminuir, aoRemover }) {
  const { produto, quantidade } = item;
  const valorLinha = (Math.round(produto.valorUnitario * 100) * quantidade) / 100;

  return (
    <li className={styles.item}>
      <ImagemProduto className={styles.imagem} src={produto.imagemUrl} />

      <div className={styles.info}>
        <strong className={styles.nome}>{produto.nome}</strong>
        <ChipPontos pontos={pontosDoProduto(produto) * quantidade} />
      </div>

      <span className={styles.valor}>{formatarMoeda(valorLinha)}</span>

      <div className={styles.quantidade}>
        <button type="button" onClick={aoDiminuir} aria-label={`Diminuir ${produto.nome}`}>
          <Icone nome="remove" />
        </button>
        <span aria-live="polite">{quantidade}</span>
        <button type="button" onClick={aoAumentar} aria-label={`Aumentar ${produto.nome}`}>
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
