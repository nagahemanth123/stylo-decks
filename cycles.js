// Line icons (<i data-ic="name"></i> → inline SVG) and dotted flow tracks for the cycle decks.
// Icons: 48×48, navy strokes, accent strokes (class "a") in the deck colour (green, or blue for brAIn).
(function () {
  const doc = 'M14 6h14l9 9v25a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z M28 6v9h9';
  const I = {
    plan: '<rect x="10" y="8" width="28" height="34" rx="4"/><path d="M18 8V5h12v3"/><path class="a" d="M17 20h14M17 28h14M17 36h8"/>',
    po: `<path d="${doc}"/><path class="a" d="M18 22h12M18 27h12M21 22c6 0 6 5 0 5l7 8"/>`,
    gate: '<path d="M10 42V12M38 42V30"/><path d="M4 42h40"/><rect x="10" y="17" width="34" height="7" rx="2"/><path class="a" d="M17 17l-4 7M25 17l-4 7M33 17l-4 7M41 17l-4 7"/>',
    scale: '<path d="M10 22h28l4 18H6z"/><path d="M14 13h20M24 13v9"/><circle class="a" cx="24" cy="31" r="5"/><path class="a" d="M24 31l3-3"/>',
    flask: '<path d="M18 6h12M21 6v12L10 38a3 3 0 0 0 2.6 4.5h22.8A3 3 0 0 0 38 38L27 18V6"/><path class="a" d="M14.5 31h19"/><path class="a" d="M21 37h.01M27 35h.01"/>',
    shelves: '<path d="M8 6v36M40 6v36M8 20h32M8 33h32"/><path class="a" d="M13 14h8v6h-8zM26 27h9v6h-9zM14 27h6v6h-6z"/>',
    dispense: '<path d="M12 12c0-3.5 24-3.5 24 0v24c0 3.5-24 3.5-24 0z"/><path d="M12 12c0 3.5 24 3.5 24 0"/><path class="a" d="M24 19v13M19 27l5 5 5-5"/>',
    factory: '<path d="M6 42V22l10 6v-6l10 6v-6l10 6V8h6v34z"/><path class="a" d="M13 35h5M23 35h5M33 35h4"/>',
    release: '<circle cx="24" cy="18" r="12"/><path d="M17 28l-4 14 7-3 4 5 4-5 7 3-4-14"/><path class="a" d="M19 18l4 4 7-7"/>',
    truck: '<path d="M4 12h24v21H4zM28 19h9l7 8v6H28z"/><circle class="a" cx="12" cy="37" r="4"/><circle class="a" cx="35" cy="37" r="4"/>',
    mail: '<rect x="6" y="11" width="36" height="26" rx="3"/><path class="a" d="M7 13l17 13 17-13"/>',
    usercheck: '<circle cx="20" cy="16" r="7"/><path d="M7 41c1.5-8 6.5-12 13-12s11.5 4 13 12"/><path class="a" d="M31 22l4 4 8-8"/>',
    quote: `<path d="${doc}"/><path class="a" d="M18 22h12M18 28h12M18 34h7"/>`,
    nego: '<path d="M8 16h28M30 10l6 6-6 6"/><path class="a" d="M40 32H12M18 26l-6 6 6 6"/>',
    cart: '<path d="M5 8h6l5 22h21l4-14H13"/><circle class="a" cx="19" cy="38" r="3"/><circle class="a" cx="35" cy="38" r="3"/>',
    gear: '<circle cx="24" cy="24" r="11"/><path d="M24 6v6M24 36v6M6 24h6M36 24h6M11.3 11.3l4.2 4.2M32.5 32.5l4.2 4.2M36.7 11.3l-4.2 4.2M11.3 36.7l4.2-4.2"/><circle class="a" cx="24" cy="24" r="4.5"/>',
    box: '<path d="M8 15l16-8 16 8v18l-16 8-16-8z"/><path d="M8 15l16 8 16-8M24 23v18"/><path class="a" d="M16 11l16 8"/>',
    einv: `<path d="${doc}"/><path class="a" d="M17 24h6v6h-6zM27 24h4v2M27 30h4M17 35h4M26 35h5"/>`,
    eway: '<path d="M14 42L19 6M34 42L29 6"/><path class="a" d="M24 9v5M24 20v6M24 32v7"/>',
    rupee: '<circle cx="24" cy="24" r="18"/><path class="a" d="M18 16h12M18 22h12M21 16c6.5 0 6.5 6 0 6l7 10"/>',
    hire: '<circle cx="18" cy="16" r="6.5"/><path d="M6 40c1.4-7.4 6-11 12-11s10.6 3.6 12 11"/><path class="a" d="M37 13v12M31 19h12"/>',
    mega: '<path d="M8 19v10h6l15 8V11l-15 8z"/><path d="M14 29l3 10h5l-2-9"/><path class="a" d="M35 18c3 2.5 3 9.5 0 12M39 14c5 5 5 15 0 20"/>',
    filter: '<path d="M6 8h36L28 25v13l-8 4V25z"/><path class="a" d="M14 14h20"/>',
    chat: '<path d="M6 9h24v15H15l-6 5v-5H6z"/><path class="a" d="M35 18h7v14h-3v5l-5-5H22v-4"/>',
    offer: `<path d="${doc}"/><path class="a" d="M18 29l4 4 9-9"/>`,
    idcard: '<rect x="6" y="11" width="36" height="27" rx="3"/><circle cx="17" cy="22" r="4"/><path d="M10.5 32.5c1-3.5 3.3-5 6.5-5s5.5 1.5 6.5 5"/><path class="a" d="M28 21h9M28 27h9"/>',
    attend: '<rect x="7" y="10" width="34" height="31" rx="3"/><path d="M7 18h34M16 6v8M32 6v8"/><path class="a" d="M14 26h4M22 26h4M30 26h4M14 33h4M22 33h4"/>',
    target: '<circle cx="22" cy="26" r="16"/><circle cx="22" cy="26" r="8.5"/><path class="a" d="M22 26L38 10M32 10h6v6"/>',
    growth: '<path d="M8 7v33h33"/><path d="M16 40v-7M24 40v-11M32 40v-6"/><path class="a" d="M14 27l8-8 6 4 12-12M34 11h6v6"/>',
    exit: '<path d="M30 8H12v32h18"/><path d="M21 24h.01"/><path class="a" d="M26 24h16M36 18l6 6-6 6"/>',
    // brAIn deck
    task: '<rect x="10" y="8" width="28" height="34" rx="4"/><path d="M18 8V5h12v3"/><path class="a" d="M16 20l3 3 6-6M16 32l3 3 6-6"/><path d="M29 21h4M29 33h4"/>',
    analytics: '<path d="M8 7v33h33"/><path d="M16 40v-8M24 40v-13M32 40v-6" stroke-width="4.5"/><path class="a" d="M14 24l8-7 7 4 11-11M33 10h7v7"/>',
    report: '<path d="M14 6h14l9 9v25a2 2 0 0 1-2 2H14a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M28 6v9h9M18 24h12M18 30h12"/><path class="a" d="M18 36h7"/>',
    answer: '<path d="M8 12a4 4 0 0 1 4-4h24a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H20l-8 7v-7a4 4 0 0 1-4-4z"/><path class="a" d="M17 20h.01M24 20h.01M31 20h.01" stroke-width="4.8"/>',
    dash: '<rect x="6" y="8" width="36" height="26" rx="3"/><path d="M17 42h14M24 34v8"/><path class="a" d="M12 26l7-7 6 4 10-10"/>',
    cursor: '<path d="M11 7l23 13-10 3-4 11z"/><path class="a" d="M27 32c4 3 9 3 12-1M33 40c4 0 7-2 8-5" stroke-dasharray="0.1 6"/>',
    shield: '<path d="M24 6l15 6v10c0 10-6.6 16.6-15 20C15.6 38.6 9 32 9 22V12z"/><path class="a" d="M17 24l5 5 9-10"/>',
    log: '<path d="M18 11h22M18 21h22M18 31h22M18 41h14"/><path class="a" d="M9 11h.01M9 21h.01M9 31h.01M9 41h.01" stroke-width="5"/>',
    db: '<path d="M10 12c0-4.5 28-4.5 28 0v24c0 4.5-28 4.5-28 0z"/><path d="M10 12c0 4.5 28 4.5 28 0"/><path class="a" d="M10 24c0 4.5 28 4.5 28 0"/>',
    map: '<circle cx="12" cy="12" r="4.5"/><circle cx="36" cy="14" r="4.5"/><circle cx="14" cy="36" r="4.5"/><circle class="a" cx="34" cy="35" r="5.5"/><path d="M16 13l15.5 1M13 16.5l1 15M18 36h10.5M35 18.5v11"/>',
    lock: '<rect x="11" y="21" width="26" height="21" rx="3"/><path d="M17 21v-6a7 7 0 0 1 14 0v6"/><path class="a" d="M24 29v6"/>',
    role: '<circle cx="18" cy="15" r="7"/><path d="M5 40c1.5-8 6.5-12 13-12 3 0 5.6.8 7.6 2.4"/><circle class="a" cx="34" cy="31" r="5"/><path class="a" d="M37.5 34.5L43 40M40 37l-2.5 2.5"/>',
    server: '<rect x="8" y="8" width="32" height="13" rx="2"/><rect x="8" y="27" width="32" height="13" rx="2"/><path class="a" d="M14 14.5h.01M14 33.5h.01M20 14.5h.01M20 33.5h.01" stroke-width="4.5"/>',
    check: '<circle cx="24" cy="24" r="18"/><path class="a" d="M16 24l6 6 11-12"/>',
    you: '<circle cx="24" cy="16.5" r="8"/><path d="M9 41c1.6-8.6 7.6-13 15-13s13.4 4.4 15 13"/>',
    puzzle: '<path d="M10 14h9a4 4 0 1 1 8 0h9v9a4 4 0 1 0 0 8v9H10V31a4 4 0 1 0 0-8z"/><path class="a" d="M18 27h9"/>',
    pencil: '<path d="M30 8l10 10-22 22H8V30z"/><path class="a" d="M25 13l10 10"/>',
    bolt: '<path d="M27 4L11 27h12l-2 17 16-24H25z"/><path class="a" d="M17 27h6"/>'
  };
  window.STYLO_IC = I;
  document.querySelectorAll('i[data-ic]').forEach(el => {
    const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 48 48'); s.setAttribute('class', 'ic'); s.setAttribute('data-flat', '');
    s.innerHTML = I[el.dataset.ic] || '';
    el.replaceWith(s);
  });

  // Dotted tracks: <svg class="track" data-flow="c1" data-col="#16A36A"> joins the .ci circles of
  // every .nd[data-flow="c1"] in DOM order. A drop to a new row routes right, down, back, down.
  const f = n => Math.round(n * 10) / 10;
  function draw() {
    document.querySelectorAll('svg.track').forEach(svg => {
      const slide = svg.closest('.slide');
      const sr = slide.getBoundingClientRect(), k = sr.width / slide.offsetWidth;
      const pts = [...slide.querySelectorAll(`.nd[data-flow="${svg.dataset.flow}"] .ci`)].map(el => {
        const r = el.getBoundingClientRect();
        return { x: (r.left - sr.left + r.width / 2) / k, y: (r.top - sr.top + r.height / 2) / k, r: r.width / k / 2 };
      });
      const col = svg.dataset.col || '#16A36A', off = Number(svg.dataset.off || 104), R = 34;
      let d = '', arrows = '';
      const chev = (x, y, dir) => {
        const s = dir === 'r' ? 1 : -1;
        arrows += `<path d="M${f(x - 7 * s)} ${f(y - 10)} L${f(x + 5 * s)} ${f(y)} L${f(x - 7 * s)} ${f(y + 10)}" fill="none" stroke="${col}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
      };
      for (let i = 0; i < pts.length - 1; i++) {
        const A = pts[i], B = pts[i + 1];
        if (Math.abs(A.y - B.y) < 6) {
          const x1 = A.x + A.r + 12, x2 = B.x - B.r - 12;
          d += `M${f(x1)} ${f(A.y)} L${f(x2)} ${f(B.y)} `;
          chev((x1 + x2) / 2, A.y, 'r');
        } else {
          const ym = Number(svg.dataset.mid || (A.y + B.y) / 2), xr = A.x + A.r + off, xl = B.x - B.r - off;
          d += `M${f(A.x + A.r + 12)} ${f(A.y)} L${f(xr - R)} ${f(A.y)} Q${f(xr)} ${f(A.y)} ${f(xr)} ${f(A.y + R)} L${f(xr)} ${f(ym - R)} Q${f(xr)} ${f(ym)} ${f(xr - R)} ${f(ym)} ` +
               `L${f(xl + R)} ${f(ym)} Q${f(xl)} ${f(ym)} ${f(xl)} ${f(ym + R)} L${f(xl)} ${f(B.y - R)} Q${f(xl)} ${f(B.y)} ${f(xl + R)} ${f(B.y)} L${f(B.x - B.r - 12)} ${f(B.y)} `;
          const mx = (xr + xl) / 2;
          arrows += `<path d="M${f(mx + 7)} ${f(ym - 10)} L${f(mx - 5)} ${f(ym)} L${f(mx + 7)} ${f(ym + 10)}" fill="none" stroke="${col}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`;
        }
      }
      svg.innerHTML = `<path d="${d}" fill="none" stroke="${col}" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 12"/>${arrows}`;
    });
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(draw);
})();
