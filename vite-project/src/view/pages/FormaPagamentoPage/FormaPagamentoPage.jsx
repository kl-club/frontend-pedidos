import { formatarMoeda } from '../../../model/entities/pedido.js';
import { useFormaPagamentoViewModel } from '../../../viewmodel/useFormaPagamentoViewModel.js';
import { CabecalhoTotem } from '../../components/CabecalhoTotem/CabecalhoTotem.jsx';
import { Icone } from '../../components/Icone/Icone.jsx';
import { SeloSeguro } from '../../components/SeloSeguro/SeloSeguro.jsx';
import styles from './FormaPagamentoPage.module.css';

const DETALHES_FORMA = {
  PIX: {
    icone: 'qr_code_2',
    texto: '',
    chips: [],
  },
  CARTAO_CREDITO: {
    icone: 'credit_card',
    texto: 'Aproxime ou insira na maquininha acoplada ao totem.',
    chips: ['Master', 'Visa', 'Elo'],
  },
  VOUCHER: {
    icone: 'restaurant',
    texto: 'Alelo, Sodexo, Ticket Refeição e benefícios aceitos.',
    chips: ['VR', 'Ticket', 'Alelo'],
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

        <div className={styles.opcoes}>
          {vm.formas.map(forma => {
            const detalhe = DETALHES_FORMA[forma.id];
            return (
              <button
                key={forma.id}
                type="button"
                className={styles.cartao}
                onClick={() => vm.escolher(forma.id)}
              >
                <span className={styles.iconeCartao}>
                  <Icone nome={detalhe?.icone ?? 'payments'} />
                </span>
                <strong className={styles.nomeForma}>{forma.rotulo}</strong>
                {detalhe?.texto && <span className={styles.texto}>{detalhe.texto}</span>}
                {detalhe?.chips.length > 0 && (
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
