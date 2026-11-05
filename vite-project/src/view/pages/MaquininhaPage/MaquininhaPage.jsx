import { FORMAS_PAGAMENTO } from '../../../model/constants/pedidos.js';
import { useMaquininhaViewModel } from '../../../viewmodel/useMaquininhaViewModel.js';
import { Botao } from '../../components/Botao/Botao.jsx';
import { CabecalhoTotem } from '../../components/CabecalhoTotem/CabecalhoTotem.jsx';
import { Icone } from '../../components/Icone/Icone.jsx';
import { ResumoPedido } from '../../components/ResumoPedido/ResumoPedido.jsx';
import { SeloSeguro } from '../../components/SeloSeguro/SeloSeguro.jsx';
import styles from './MaquininhaPage.module.css';

const FORMAS_ACEITAS = [
  { icone: 'credit_card', rotulo: 'Crédito & Débito' },
  { icone: 'qr_code_2', rotulo: 'PIX' },
  { icone: 'restaurant', rotulo: 'VR & VA' },
];

function mensagemAguardando(formaPagamento, rotuloForma) {
  if (formaPagamento === FORMAS_PAGAMENTO.PIX) return `Aguardando pagamento (${rotuloForma})...`;
  return 'Aguardando aproximação ou inserção do cartão...';
}

export function MaquininhaPage() {
  const vm = useMaquininhaViewModel();
  const mensagemErro = vm.etapa === 'recusado' || vm.etapa === 'falhou' ? vm.mensagemErro : null;

  return (
    <div className={styles.tela}>
      <CabecalhoTotem mostrarLogo={false} icone="point_of_sale" titulo="Finalização do Pedido">
        <span className={styles.seloCabecalho}>
          <SeloSeguro />
        </span>
      </CabecalhoTotem>

      <div className={styles.corpo}>
        <section className={styles.principal}>
          <h2 className={styles.titulo}>Pague na maquininha ao lado</h2>
          <p className={styles.texto}>
            Aproxime seu cartão, celular ou insira o cartão no terminal ao lado para concluir seu
            pedido.
          </p>

          <div className={styles.status} aria-live="polite">
            {mensagemErro ? (
              <div className={styles.erro}>
                <span className={styles.iconeErro}>
                  <Icone nome="error" />
                </span>
                <div className={styles.textoStatus}>
                  <strong>{mensagemErro}</strong>
                  <div className={styles.acoes}>
                    <Botao onClick={vm.tentarNovamente}>
                      <Icone nome="refresh" />
                      Tentar novamente
                    </Botao>
                    <Botao variante="secundario" onClick={vm.trocarForma}>
                      Trocar forma de pagamento
                    </Botao>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.aguardando}>
                <span className={styles.iconeStatus}>
                  <Icone nome="contactless" />
                </span>
                <div className={styles.textoStatus}>
                  <strong>
                    <Icone nome="sync" className={styles.girando} />
                    {vm.etapa === 'processando'
                      ? 'Confirmando pedido...'
                      : mensagemAguardando(vm.formaPagamento, vm.rotuloForma)}
                  </strong>
                  <span>Siga as instruções que aparecem no visor da maquininha.</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.aceitas}>
            <span className={styles.rotulo}>Formas de Pagamento Aceitas</span>
            <div className={styles.chips}>
              {FORMAS_ACEITAS.map(forma => (
                <span key={forma.rotulo}>
                  <Icone nome={forma.icone} />
                  {forma.rotulo}
                </span>
              ))}
            </div>
          </div>
        </section>

        <ResumoPedido
          className={styles.resumo}
          descricaoItens={vm.descricaoItens}
          valorTotal={vm.valorTotal}
          rotuloTotal="Total a pagar"
          legendaTotal={vm.rotuloForma}
          pontos={vm.pontosAGanhar}
        />
      </div>

      <footer className={styles.rodape}>
        <Botao variante="secundario" onClick={vm.cancelar} disabled={!vm.podeVoltar}>
          <Icone nome="arrow_back" />
          Voltar
        </Botao>
        <SeloSeguro />
      </footer>
    </div>
  );
}
