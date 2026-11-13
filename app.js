(() => {
  'use strict';

  const products = [
    { id: 'm365', name: 'Microsoft 365 Empresa', category: 'Productividad', price: 469, unit: 'usuario / año', badge: 'MÁS ELEGIDO', art: 'productivity', alt: 'Ilustración de aplicaciones de oficina', description: 'Word, Excel, PowerPoint y correo empresarial en un solo plan.' },
    { id: 'adobe', name: 'Adobe Creative Cloud', category: 'Diseño', price: 239, unit: 'mes', badge: 'PARA CREATIVOS', art: 'creative', alt: 'Ilustración de herramientas creativas', description: 'Las aplicaciones creativas que tu equipo de diseño necesita.' },
    { id: 'norton', name: 'Norton 360 Deluxe', category: 'Seguridad', price: 189, unit: 'año', badge: 'TRANQUILIDAD', art: 'security', alt: 'Ilustración de protección digital', description: 'Protección de equipos y privacidad para trabajar con confianza.' },
    { id: 'quickbooks', name: 'QuickBooks Online', category: 'Negocios', price: 129, unit: 'mes', badge: 'ORDEN FINANCIERO', art: 'business', alt: 'Ilustración de panel de análisis financiero', description: 'Controla ingresos, gastos y reportes desde cualquier lugar.' },
    { id: 'canva', name: 'Canva Pro', category: 'Diseño', price: 359, unit: 'año', badge: 'IDEAS EN ACCIÓN', art: 'design', alt: 'Ilustración de diseño y comunicación', description: 'Diseños, presentaciones y contenido de marca en minutos.' },
    { id: 'bitdefender', name: 'Bitdefender Total Security', category: 'Seguridad', price: 219, unit: 'año', badge: 'PROTECCIÓN TOTAL', art: 'device', alt: 'Ilustración de laptop protegida', description: 'Ciberseguridad integral para los dispositivos de tu empresa.' },
  ];
  const sellers = [
    { vendedor: 'V001', nombre: 'Andrea Salazar', telefono: '943 120 101', correo: 'andrea@ventadesoftware.pe', zona: 'San Isidro' },
    { vendedor: 'V002', nombre: 'Marco Paredes', telefono: '943 120 102', correo: 'marco@ventadesoftware.pe', zona: 'Miraflores' },
    { vendedor: 'V003', nombre: 'Camila Rojas', telefono: '943 120 103', correo: 'camila@ventadesoftware.pe', zona: 'San Borja' },
    { vendedor: 'V004', nombre: 'Diego Torres', telefono: '943 120 104', correo: 'diego@ventadesoftware.pe', zona: 'Surco' },
    { vendedor: 'V005', nombre: 'Lucía Vega', telefono: '943 120 105', correo: 'lucia@ventadesoftware.pe', zona: 'Lima Centro' },
  ];
  const palettes = {
    productivity: ['#dce7cc', '#416148', '#eff2e9'], creative: ['#e9d8cd', '#ad624d', '#f3e8dc'],
    security: ['#d5e5dc', '#326a58', '#edf3ef'], business: ['#e5e1cb', '#7c8050', '#f3f0df'],
    design: ['#e9d9e9', '#8d648d', '#f4eaf3'], device: ['#d8e0ea', '#506c8a', '#eff2f7'],
  };
  function svgIllustration(kind) {
    const [bg, accent, light] = palettes[kind] || palettes.productivity;
    let scene;
    if (kind === 'bread') {
      scene = `<path d="M0 425 Q180 395 400 425 T800 420 V540 H0Z" fill="#d3b18a"/><ellipse cx="410" cy="400" rx="270" ry="55" fill="#b9895f"/><path d="M170 370 Q190 230 325 228 Q445 225 460 365Z" fill="#c68145"/><path d="M354 364 Q375 180 535 186 Q690 189 694 365Z" fill="#db9854"/><path d="M236 280l70 40M432 240l75 40m-20-54 73 33" stroke="#f2d3a8" stroke-width="16" stroke-linecap="round"/><ellipse cx="160" cy="393" rx="65" ry="32" fill="#edc98f"/><path d="M128 389l45-1" stroke="#d79c58" stroke-width="6"/>`;
    } else if (kind === 'team') {
      scene = `<rect x="120" y="117" width="560" height="288" rx="20" fill="#f7f7f1"/><rect x="146" y="143" width="508" height="238" rx="10" fill="#e5ecdf"/><rect x="183" y="173" width="193" height="173" rx="12" fill="#fffefa"/><rect x="397" y="173" width="222" height="73" rx="12" fill="#fffefa"/><rect x="397" y="260" width="222" height="86" rx="12" fill="#fffefa"/><circle cx="259" cy="225" r="29" fill="#dbb39b"/><path d="M218 317 Q222 259 259 259 Q296 259 303 317Z" fill="#51765f"/><circle cx="450" cy="203" r="12" fill="#c5d7a4"/><path d="M476 198h118m-118 15h84" stroke="#bbc5b2" stroke-width="7" stroke-linecap="round"/><path d="M422 319l32-31 28 19 39-37 41 25" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`;
    } else {
      const shield = kind === 'security' || kind === 'device';
      scene = `<rect x="83" y="75" width="634" height="382" rx="25" fill="#262d2a"/><rect x="101" y="94" width="598" height="344" rx="13" fill="${light}"/><circle cx="130" cy="119" r="5" fill="#e48a68"/><circle cx="149" cy="119" r="5" fill="#e0c875"/><circle cx="168" cy="119" r="5" fill="#8eb887"/><rect x="124" y="150" width="160" height="254" rx="12" fill="#fffefa"/><rect x="303" y="150" width="371" height="110" rx="12" fill="#fffefa"/><rect x="303" y="275" width="173" height="129" rx="12" fill="#fffefa"/><rect x="490" y="275" width="184" height="129" rx="12" fill="#fffefa"/><rect x="146" y="177" width="105" height="10" rx="5" fill="#c9d2c5"/><rect x="146" y="205" width="83" height="8" rx="4" fill="#e0e3dc"/><rect x="146" y="229" width="91" height="8" rx="4" fill="#e0e3dc"/><rect x="146" y="253" width="69" height="8" rx="4" fill="#e0e3dc"/><path d="M331 232l44-45 47 20 54-37 46 22 84-47" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M331 367v-37m33 37v-60m34 60v-46" stroke="${accent}" stroke-width="16" stroke-linecap="round"/><circle cx="548" cy="339" r="35" fill="none" stroke="#dfe5d8" stroke-width="17"/><path d="M548 304a35 35 0 0 1 33 47" fill="none" stroke="${accent}" stroke-width="17" stroke-linecap="round"/>`;
      if (shield) scene += `<path d="M641 317l24 11v20q0 30-24 43-24-13-24-43v-20Z" fill="${accent}"/><path d="m630 347 8 8 15-17" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 540"><rect width="800" height="540" fill="${bg}"/><circle cx="680" cy="90" r="92" fill="${light}" opacity=".75"/><circle cx="100" cy="480" r="120" fill="${accent}" opacity=".09"/>${scene}</svg>`;
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }
  const soles = value => new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN', maximumFractionDigits: 2 }).format(value);
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
  function readStore(key, fallback) {
    try { const value = localStorage.getItem(key); return value === null ? fallback : JSON.parse(value); }
    catch { return fallback; }
  }
  function writeStore(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { document.getElementById('storageNote').textContent = 'El navegador no permite guardar las ventas en este perfil.'; }
  }
  const grid = document.getElementById('productGrid');
  let cart = readStore('vds-cart', {});
  let sales = readStore('vds-sales', null);
  let category = 'Todos';

  // The workbook starts with 50 realistic sample sales and five associated sellers.
  if (!Array.isArray(sales)) {
    sales = Array.from({ length: 50 }, (_, i) => {
      const product = products[(i * 3 + Math.floor(i / 4)) % products.length];
      const seller = sellers[i % sellers.length];
      const day = 1 + ((i * 7) % 28);
      const month = 5 + (Math.floor(i / 10) % 6);
      const date = new Date(2026, month - 1, day, 12).toISOString().slice(0, 10);
      return { ventaId: `VTA-${String(i + 1).padStart(4, '0')}`, fecha: date, vendedor: seller.vendedor, cliente: ['Comercial Andina SAC', 'Estudio Norte EIRL', 'Panadería Trigo & Miel', 'Grupo Horizonte SAC', 'Consultora Punto Lima'][i % 5], producto: product.name, cantidad: 1 + (i % 3 === 0 ? 1 : 0), precioUnitario: product.price, total: product.price * (1 + (i % 3 === 0 ? 1 : 0)), estado: 'Registrada' };
    });
    writeStore('vds-sales', sales);
  }

  function renderProducts() {
    const visible = category === 'Todos' ? products : products.filter(p => p.category === category);
    document.getElementById('catalogCount').textContent = `${String(visible.length).padStart(2, '0')} SOLUCIONES`;
    grid.innerHTML = visible.map(p => `<article class="product-card"><div class="product-photo"><img src="${svgIllustration(p.art)}" alt="${esc(p.alt)}"><span class="product-badge">${esc(p.badge)}</span></div><div class="product-info"><span class="product-category">${esc(p.category.toUpperCase())}</span><h3>${esc(p.name)}</h3><p>${esc(p.description)}</p><div class="product-foot"><span class="price">${soles(p.price)} <small>/ ${esc(p.unit)}</small></span><button class="add-button" data-add="${esc(p.id)}">Añadir +</button></div></div></article>`).join('');
  }

  function renderCart() {
    const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
    const count = entries.reduce((sum, [, qty]) => sum + qty, 0);
    const total = entries.reduce((sum, [id, qty]) => sum + (products.find(p => p.id === id)?.price || 0) * qty, 0);
    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartHeadCount').textContent = count ? `(${count})` : '';
    document.getElementById('cartTotal').textContent = soles(total);
    document.getElementById('cartItems').innerHTML = entries.length ? entries.map(([id, qty]) => {
      const p = products.find(x => x.id === id);
      return `<div class="cart-item"><img src="${svgIllustration(p.art)}" alt=""><div><b>${esc(p.name)}</b><small>${soles(p.price)} / ${esc(p.unit)}</small><div class="item-controls"><button data-qty="${id}" data-delta="-1" aria-label="Quitar una unidad">−</button><span>${qty}</span><button data-qty="${id}" data-delta="1" aria-label="Añadir una unidad">+</button></div></div><span class="cart-item-total">${soles(p.price * qty)}</span></div>`;
    }).join('') : '<div class="empty-cart">Tu carrito está esperando.<br>Explora las soluciones y añade la que necesitas.</div>';
    writeStore('vds-cart', cart);
  }

  function openCart() {
    document.getElementById('cartPanel').classList.add('open');
    document.getElementById('overlay').classList.add('open');
    document.getElementById('cartPanel').setAttribute('aria-hidden', 'false');
  }
  function closeCart() {
    document.getElementById('cartPanel').classList.remove('open');
    document.getElementById('overlay').classList.remove('open');
    document.getElementById('cartPanel').setAttribute('aria-hidden', 'true');
  }
  let toastTimer;
  function toast(message) {
    const node = document.getElementById('toast');
    node.textContent = message;
    node.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => node.classList.remove('show'), 2400);
  }
  function downloadWorkbook() {
    if (!window.XLSX) {
      toast('Preparando la descarga de Excel…');
      const loader = document.createElement('script');
      loader.src = 'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js';
      loader.onload = () => downloadWorkbook();
      loader.onerror = () => toast('Excel requiere conexión. Tus ventas siguen guardadas en este navegador.');
      document.head.appendChild(loader);
      return;
    }
    const salesRows = sales.map(({ ventaId, fecha, vendedor, cliente, producto, cantidad, precioUnitario, total, estado }) => ({ VentaID: ventaId, Fecha: fecha, Vendedor: vendedor, Cliente: cliente, Producto: producto, Cantidad: cantidad, PrecioUnitarioPEN: precioUnitario, TotalPEN: total, Estado: estado }));
    const sellerRows = sellers.map(s => ({ Vendedor: s.vendedor, Nombre: s.nombre, Telefono: s.telefono, Correo: s.correo, Zona: s.zona }));
    const book = XLSX.utils.book_new();
    const salesSheet = XLSX.utils.json_to_sheet(salesRows);
    const sellerSheet = XLSX.utils.json_to_sheet(sellerRows);
    salesSheet['!cols'] = [{ wch: 13 }, { wch: 13 }, { wch: 12 }, { wch: 29 }, { wch: 32 }, { wch: 10 }, { wch: 20 }, { wch: 14 }, { wch: 14 }];
    sellerSheet['!cols'] = [{ wch: 12 }, { wch: 22 }, { wch: 17 }, { wch: 34 }, { wch: 16 }];
    salesSheet['!autofilter'] = { ref: `A1:I${salesRows.length + 1}` };
    sellerSheet['!autofilter'] = { ref: `A1:E${sellerRows.length + 1}` };
    XLSX.utils.book_append_sheet(book, salesSheet, 'ventas');
    XLSX.utils.book_append_sheet(book, sellerSheet, 'vendedor');
    XLSX.writeFile(book, 'ventas-y-vendedores.xlsx');
  }

  document.getElementById('filters').addEventListener('click', e => {
    const button = e.target.closest('[data-category]');
    if (!button) return;
    category = button.dataset.category;
    document.querySelectorAll('.filter').forEach(b => b.classList.toggle('active', b === button));
    renderProducts();
  });
  grid.addEventListener('click', e => {
    const button = e.target.closest('[data-add]');
    if (!button) return;
    cart[button.dataset.add] = (cart[button.dataset.add] || 0) + 1;
    renderCart();
    toast('Añadido a tu carrito');
  });
  document.getElementById('cartItems').addEventListener('click', e => {
    const button = e.target.closest('[data-qty]');
    if (!button) return;
    const id = button.dataset.qty;
    cart[id] = Math.max(0, (cart[id] || 0) + Number(button.dataset.delta));
    if (!cart[id]) delete cart[id];
    renderCart();
  });
  document.getElementById('openCart').addEventListener('click', openCart);
  document.getElementById('closeCart').addEventListener('click', closeCart);
  document.getElementById('overlay').addEventListener('click', closeCart);
  document.getElementById('exportExcel').addEventListener('click', downloadWorkbook);
  document.getElementById('checkout').addEventListener('click', () => {
    const entries = Object.entries(cart).filter(([, qty]) => qty > 0);
    if (!entries.length) { toast('Añade al menos un producto para registrar la venta.'); return; }
    const sellerId = document.getElementById('sellerSelect').value;
    const seller = sellers.find(s => s.vendedor === sellerId);
    const customer = document.getElementById('customerName').value.trim() || 'Cliente por confirmar';
    const saleId = `VTA-${String(sales.length + 1).padStart(4, '0')}`;
    const date = new Date().toISOString().slice(0, 10);
    const newRows = entries.map(([id, cantidad]) => {
      const p = products.find(product => product.id === id);
      return { ventaId: saleId, fecha: date, vendedor: seller.vendedor, cliente: customer, producto: p.name, cantidad, precioUnitario: p.price, total: cantidad * p.price, estado: 'Pendiente de confirmación' };
    });
    sales = [...sales, ...newRows];
    writeStore('vds-sales', sales);
    cart = {};
    document.getElementById('customerName').value = '';
    renderCart();
    downloadWorkbook();
    toast(`${saleId} registrada. Excel actualizado descargado.`);
  });
  const sellerSelect = document.getElementById('sellerSelect');
  sellerSelect.innerHTML = sellers.map(s => `<option value="${s.vendedor}">${s.vendedor} · ${esc(s.nombre)}</option>`).join('');
  document.getElementById('heroIllustration').src = svgIllustration('business');
  document.getElementById('teamIllustration').src = svgIllustration('team');
  document.getElementById('bakeryIllustration').src = svgIllustration('bread');
  document.getElementById('menuToggle').addEventListener('click', () => document.querySelector('.nav').classList.toggle('open'));
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => document.querySelector('.nav').classList.remove('open')));
  renderProducts();
  renderCart();
})();
