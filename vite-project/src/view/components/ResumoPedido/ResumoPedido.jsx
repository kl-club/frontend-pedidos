import { formatarMoeda } from '../../../model/entities/pedido.js';
import { ChipPontos } from '../ChipPontos/ChipPontos.jsx';
import styles from './ResumoPedido.module.css';

export function ResumoPedido({
  titulo = 'Resumo do Pedido',
  itens = [],
  descricaoItens,
  valorTotal,
  rotuloTotal = 'Total',
  legendaTotal,
  pontos,
  className = '',
}) {
  return (
    <section className={`${styles.resumo} ${className}`}>
      <div className={styles.topo}>
        <h3 className={styles.titulo}>{titulo}</h3>
        <ChipPontos pontos={pontos} sufixo="fidelidade" />
      </div>

      {descricaoItens ? (
        <p className={styles.descricao}>{descricaoItens}</p>
      ) : (
        <ul className={styles.lista}>
          {itens.map((item, indice) => (
            <li key={item.id ?? indice}>
              <span className={styles.qtd}>{item.quantidade}x</span>
              <span className={styles.nome}>{item.nome}</span>
              <span className={styles.valor}>{formatarMoeda(item.valorTotal)}</span>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.total}>
        <div>
          <span className={styles.rotuloTotal}>{rotuloTotal}</span>
          {legendaTotal && <span className={styles.legenda}>{legendaTotal}</span>}
        </div>
        <strong>{formatarMoeda(valorTotal)}</strong>
      </div>
    </section>
  );
}
