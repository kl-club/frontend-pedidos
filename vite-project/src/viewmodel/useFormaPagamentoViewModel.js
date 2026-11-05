import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FORMAS_PAGAMENTO, FORMAS_PAGAMENTO_TOTEM } from '../model/constants/pedidos.js';
import { rotuloPagamentoTotem } from '../model/entities/pedido.js';
import { useCarrinho } from './contexts/CarrinhoContext.jsx';
import { useCheckout } from './contexts/CheckoutContext.jsx';
import { useConfirmarPedido } from './useConfirmarPedido.js';

const FORMAS = FORMAS_PAGAMENTO_TOTEM.map(id => ({ id, rotulo: rotuloPagamentoTotem(id) }));

export function useFormaPagamentoViewModel() {
  const navigate = useNavigate();
  const { itens, valorTotal, pontosTotal } = useCarrinho();
  const { definirFormaPagamento, pedido } = useCheckout();
  const confirmarPedido = useConfirmarPedido();

  // Dinheiro pula a maquininha: o pedido é criado aqui, e o card mostra "Confirmando pedido...".
  const [confirmando, setConfirmando] = useState(false);
  const [erro, setErro] = useState(null);

  // Depois do pedido em Dinheiro, o carrinho é limpo antes de a navegação para a
  // confirmação terminar (o React Router navega numa transição). Com o pedido já
  // concluído, o carrinho vazio não pode mandar de volta para o cardápio.
  const semItens = itens.length === 0 && !pedido;

  useEffect(() => {
    if (semItens) navigate('/totem', { replace: true });
  }, [semItens, navigate]);

  async function escolher(forma) {
    if (confirmando) return;
    setErro(null);
    definirFormaPagamento(forma);

    if (forma !== FORMAS_PAGAMENTO.DINHEIRO) {
      navigate('/totem/maquininha');
      return;
    }

    setConfirmando(true);
    const mensagem = await confirmarPedido(forma);
    if (mensagem) {
      setErro(mensagem);
      setConfirmando(false);
    }
  }

  return {
    valorTotal,
    pontosAGanhar: pontosTotal,
    formas: FORMAS,
    confirmando,
    erro,
    escolher,
    voltar: () => navigate('/totem/carrinho'),
  };
}
