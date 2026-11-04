import { formatarMoeda } from '../../../model/entities/pedido.js';
import { formatarPorcao, pontosDoProduto } from '../../../model/entities/produto.js';
import { Botao } from '../Botao/Botao.jsx';
import { ChipPontos } from '../ChipPontos/ChipPontos.jsx';
import { Icone } from '../Icone/Icone.jsx';
import { ImagemProduto } from '../ImagemProduto/ImagemProduto.jsx';
import styles from './ProdutoCard.module.css';

export function ProdutoCard({ produto, aoAdicionar }) {
  const porcao = formatarPorcao(produto);

  return (
    <article className={styles.card}>
      <div className={styles.midia}>
        <ImagemProduto className={styles.imagem} src={produto.imagemUrl} alt={produto.nome} />
        <ChipPontos className={styles.pontos} pontos={pontosDoProduto(produto)} />
        {porcao && <span className={styles.porcao}>{porcao}</span>}
      </div>

      <div className={styles.corpo}>
        <h3 className={styles.nome}>{produto.nome}</h3>
        {produto.descricao && <p className={styles.descricao}>{produto.descricao}</p>}

        <div className={styles.rodape}>
          <span className={styles.preco}>{formatarMoeda(produto.valorUnitario)}</span>
          <Botao onClick={aoAdicionar} aria-label={`Adicionar ${produto.nome}`}>
            <Icone nome="add" />
            Adicionar
          </Botao>
        </div>
      </div>
    </article>
  );
}
