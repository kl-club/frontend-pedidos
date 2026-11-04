import { MODALIDADE_TOTEM } from '../../../model/constants/pedidos.js';
import { formatarMoeda, rotuloModalidade } from '../../../model/entities/pedido.js';
import { useCardapioViewModel } from '../../../viewmodel/useCardapioViewModel.js';
import { Botao } from '../../components/Botao/Botao.jsx';
import { CabecalhoTotem } from '../../components/CabecalhoTotem/CabecalhoTotem.jsx';
import { CategoriasMenu } from '../../components/CategoriasMenu/CategoriasMenu.jsx';
import { Icone } from '../../components/Icone/Icone.jsx';
import { ProdutoCard } from '../../components/ProdutoCard/ProdutoCard.jsx';
import styles from './CardapioPage.module.css';

export function CardapioPage() {
  const vm = useCardapioViewModel();
  const erro = vm.categorias.error ?? vm.produtos.error;
  const carrinhoVazio = vm.quantidadeNoCarrinho === 0;

  function renderizarProdutos() {
    if (erro) {
      return (
        <div className={styles.erro} role="alert">
          <Icone nome="error" />
          <p>{erro}</p>
          <Botao variante="secundario" onClick={vm.recarregar}>
            Tentar novamente
          </Botao>
        </div>
      );
    }
    if (vm.produtos.status === 'loading') {
      return <p className={styles.mensagem}>Carregando...</p>;
    }
    if (vm.produtos.data.length === 0) {
      return <p className={styles.mensagem}>Nenhum item encontrado.</p>;
    }
    return vm.produtos.data.map(produto => (
      <ProdutoCard
        key={produto.id}
        produto={produto}
        aoAdicionar={() => vm.adicionarAoCarrinho(produto)}
      />
    ));
  }

  return (
    <div className={styles.tela}>
      <CabecalhoTotem aoClicarLogo={vm.irParaInicio}>
        <span className={styles.modalidade}>
          <Icone nome="restaurant" />
          {rotuloModalidade(MODALIDADE_TOTEM)}
        </span>

        <label className={styles.busca}>
          <Icone nome="search" />
          <input
            type="search"
            placeholder="Buscar no cardápio..."
            aria-label="Buscar no cardápio"
            value={vm.busca}
            onChange={evento => vm.definirBusca(evento.target.value)}
          />
        </label>

        <button
          type="button"
          className={styles.sacola}
          onClick={vm.irParaCarrinho}
          disabled={carrinhoVazio}
          aria-label={`Sacola: ${vm.quantidadeNoCarrinho} itens, ${formatarMoeda(vm.valorTotalCarrinho)}`}
        >
          <Icone nome="shopping_bag" />
          {formatarMoeda(vm.valorTotalCarrinho)}
          <span className={styles.contador}>{vm.quantidadeNoCarrinho}</span>
        </button>
      </CabecalhoTotem>

      <div className={styles.corpo}>
        <aside className={styles.lateral}>
          <CategoriasMenu
            categorias={vm.categorias.data}
            selecionadaId={vm.categoriaSelecionadaId}
            aoSelecionar={vm.selecionarCategoria}
          />

          <div className={styles.trocarPontos}>
            <button type="button" className={styles.botaoPontos} disabled title="Em breve">
              <span className={styles.iconePontos}>
                <Icone nome="redeem" />
              </span>
              <span className={styles.textoPontos}>
                <strong>Trocar Pontos</strong>
                <span>Em breve</span>
              </span>
              <Icone nome="chevron_right" />
            </button>
          </div>
        </aside>

        <main className={styles.grade} aria-live="polite">
          {renderizarProdutos()}
        </main>
      </div>

      <footer className={styles.dock}>
        <Botao tamanho="grande" onClick={vm.irParaCarrinho} disabled={carrinhoVazio}>
          Finalizar ({vm.quantidadeNoCarrinho})
          <Icone nome="arrow_forward" />
        </Botao>
      </footer>
    </div>
  );
}
