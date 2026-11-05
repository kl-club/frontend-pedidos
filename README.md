# frontend-pedidos

Totem de autoatendimento do KL Club (Cardápio, Carrinho, Pagamento, Maquininha e Pedido confirmado), feito com **React 19 + Vite**. Consome a API do [backend](../backend) em `http://localhost:8080`.

O código fica na pasta [`vite-project/`](vite-project/).

## Pré-requisitos

- [Node.js](https://nodejs.org/) **20.19+** (ou 22.12+), exigido pelo Vite 8
- O backend rodando, com o MySQL e os dados de exemplo (veja o README do backend)

## Como rodar

```bash
cd vite-project

# 1. Instalar as dependências
npm install

# 2. (Opcional) Criar o arquivo de ambiente a partir do exemplo
cp .env.example .env        # no Windows (PowerShell): Copy-Item .env.example .env

# 3. Subir o totem
npm run dev
```

Abra **http://localhost:5174/totem**. A porta é fixa em 5174, porque o `frontend-dashboard` usa a 5173. Os dois podem rodar juntos.

## Variáveis de ambiente

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:8080` | Endereço da API |

## Scripts

Todos rodam dentro de `vite-project/`:

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o totem (Vite) na porta 5174 |
| `npm run build` | Gera o build de produção em `dist/` |
| `npm run preview` | Serve o build de produção localmente |
| `npm run lint` | Roda o lint (oxlint) |

## Docker

O `vite-project/Dockerfile` gera o build com o Node 22 e serve o `dist/` pelo nginx (`vite-project/nginx.conf`), com fallback para o `index.html` nas rotas do React Router.

O `VITE_API_URL` entra no build como argumento (padrão `http://localhost:8080`). Ele é lido pelo navegador, então precisa ser um endereço que a máquina do usuário alcance, e não o nome de um container.

```bash
cd vite-project
docker build -t kl-club-totem .                                            # API em http://localhost:8080
docker build -t kl-club-totem --build-arg VITE_API_URL=http://outro:8080 .  # outra API
docker run --rm -p 5174:80 kl-club-totem
```

Para subir junto com o backend e o MySQL, use o `docker-compose.yml` do repositório do backend, clonado ao lado deste com o nome `backend` (veja a seção "Rodando com Docker" no README do backend). Nele o totem fica em **http://localhost:5174/totem**.

## Como o totem usa a API

| Tela | Rota |
| --- | --- |
| Cardápio | `GET /categorias` (só as ativas aparecem) e `GET /produtos`, ou `GET /produtos?categoria={id}` ao trocar de categoria |
| Pagamento e maquininha | `POST /pedidos` com `modalidade` (`LOCAL`), `formaPagamento`, `observacoes` e `itens` (`idProduto` e `quantidade`) |

- O front não calcula preço, total, pontos nem status: tudo vem da API.
- Formas de pagamento: Pix, Cartão de Crédito, Cartão de Débito, Voucher e Dinheiro. O Dinheiro não passa pela maquininha: o pedido nasce `PENDENTE` e é pago no balcão.
- A maquininha é simulada: aprova a cobrança em 4 segundos.
- O totem ainda não identifica o cliente: os pedidos vão sem cadastro, e a API não credita pontos. As telas mostram os pontos dos produtos, como demonstração.
- Produto indisponível aparece esmaecido no cardápio. Se um item do carrinho ficar indisponível antes do pagamento, a API recusa o pedido, e o totem volta ao carrinho com os itens destacados.
