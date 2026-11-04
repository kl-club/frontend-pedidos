import { usePedidoConfirmadoViewModel } from '../../../viewmodel/usePedidoConfirmadoViewModel.js';
import { Botao } from '../../components/Botao/Botao.jsx';
import { Icone } from '../../components/Icone/Icone.jsx';
import { ResumoPedido } from '../../components/ResumoPedido/ResumoPedido.jsx';
import styles from './PedidoConfirmadoPage.module.css';

export function PedidoConfirmadoPage() {
  const vm = usePedidoConfirmadoViewModel();
  const { pedido } = vm;

  if (!pedido) return null;

  return (
    <div className={styles.tela}>
      <div className={styles.corpo}>
        <section className={styles.principal}>
          <div className={styles.icone} aria-hidden="true">
            <Icone nome="check" />
            <span className={styles.folha}>
              <Icone nome="eco" preenchido />
            </span>
          </div>
          <h1 className={styles.titulo}>Pedido Confirmado!</h1>

          <div className={styles.numero}>
            <span>Número do pedido</span>
            <strong>#{pedido.id}</strong>
          </div>

          {pedido.pontosGanhos > 0 && (
            <div className={styles.clube}>
              <span className={styles.iconeClube}>
                <Icone nome="stars" preenchido />
              </span>
              <div className={styles.textoClube}>
                <span className={styles.marca}>KL CLUBE</span>
                <strong>+{pedido.pontosGanhos} pontos acumulados</strong>
                <span>Parabéns! Seus pontos já foram creditados.</span>
              </div>
              {vm.saldoPontos !== null && (
                <div className={styles.saldo}>
                  <span>Saldo Total</span>
                  <strong>{vm.saldoPontos.toLocaleString('pt-BR')} pts</strong>
                </div>
              )}
            </div>
          )}
        </section>

        <ResumoPedido
          className={styles.resumo}
          itens={pedido.itens ?? []}
          valorTotal={pedido.valorTotal}
          rotuloTotal={vm.rotuloForma ? `Total Pago (${vm.rotuloForma})` : 'Total Pago'}
          legendaTotal={`${vm.quantidadeItens} ${vm.quantidadeItens === 1 ? 'Item Selecionado' : 'Itens Selecionados'}`}
        />
      </div>

      <footer className={styles.rodape}>
        <span className={styles.pergunta}>O que você deseja fazer agora?</span>
        <div className={styles.acoes}>
          <Botao tamanho="grande" variante="secundario" onClick={vm.novoPedido}>
            <Icone nome="add_shopping_cart" />
            NOVO PEDIDO
          </Botao>
          <Botao tamanho="grande" onClick={vm.imprimir} disabled={vm.imprimindo}>
            <Icone nome={vm.imprimindo ? 'sync' : 'print'} className={vm.imprimindo ? styles.girando : ''} />
            {vm.imprimindo ? 'IMPRIMINDO COMPROVANTE...' : 'IMPRIMIR NOVAMENTE'}
          </Botao>
        </div>
      </footer>
    </div>
  );
}
