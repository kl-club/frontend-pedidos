import { iconeDaCategoria } from '../../../model/entities/categoria.js';
import { formatarMoeda } from '../../../model/entities/pedido.js';
import { estaDisponivel, pontosDoProduto } from '../../../model/entities/produto.js';
import { Botao } from '../Botao/Botao.jsx';
import { ChipPontos } from '../ChipPontos/ChipPontos.jsx';
import { Icone } from '../Icone/Icone.jsx';
import { ImagemProduto } from '../ImagemProduto/ImagemProduto.jsx';
import styles from './ProdutoCard.module.css';

export function ProdutoCard({ produto, aoAdicionar }) {
  const disponivel = estaDisponivel(produto);

  return (
    <article className={disponivel ? styles.card : `${styles.card} ${styles.indisponivel}`}>
      <div className={styles.midia}>
        <ImagemProduto
          className={styles.imagem}
          src={produto.imagem}
          alt={produto.nome}
          icone={iconeDaCategoria(produto.categoria?.nome)}
        />
        {disponivel ? (
          <ChipPontos className={styles.pontos} pontos={pontosDoProduto(produto)} />
        ) : (
          <span className={`${styles.pontos} ${styles.selo}`}>Indisponível</span>
        )}
      </div>

      <div className={styles.corpo}>
        <h3 className={styles.nome}>{produto.nome}</h3>
        {produto.ingredientes && <p className={styles.ingredientes}>{produto.ingredientes}</p>}

        <div className={styles.rodape}>
          <span className={styles.preco}>{formatarMoeda(produto.preco)}</span>
          {disponivel ? (
            <Botao onClick={aoAdicionar} aria-label={`Adicionar ${produto.nome}`}>
              <Icone nome="add" />
              Adicionar
            </Botao>
          ) : (
            <Botao disabled aria-label={`${produto.nome} indisponível`}>
              Indisponível
            </Botao>
          )}
        </div>
      </div>
    </article>
  );
}
