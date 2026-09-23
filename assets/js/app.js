/* ==========================================================================
   Leal Sportwear — comportamento do site
   ========================================================================== */

/* ---------- utilidades ----------------------------------------------------- */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const brl = (n) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const precoLabel = (p) => (p.preco == null ? 'Sob consulta' : brl(p.preco));

const waLink = (texto) =>
  `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;

const produtoPorId = (id) => PRODUTOS.find((p) => p.id === id);

/* localStorage sempre protegido: pode estourar em aba anônima */
const store = {
  get(k, fallback) {
    try {
      const raw = localStorage.getItem(k);
      return raw ? JSON.parse(raw) : fallback;
    } catch { return fallback; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignora */ }
  },
};

/* ---------- ícones (inline, sem dependência externa) ----------------------- */
const ICON = {
  search: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  cart:   '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
  plus:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  chat:   '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5z"/></svg>',
  wa:     '<svg width="27" height="27" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
  ig:     '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.8"/><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none"/></svg>',
  truck:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M1 3h12v13H1z"/><path d="M13 8h4l4 4v4h-8z"/><circle cx="5.5" cy="18.5" r="2"/><circle cx="17.5" cy="18.5" r="2"/></svg>',
  shield: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5.5v6c0 5 3.4 9.2 8 10.5 4.6-1.3 8-5.5 8-10.5v-6z"/><path d="m9 12 2 2 4-4"/></svg>',
  card:   '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20M6 15h4"/></svg>',
  check:  '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12.5 5 5L20 6.5"/></svg>',
  arrow:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  chevL:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg>',
  chevR:  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>',
  menu:   '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  close:  '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  bag:    '<svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
};

/* ==========================================================================
   Cabeçalho, rodapé e chrome compartilhado
   ========================================================================== */
const NAV_LINKS = [
  { href: 'index.html',                     label: 'Início' },
  { href: 'catalogo.html',                  label: 'Todas as camisas' },
  { href: 'catalogo.html?cat=disponiveis',  label: 'Disponíveis' },
  { href: 'catalogo.html?cat=retro',        label: 'Retrô' },
  { href: 'catalogo.html?cat=vendidas',     label: 'Vendidas' },
  { href: 'index.html#sobre',               label: 'Sobre' },
];

function montarChrome() {
  const pagina = location.pathname.split('/').pop() || 'index.html';

  /* --- barra de avisos --- */
  const avisos = [
    'Camisas 100% originais',
    'Envio seguro para todo o Brasil',
    'Pagamento via PIX ou Mercado Pago',
  ];
  const announce = $('#announce');
  if (announce) {
    announce.innerHTML = `<div class="announce__track">${avisos
      .map((a, i) => `<span class="announce__item${i === 0 ? ' is-on' : ''}">${a}</span>`)
      .join('')}</div>`;
    const itens = $$('.announce__item', announce);
    let i = 0;
    setInterval(() => {
      itens[i].classList.remove('is-on');
      i = (i + 1) % itens.length;
      itens[i].classList.add('is-on');
    }, 3600);
  }

  /* --- cabeçalho --- */
  const header = $('#header');
  if (header) {
    header.innerHTML = `
      <div class="wrap header__inner">
        <nav class="nav">
          ${NAV_LINKS.slice(1, 5)
            .map((l) => `<a href="${l.href}"${l.href === pagina ? ' aria-current="page"' : ''}>${l.label}</a>`)
            .join('')}
        </nav>
        <button class="icon-btn burger" id="burger" aria-label="Abrir menu">${ICON.menu}</button>
        <a class="header__logo" href="index.html" aria-label="${CONFIG.nome} — início">
          <img src="assets/logo.png" alt="${CONFIG.nome}">
        </a>
        <div class="header__right">
          <form class="search" role="search" action="catalogo.html">
            ${ICON.search}
            <input type="search" name="q" placeholder="Buscar camisas" aria-label="Buscar camisas">
          </form>
          <button class="icon-btn" id="cart-open" aria-label="Abrir carrinho">
            ${ICON.cart}
            <span class="icon-btn__badge" id="cart-count" hidden>0</span>
          </button>
        </div>
      </div>`;
  }

  /* --- menu mobile --- */
  const mnav = document.createElement('div');
  mnav.className = 'mobile-nav';
  mnav.id = 'mobile-nav';
  mnav.innerHTML = `
    <div class="mobile-nav__top">
      <img src="assets/logo.png" alt="${CONFIG.nome}">
      <button class="icon-btn" id="mobile-close" aria-label="Fechar menu">${ICON.close}</button>
    </div>
    <form class="search" style="display:flex;margin-bottom:14px;width:100%" action="catalogo.html">
      ${ICON.search}
      <input type="search" name="q" placeholder="Buscar camisas" aria-label="Buscar camisas">
    </form>
    ${NAV_LINKS.map((l) => `<a class="mobile-link" href="${l.href}">${l.label}</a>`).join('')}
    <a class="btn btn--wa" style="margin-top:22px" href="${waLink('Olá! Vim pelo site da Leal Sportwear.')}" target="_blank" rel="noopener">
      ${ICON.chat} Falar no WhatsApp
    </a>`;
  document.body.appendChild(mnav);

  /* --- rodapé --- */
  const footer = $('#footer');
  if (footer) {
    footer.innerHTML = `
      <div class="wrap">
        <div class="footer__grid">
          <div>
            <div class="footer__logo"><img src="assets/logo.png" alt="${CONFIG.nome}"></div>
            <p>Camisas de futebol originais, garimpadas com critério. ${CONFIG.bio}</p>
            <div class="socials">
              <a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
              <a href="${waLink('Olá! Vim pelo site da Leal Sportwear.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${ICON.chat}</a>
            </div>
          </div>
          <div>
            <h4>Navegar</h4>
            <ul>${NAV_LINKS.map((l) => `<li><a href="${l.href}">${l.label}</a></li>`).join('')}</ul>
          </div>
          <div>
            <h4>Entrega</h4>
            <ul>
              <li>Envio seguro para todo o Brasil</li>
              <li>Correios (PAC ou Sedex)</li>
              <li>Frete combinado no WhatsApp</li>
              <li>Código de rastreio em todo pedido</li>
            </ul>
          </div>
          <div>
            <h4>Pagamento &amp; contato</h4>
            <ul>
              <li>PIX</li>
              <li>Mercado Pago (cartão parcelado)</li>
              <li><a href="${CONFIG.instagramUrl}" target="_blank" rel="noopener">@${CONFIG.instagram}</a></li>
              <li>Atendimento pelo WhatsApp e Direct</li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} ${CONFIG.nome}. Todos os direitos reservados.</span>
          <span>Proprietário ${CONFIG.proprietario}</span>
        </div>
      </div>`;
  }

  /* --- WhatsApp flutuante --- */
  const wa = document.createElement('a');
  wa.className = 'wa-float';
  wa.href = waLink('Olá! Vim pelo site da Leal Sportwear e gostaria de mais informações.');
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'Falar no WhatsApp');
  wa.innerHTML = ICON.wa;
  document.body.appendChild(wa);

  /* --- carrinho + overlay + toast --- */
  document.body.insertAdjacentHTML('beforeend', `
    <div class="overlay" id="overlay"></div>
    <aside class="cart" id="cart" aria-label="Carrinho">
      <div class="cart__head">
        <h3>Seu pedido</h3>
        <button class="icon-btn" id="cart-close" aria-label="Fechar carrinho">${ICON.close}</button>
      </div>
      <div class="cart__items" id="cart-items"></div>
      <div class="cart__foot" id="cart-foot" hidden>
        <div class="cart__total"><span>Total</span><b id="cart-total">R$ 0,00</b></div>
        <a class="btn btn--wa btn--block" id="cart-checkout" target="_blank" rel="noopener">
          ${ICON.chat} Fechar pedido no WhatsApp
        </a>
        <p class="cart__note">O pedido é confirmado por WhatsApp, onde combinamos frete e pagamento.</p>
      </div>
    </aside>
    <div class="toast" id="toast">${ICON.check}<span id="toast-msg"></span></div>`);

  /* --- ligações --- */
  $('#burger')?.addEventListener('click', () => mnav.classList.add('is-open'));
  $('#mobile-close')?.addEventListener('click', () => mnav.classList.remove('is-open'));
  $('#cart-open')?.addEventListener('click', abrirCarrinho);
  $('#cart-close')?.addEventListener('click', fecharCarrinho);
  $('#overlay')?.addEventListener('click', fecharCarrinho);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { fecharCarrinho(); mnav.classList.remove('is-open'); }
  });
}

/* ==========================================================================
   Carrinho
   ========================================================================== */
let carrinho = store.get('ls_carrinho', []);

function salvarCarrinho() {
  store.set('ls_carrinho', carrinho);
  renderCarrinho();
}

function addAoCarrinho(id) {
  const p = produtoPorId(id);
  if (!p || p.status !== 'disponivel') return;
  if (carrinho.includes(id)) {           // peça única: não duplica
    toast('Esta camisa já está no seu pedido');
    abrirCarrinho();
    return;
  }
  carrinho.push(id);
  salvarCarrinho();
  toast('Adicionada ao pedido');
  abrirCarrinho();
}

function removerDoCarrinho(id) {
  carrinho = carrinho.filter((x) => x !== id);
  salvarCarrinho();
}

function renderCarrinho() {
  const itens = carrinho.map(produtoPorId).filter(Boolean);
  const box = $('#cart-items');
  const foot = $('#cart-foot');
  const badge = $('#cart-count');

  if (badge) {
    badge.textContent = itens.length;
    badge.hidden = itens.length === 0;
  }
  if (!box) return;

  if (!itens.length) {
    box.innerHTML = `<div class="cart__empty">${ICON.bag}<p>Seu pedido está vazio.</p>
      <a class="btn btn--ghost" href="catalogo.html" style="margin-top:8px">Ver camisas</a></div>`;
    if (foot) foot.hidden = true;
    return;
  }

  box.innerHTML = itens.map((p) => `
    <div class="ci">
      <img src="${p.img}" alt="${p.nome}">
      <div>
        <div class="ci__name">${p.nome}</div>
        <div class="ci__meta">${p.marca} · Tam ${p.tamanho} · Peça única</div>
        <div class="ci__price">${precoLabel(p)}</div>
      </div>
      <button class="ci__rm" data-rm="${p.id}" aria-label="Remover ${p.nome}">&times;</button>
    </div>`).join('');

  $$('[data-rm]', box).forEach((b) =>
    b.addEventListener('click', () => removerDoCarrinho(b.dataset.rm)));

  const comPreco = itens.filter((p) => p.preco != null);
  const total = comPreco.reduce((s, p) => s + p.preco, 0);
  const aConsultar = itens.length - comPreco.length;

  $('#cart-total').textContent = aConsultar
    ? (total > 0 ? `${brl(total)} +` : 'A combinar')
    : brl(total);

  const linhas = itens.map((p) => `• ${p.nome} (Tam ${p.tamanho}) — ${precoLabel(p)}`).join('\n');
  const msg =
    `Olá! Quero fechar este pedido na Leal Sportwear:\n\n${linhas}\n\n` +
    (aConsultar ? `Preciso do valor de ${aConsultar} ${aConsultar === 1 ? 'peça' : 'peças'}.\n` : '') +
    (total > 0 ? `Subtotal das peças com valor: ${brl(total)}\n` : '') +
    `\nPode me passar o frete e a forma de pagamento?`;

  $('#cart-checkout').href = waLink(msg);
  if (foot) foot.hidden = false;
}

const abrirCarrinho = () => {
  $('#cart')?.classList.add('is-open');
  $('#overlay')?.classList.add('is-open');
};
const fecharCarrinho = () => {
  $('#cart')?.classList.remove('is-open');
  $('#overlay')?.classList.remove('is-open');
};

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  $('#toast-msg').textContent = msg;
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 2600);
}

/* ==========================================================================
   Cartão de produto
   ========================================================================== */
function cardHTML(p) {
  const vendida = p.status === 'vendida';
  const nova = p.tags.includes('novidade');

  const precoHTML = vendida
    ? `<span class="card__price card__price--ask">Vendida</span>`
    : p.preco == null
      ? `<span class="card__price card__price--ask">Sob consulta</span>`
      : `<span class="card__price">${brl(p.preco)}</span>`;

  const pix = !vendida && p.preco != null
    ? `<div class="card__pix">PIX ou Mercado Pago</div>` : '';

  const acao = vendida
    ? ''
    : `<button class="card__add" data-add="${p.id}" aria-label="Adicionar ${p.nome} ao pedido">${ICON.plus}</button>`;

  return `
    <article class="card${vendida ? ' card--sold' : ''}">
      <a class="card__media" href="produto.html?id=${p.id}" aria-label="${p.nome}">
        ${vendida ? '<span class="badge badge--sold">Vendida</span>'
                  : nova ? '<span class="badge badge--new">Novidade</span>' : ''}
        <span class="badge badge--size">Tam ${p.tamanho}</span>
        <img src="${p.img}" alt="${p.nome}" loading="lazy">
      </a>
      <div class="card__body">
        <div class="card__meta">${p.marca} · ${p.ano}</div>
        <a href="produto.html?id=${p.id}"><h3 class="card__name">${p.nome}</h3></a>
        <div class="card__foot">
          <div>${precoHTML}${pix}</div>
          ${acao}
        </div>
      </div>
    </article>`;
}

function ligarBotoesAdd(ctx = document) {
  $$('[data-add]', ctx).forEach((b) =>
    b.addEventListener('click', (e) => {
      e.preventDefault();
      addAoCarrinho(b.dataset.add);
    }));
}

/* ==========================================================================
   Carrossel
   ========================================================================== */
function montarCarrossel(el, produtos) {
  el.innerHTML = `
    <button class="carousel__nav carousel__nav--prev" aria-label="Anterior">${ICON.chevL}</button>
    <div class="carousel__track">${produtos.map(cardHTML).join('')}</div>
    <button class="carousel__nav carousel__nav--next" aria-label="Próximo">${ICON.chevR}</button>`;

  const track = $('.carousel__track', el);
  const prev = $('.carousel__nav--prev', el);
  const next = $('.carousel__nav--next', el);
  const passo = () => track.clientWidth * 0.8;

  prev.addEventListener('click', () => track.scrollBy({ left: -passo(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: passo(), behavior: 'smooth' }));

  const sync = () => {
    prev.disabled = track.scrollLeft < 8;
    next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  };
  track.addEventListener('scroll', sync);
  window.addEventListener('resize', sync);
  sync();
  ligarBotoesAdd(el);
}

/* ==========================================================================
   Página inicial
   ========================================================================== */
function paginaInicial() {
  const novidades = PRODUTOS.filter((p) => p.status === 'disponivel');
  const carr = $('#novidades');
  if (carr) montarCarrossel(carr, novidades);

  const retro = $('#retro');
  if (retro) {
    retro.innerHTML = PRODUTOS.filter((p) => p.ano < 2015).map(cardHTML).join('');
    ligarBotoesAdd(retro);
  }

  const cats = $('#categorias');
  if (cats) {
    cats.innerHTML = CATEGORIAS.map((c) => {
      const n = PRODUTOS.filter(c.filtro).length;
      return `
        <a class="cat" href="catalogo.html?cat=${c.slug}">
          <img src="${c.img}" alt="" loading="lazy">
          <span class="cat__label">${c.titulo}<small>${n} ${n === 1 ? 'peça' : 'peças'}</small></span>
        </a>`;
    }).join('');
  }

  const vend = $('#vendidas');
  if (vend) {
    vend.innerHTML = PRODUTOS.filter((p) => p.status === 'vendida').map(cardHTML).join('');
  }
}

/* ==========================================================================
   Catálogo
   ========================================================================== */
function paginaCatalogo() {
  const params = new URLSearchParams(location.search);
  let filtroAtivo = params.get('cat') || 'todas';
  let busca = (params.get('q') || '').trim();
  let ordem = 'recentes';

  const filtros = [
    { slug: 'todas', titulo: 'Todas', filtro: () => true },
    ...CATEGORIAS,
  ];

  const chips = $('#chips');
  const sel = $('#ordem');
  const grid = $('#grid');
  const count = $('#count');
  const titulo = $('#page-title');
  const buscaInput = $('#busca-input');

  if (busca && buscaInput) buscaInput.value = busca;

  chips.innerHTML = filtros
    .map((f) => `<button class="chip" data-f="${f.slug}">${f.titulo}</button>`)
    .join('');

  function aplicar() {
    const f = filtros.find((x) => x.slug === filtroAtivo) || filtros[0];
    let lista = PRODUTOS.filter(f.filtro);

    if (busca) {
      const t = busca.toLowerCase();
      lista = lista.filter((p) =>
        [p.nome, p.time, p.marca, p.modelo, p.personalizacao, String(p.ano), p.tamanho]
          .filter(Boolean).join(' ').toLowerCase().includes(t));
    }

    const ordenadores = {
      recentes:   (a, b) => b.ano - a.ano,
      antigas:    (a, b) => a.ano - b.ano,
      'preco-asc':  (a, b) => (a.preco ?? Infinity) - (b.preco ?? Infinity),
      'preco-desc': (a, b) => (b.preco ?? -1) - (a.preco ?? -1),
      nome:       (a, b) => a.nome.localeCompare(b.nome, 'pt-BR'),
    };
    lista = [...lista].sort(ordenadores[ordem]);

    titulo.textContent = busca ? `Busca: “${busca}”` : f.titulo === 'Todas' ? 'Todas as camisas' : f.titulo;
    count.textContent = `${lista.length} ${lista.length === 1 ? 'peça encontrada' : 'peças encontradas'}`;

    grid.innerHTML = lista.length
      ? lista.map(cardHTML).join('')
      : `<div class="empty" style="grid-column:1/-1">
           <h3>Nada por aqui ainda</h3>
           <p>Não encontramos camisas com esse filtro. Fale com a gente — o estoque gira rápido.</p>
           <a class="btn btn--wa" href="${waLink('Olá! Procuro uma camisa específica. Vocês têm?')}" target="_blank" rel="noopener">${ICON.chat} Procurar por encomenda</a>
         </div>`;

    ligarBotoesAdd(grid);
    $$('.chip', chips).forEach((c) => c.classList.toggle('is-on', c.dataset.f === filtroAtivo));
  }

  $$('.chip', chips).forEach((c) =>
    c.addEventListener('click', () => {
      filtroAtivo = c.dataset.f;
      busca = '';
      if (buscaInput) buscaInput.value = '';
      aplicar();
    }));

  sel.addEventListener('change', () => { ordem = sel.value; aplicar(); });

  $('#busca-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    busca = buscaInput.value.trim();
    filtroAtivo = 'todas';
    aplicar();
  });

  aplicar();
}

/* ==========================================================================
   Página de produto
   ========================================================================== */
function paginaProduto() {
  const id = new URLSearchParams(location.search).get('id');
  const p = produtoPorId(id);
  const root = $('#pdp');

  if (!p) {
    root.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <h3>Camisa não encontrada</h3>
      <p>Esse link pode ter expirado ou a peça saiu do catálogo.</p>
      <a class="btn btn--gold" href="catalogo.html">Ver todas as camisas</a></div>`;
    return;
  }

  document.title = `${p.nome} — ${CONFIG.nome}`;
  const vendida = p.status === 'vendida';

  const especificacoes = [
    ['Clube', p.time],
    ['Temporada', p.ano],
    ['Modelo', p.modelo],
    ['Fabricante', p.marca],
    ['Tamanho', p.tamanho],
    ['Estado', p.condicao],
    ['Personalização', p.personalizacao || 'Sem personalização'],
    ['Disponibilidade', vendida ? 'Vendida' : 'Peça única disponível'],
  ];

  const precoBloco = vendida
    ? `<div class="pdp__price"><b style="font-size:34px;color:var(--text-2)">Vendida</b></div>
       <p class="pdp__pix">Essa peça já encontrou dono. Fale com a gente para avisarmos quando chegar algo parecido.</p>`
    : p.preco == null
      ? `<div class="pdp__price"><b style="font-size:34px">Sob consulta</b></div>
         <p class="pdp__pix">O valor dessa peça é passado no WhatsApp ou no Direct.</p>`
      : `<div class="pdp__price"><b>${brl(p.preco)}</b></div>
         <p class="pdp__pix">Pagamento via <b>PIX</b> ou Mercado Pago</p>`;

  const msgProduto = vendida
    ? `Olá! Vi a ${p.nome} no site e ela está vendida. Vocês têm algo parecido?`
    : `Olá! Tenho interesse na ${p.nome} (Tam ${p.tamanho})${p.preco == null ? '. Qual o valor?' : ` — ${brl(p.preco)}.`}`;

  const acoes = vendida
    ? `<a class="btn btn--wa btn--block" href="${waLink(msgProduto)}" target="_blank" rel="noopener">${ICON.chat} Quero uma parecida</a>`
    : `<button class="btn btn--gold btn--block" data-add="${p.id}">${ICON.cart} Adicionar ao pedido</button>
       <a class="btn btn--wa btn--block" href="${waLink(msgProduto)}" target="_blank" rel="noopener">${ICON.chat} Comprar pelo WhatsApp</a>`;

  root.innerHTML = `
    <div class="pdp__media">
      ${vendida ? '<span class="badge badge--sold" style="top:16px;left:16px">Vendida</span>' : ''}
      <img src="${p.img}" alt="${p.nome}">
    </div>
    <div>
      <span class="pdp__tag">${p.time} · ${p.ano} · ${p.marca}</span>
      <h1>${p.nome}</h1>
      ${precoBloco}
      <p class="pdp__desc">${p.descricao}</p>
      <ul class="specs">
        ${especificacoes.map(([k, v]) => `<li><span class="k">${k}</span><span>${v}</span></li>`).join('')}
      </ul>
      <div class="pdp__actions">${acoes}</div>
      <div class="trust">
        <div>${ICON.shield} Produto original, conferido peça por peça</div>
        <div>${ICON.truck} Envio seguro para todo o Brasil, com rastreio</div>
        <div>${ICON.card} Pagamento via PIX ou Mercado Pago</div>
        <div>${ICON.ig} <a href="${p.post}" target="_blank" rel="noopener" style="color:var(--gold)">Ver esta peça no Instagram</a></div>
      </div>
    </div>`;

  ligarBotoesAdd(root);

  /* relacionados */
  const rel = $('#relacionados');
  if (rel) {
    const lista = PRODUTOS
      .filter((x) => x.id !== p.id)
      .sort((a, b) => {
        const score = (x) => (x.marca === p.marca ? 2 : 0) + (x.status === 'disponivel' ? 1 : 0);
        return score(b) - score(a);
      })
      .slice(0, 4);
    rel.innerHTML = lista.map(cardHTML).join('');
    ligarBotoesAdd(rel);
  }
}

/* ==========================================================================
   Boot
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  montarChrome();
  renderCarrinho();

  const pagina = document.body.dataset.pagina;
  if (pagina === 'home')     paginaInicial();
  if (pagina === 'catalogo') paginaCatalogo();
  if (pagina === 'produto')  paginaProduto();

  /* preenche ícones marcados no HTML estático */
  $$('[data-icon]').forEach((el) => {
    const ic = ICON[el.dataset.icon];
    if (ic) el.innerHTML = ic + el.innerHTML;
  });

  /* links de WhatsApp declarados no HTML */
  $$('[data-wa]').forEach((el) => { el.href = waLink(el.dataset.wa); });
});
