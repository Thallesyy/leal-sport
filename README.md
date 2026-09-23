# Leal Sportwear — site

Loja estática no estilo do brechodofutebol.com, com a identidade e o acervo
do Instagram [@leal_sportwear](https://www.instagram.com/leal_sportwear/).

HTML, CSS e JavaScript puros — sem build, sem dependências. Dá para hospedar
de graça no Netlify, Vercel, GitHub Pages ou em qualquer hospedagem comum.

## Rodar localmente

```bash
python3 -m http.server 4321 --directory leal-sportwear
```

Depois abra <http://localhost:4321>.

## Estrutura

```
leal-sportwear/
├── index.html            Home: hero, disponíveis, categorias, retrô, sobre, vendidas
├── catalogo.html         Catálogo com filtros, busca e ordenação
├── produto.html          Página da camisa (lê ?id=... do endereço)
└── assets/
    ├── css/style.css     Toda a folha de estilo
    ├── js/data.js        ← CONTEÚDO DA LOJA (edite aqui)
    ├── js/app.js         Comportamento (carrinho, filtros, carrossel)
    ├── logo.png          Logo com fundo transparente
    ├── favicon.png
    └── produtos/         Fotos das camisas
```

## Contato

O WhatsApp da loja fica em `assets/js/data.js`:

```js
whatsapp: '5551996170989',   // (51) 99617-0989
```

Esse número recebe **todos** os pedidos e consultas do site: botão flutuante,
"Comprar pelo WhatsApp", "Fechar pedido" do carrinho e "Quero vender minha camisa".

## Adicionar uma camisa

Copie um bloco em `PRODUTOS` (em `assets/js/data.js`) e ajuste:

```js
{
  id: 'inter-2026-i',                       // único, vira o link ?id=
  nome: 'Internacional 2026 Primeira Camisa',
  time: 'Internacional',
  ano: 2026,
  marca: 'Adidas',                          // Adidas | Reebok | Nike | ...
  modelo: 'Primeira Camisa',
  tamanho: 'G',
  condicao: 'Novo com etiqueta',
  personalizacao: 'N 10 ALAN PATRICK',      // ou null
  descricao: 'Texto que aparece na página da peça.',
  preco: 289.00,                            // ou null → mostra "Sob consulta"
  status: 'disponivel',                     // ou 'vendida'
  img: 'assets/produtos/inter-2026-i.jpg',
  post: 'https://www.instagram.com/leal_sportwear/p/XXXX/',
  destaque: true,
  tags: ['novidade'],                       // 'novidade' mostra o selo dourado
},
```

Coloque a foto em `assets/produtos/` com o mesmo nome do campo `img`.
Use imagens quadradas (640×640 ou maior) — o layout corta em 1:1.

Quando vender, é só mudar `status` para `'vendida'`: a peça sai da vitrine
de disponíveis, ganha o selo "Vendida", fica em preto e branco e não pode mais
ser adicionada ao carrinho.

## Como o pedido funciona

Não há gateway de pagamento. O carrinho monta uma mensagem pronta e abre o
WhatsApp com a lista de peças, o subtotal e o pedido de frete — do jeito que a
loja já atende hoje pelo Direct. Cada camisa é peça única, então o carrinho não
deixa adicionar a mesma duas vezes.

O carrinho fica salvo no navegador do visitante (`localStorage`), então ele não
perde o pedido se atualizar a página.

## Dados vindos do Instagram

As 11 camisas, as fotos, o logo e os textos de bio vieram dos posts públicos de
@leal_sportwear (perfil com 42 posts; os 12 mais recentes ficam visíveis sem login).

**Preços:** as legendas do Instagram trazem "R$ XXXX" na maioria dos posts —
só a Internacional 2020 III tem valor publicado (R$ 239,00). As demais estão
como `preco: null` → o site mostra "Sob consulta" e manda para o WhatsApp.
Preencha os valores reais em `data.js` quando quiser exibi-los.

**Condições comerciais:** o site anuncia "PIX ou Mercado Pago" e "envio seguro
para todo o Brasil" — exatamente o que os posts dizem, sem promessa de desconto
nem de frete grátis. O valor do frete é combinado direto no WhatsApp.
