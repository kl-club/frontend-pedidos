import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatarItens, rotuloPagamentoTotem } from '../model/entities/pedido.js';
import { cobrar } from '../model/services/pagamentoService.js';
import { criar } from '../model/services/pedidoService.js';
import { useCarrinho } from './contexts/CarrinhoContext.jsx';
import { useCheckout } from './contexts/CheckoutContext.jsx';

export function useMaquininhaViewModel() {
  const navigate = useNavigate();
  const carrinho = useCarrinho();
  const { formaPagamento, definirPedido } = useCheckout();

  const [etapa, setEtapa] = useState('aguardando');
  const [tentativa, setTentativa] = useState(0);

  // Depende só de `tentativa` de propósito: incluir o carrinho faria cobrar de novo.
  useEffect(() => {
    if (!formaPagamento || carrinho.itens.length === 0) {
      navigate('/totem', { replace: true });
      return;
    }

    let cancelado = false;

    async function pagarEConfirmar() {
      let resultado;
      try {
        resultado = await cobrar(carrinho.valorTotal, formaPagamento);
      } catch {
        resultado = 'RECUSADO';
      }
      if (cancelado) return;

      if (resultado !== 'APROVADO') {
        setEtapa('recusado');
        return;
      }

      setEtapa('processando');

      try {
        const pedido = await criar({
          formaPagamento,
          observacao: carrinho.observacao,
          itens: carrinho.itens,
        });
        if (cancelado) return;

        definirPedido(pedido);
        carrinho.limpar();
        navigate('/totem/confirmado', { replace: true });
      } catch {
        if (!cancelado) setEtapa('falhou');
      }
    }

    pagarEConfirmar();

    return () => {
      cancelado = true;
    };
  }, [tentativa]);

  const itens = carrinho.itens.map(item => ({
    id: item.produto.id,
    nome: item.produto.nome,
    quantidade: item.quantidade,
    valorTotal: (Math.round(item.produto.valorUnitario * 100) * item.quantidade) / 100,
  }));

  return {
    etapa,
    itens,
    descricaoItens: formatarItens(itens),
    valorTotal: carrinho.valorTotal,
    pontosAGanhar: carrinho.pontosTotal,
    formaPagamento,
    rotuloForma: rotuloPagamentoTotem(formaPagamento),
    tentarNovamente: () => {
      setEtapa('aguardando');
      setTentativa(anterior => anterior + 1);
    },
    trocarForma: () => navigate('/totem/pagamento'),
    cancelar: () => navigate('/totem/carrinho'),
  };
}
