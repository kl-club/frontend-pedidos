import { formatarMoeda } from '../../../model/entities/pedido.js';
import { useCarrinhoViewModel } from '../../../viewmodel/useCarrinhoViewModel.js';
import { Botao } from '../../components/Botao/Botao.jsx';
import { Icone } from '../../components/Icone/Icone.jsx';
import { ItemCarrinho } from '../../components/ItemCarrinho/ItemCarrinho.jsx';
import styles from './CarrinhoPage.module.css';

export function CarrinhoPage() {
  const vm = useCarrinhoViewModel();

  return (
    <div className={styles.tela}>
      <section className={styles.principal}>
        <div className={styles.topo}>
          <button type="button" className={styles.voltar} onClick={vm.voltar} aria-label="Voltar ao cardápio">
            <Icone nome="arrow_back" />
          </button>
          <h1 className={styles.titulo}>Revisão do Pedido</h1>
        </div>

        <div className={styles.lista}>
          {vm.vazio ? (
            <p className={styles.vazio}>Seu carrinho está vazio.</p>
          ) : (
            <ul aria-label="Itens do pedido">
              {vm.itens.map(item => (
                <ItemCarrinho
                  key={item.produto.id}
                  item={item}
                  aoAumentar={() => vm.aumentar(item.produto)}
                  aoDiminuir={() => vm.diminuir(item.produto.id)}
                  aoRemover={() => vm.remover(item.produto.id)}
                />
              ))}
            </ul>
          )}
        </div>

        <label className={styles.observacao}>
          <span>
            <Icone nome="edit_note" />
            Observações do Pedido (opcional)
          </span>
          <textarea
            rows={2}
            placeholder="Ex.: sem açúcar, sem gelo, retirar granola..."
            value={vm.observacao}
            onChange={evento => vm.definirObservacao(evento.target.value)}
          />
        </label>

        <div className={styles.acoes}>
          <Botao variante="discreto" onClick={vm.voltar}>
            <Icone nome="arrow_back" />
            Voltar ao Cardápio
          </Botao>
          <Botao variante="discreto" className={styles.limpar} onClick={vm.limpar} disabled={vm.vazio}>
            <Icone nome="delete_sweep" />
            Limpar pedido
          </Botao>
        </div>
      </section>

      <aside className={styles.lateral}>
        {vm.pontosAGanhar > 0 && (
          <div className={styles.recompensa}>
            <Icone nome="stars" preenchido />
            <div>
              <strong>Recompensa KL Club</strong>
              <p>Você vai acumular +{vm.pontosAGanhar} pontos nesta compra!</p>
            </div>
          </div>
        )}

        <div className={styles.resumo}>
          <div className={styles.linha}>
            <span>
              Subtotal ({vm.quantidadeTotal} {vm.quantidadeTotal === 1 ? 'item' : 'itens'})
            </span>
            <span>{formatarMoeda(vm.valorTotal)}</span>
          </div>

          <hr />

          <div className={styles.total}>
            <span>Total</span>
            <strong>{formatarMoeda(vm.valorTotal)}</strong>
          </div>

          <Botao tamanho="grande" className={styles.avancar} onClick={vm.avancar} disabled={vm.vazio}>
            AVANÇAR PARA O PAGAMENTO
            <Icone nome="arrow_forward" />
          </Botao>
        </div>
      </aside>
    </div>
  );
}
