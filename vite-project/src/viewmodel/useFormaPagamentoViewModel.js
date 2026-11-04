import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FORMAS_PAGAMENTO_TOTEM } from '../model/constants/pedidos.js';
import { TOTEM } from '../model/constants/totem.js';
import { rotuloPagamentoTotem } from '../model/entities/pedido.js';
import { useCarrinho } from './contexts/CarrinhoContext.jsx';
import { useCheckout } from './contexts/CheckoutContext.jsx';

const FORMAS = FORMAS_PAGAMENTO_TOTEM.map(id => ({ id, rotulo: rotuloPagamentoTotem(id) }));
const IDENTIFICACAO_TOTEM = [TOTEM.identificacao, TOTEM.local].filter(Boolean).join(' • ');

export function useFormaPagamentoViewModel() {
  const navigate = useNavigate();
  const { itens, valorTotal, pontosTotal } = useCarrinho();
  const { definirFormaPagamento } = useCheckout();

  const semItens = itens.length === 0;

  useEffect(() => {
    if (semItens) navigate('/totem', { replace: true });
  }, [semItens, navigate]);

  return {
    valorTotal,
    pontosAGanhar: pontosTotal,
    identificacaoTotem: IDENTIFICACAO_TOTEM,
    formas: FORMAS,
    escolher: forma => {
      definirFormaPagamento(forma);
      navigate('/totem/maquininha');
    },
    voltar: () => navigate('/totem/carrinho'),
  };
}
