import { FORMAS_PAGAMENTO } from '../../../model/constants/pedidos.js';
import { formatarMoeda } from '../../../model/entities/pedido.js';
import { useFormaPagamentoViewModel } from '../../../viewmodel/useFormaPagamentoViewModel.js';
import { CabecalhoTotem } from '../../components/CabecalhoTotem/CabecalhoTotem.jsx';
import { Icone } from '../../components/Icone/Icone.jsx';
import { SeloSeguro } from '../../components/SeloSeguro/SeloSeguro.jsx';
import styles from './FormaPagamentoPage.module.css';

const CARTAO = {
  icone: 'credit_card',
  texto: 'Aproxime ou insira na maquininha acoplada ao totem.',
  chips: ['Master', 'Visa', 'Elo'],
};

const DETALHES_FORMA = {
  PIX: {
    icone: 'qr_code_2',
    texto: '',
    chips: [],
  },
  CREDITO: CARTAO,
  DEBITO: CARTAO,
  VOUCHER: {
    icone: 'restaurant',
    texto: 'Alelo, Sodexo, Ticket Refeição e benefícios aceitos.',
    chips: ['VR', 'Ticket', 'Alelo'],
  },
  DINHEIRO: {
    icone: 'payments',
    texto: 'Pague no balcão ao retirar o pedido.',
    chips: [],
  },
};

export function FormaPagamentoPage() {
  const vm = useFormaPagamentoViewModel();

  return (
    <div className={styles.tela}>
      <CabecalhoTotem
        centralizado
        aoVoltar={vm.voltar}
        rotuloVoltar="Voltar ao Pedido"
        voltarDesabilitado={vm.confirmando}
      >
        <SeloSeguro texto="Pagamento Seguro & Criptografado" />
      </CabecalhoTotem>

      <main className={styles.conteudo}>
        <div className={styles.cabecalhoConteudo}>
          <h2 className={styles.titulo}>Escolha a forma de pagamento</h2>
          <p className={styles.subtitulo}>
            Selecione como prefere pagar o seu pedido para continuar
          </p>
        </div>

        <div className={styles.faixa}>
          <div className={styles.valor}>
            <span className={styles.iconeValor}>
              <Icone nome="receipt_long" />
            </span>
            <div>
              <span className={styles.rotulo}>Valor total a pagar</span>
              <strong>{formatarMoeda(vm.valorTotal)}</strong>
            </div>
          </div>

          {vm.pontosAGanhar > 0 && (
            <div className={styles.pontos}>
              <Icone nome="stars" preenchido />
              <div>
                <strong>+{vm.pontosAGanhar} Pontos KL Club</strong>
                <span>Acumulados nesta compra</span>
              </div>
            </div>
          )}
        </div>

        {vm.erro && (
          <div className={styles.erro} role="alert">
            <Icone nome="error" />
            <p>{vm.erro}</p>
          </div>
        )}

        <div className={styles.opcoes}>
          {vm.formas.map(forma => {
            const detalhe = DETALHES_FORMA[forma.id];
            const confirmandoEsta = vm.confirmando && forma.id === FORMAS_PAGAMENTO.DINHEIRO;
            const classes = confirmandoEsta
              ? `${styles.cartao} ${styles.confirmando}`
              : styles.cartao;
            const texto = confirmandoEsta ? 'Confirmando pedido...' : detalhe?.texto;

            return (
              <button
                key={forma.id}
                type="button"
                className={classes}
                onClick={() => vm.escolher(forma.id)}
                disabled={vm.confirmando}
                aria-busy={confirmandoEsta || undefined}
              >
                <span className={styles.iconeCartao}>
                  <Icone
                    nome={confirmandoEsta ? 'sync' : (detalhe?.icone ?? 'payments')}
                    className={confirmandoEsta ? styles.girando : ''}
                  />
                </span>
                <strong className={styles.nomeForma}>{forma.rotulo}</strong>
                {texto && <span className={styles.texto}>{texto}</span>}
                {!confirmandoEsta && detalhe?.chips.length > 0 && (
                  <span className={styles.chips}>
                    {detalhe.chips.map(chip => (
                      <span key={chip}>{chip}</span>
                    ))}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
}
