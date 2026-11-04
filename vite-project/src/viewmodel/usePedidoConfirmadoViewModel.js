import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { rotuloPagamentoTotem } from '../model/entities/pedido.js';
import { useCheckout } from './contexts/CheckoutContext.jsx';

const TEMPO_REINICIO_MS = 15000;
const ATRASO_IMPRESSAO_MS = 600;
const EVENTOS_INTERACAO = ['pointerdown', 'keydown', 'wheel', 'touchstart'];

export function usePedidoConfirmadoViewModel() {
  const navigate = useNavigate();
  const { pedido, reiniciar } = useCheckout();
  const [imprimindo, setImprimindo] = useState(true);

  function novoPedido() {
    reiniciar();
    navigate('/totem', { replace: true });
  }

  function imprimir() {
    setImprimindo(true);
    window.print();
    setImprimindo(false);
  }

  useEffect(() => {
    if (!pedido) return;
    const temporizador = setTimeout(imprimir, ATRASO_IMPRESSAO_MS);
    return () => clearTimeout(temporizador);
  }, [pedido]);

  useEffect(() => {
    if (!pedido) {
      navigate('/totem', { replace: true });
      return;
    }

    let temporizador = setTimeout(novoPedido, TEMPO_REINICIO_MS);

    function reiniciarContagem() {
      clearTimeout(temporizador);
      temporizador = setTimeout(novoPedido, TEMPO_REINICIO_MS);
    }

    EVENTOS_INTERACAO.forEach(evento => window.addEventListener(evento, reiniciarContagem));

    return () => {
      clearTimeout(temporizador);
      EVENTOS_INTERACAO.forEach(evento => window.removeEventListener(evento, reiniciarContagem));
    };
  }, [pedido]);

  const quantidadeItens = (pedido?.itens ?? []).reduce((soma, item) => soma + item.quantidade, 0);

  return {
    pedido,
    quantidadeItens,
    rotuloForma: rotuloPagamentoTotem(pedido?.formaPagamento),
    saldoPontos: pedido?.cliente?.saldoPontos ?? null,
    imprimindo,
    imprimir,
    novoPedido,
  };
}
