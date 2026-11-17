// Stylo decks: style switch (05 Notebook / 01 Plant) + web viewer with Present mode.
// Rendering for PDF/PPTX opens the page with ?raw (and &style=01 for the Plant look).
(function () {
  const html = document.documentElement, b = document.body;
  const q = new URLSearchParams(location.search);
  const raw = q.has('raw');

  // ---- style switch -------------------------------------------------------
  const isoEls = [...document.querySelectorAll('[data-iso]')];
  isoEls.forEach(el => { el.dataset.nbStyle = el.getAttribute('style') || ''; });
  function applyStyle(st) {
    html.classList.toggle('s01', st === '01');
    isoEls.forEach(el => el.setAttribute('style', st === '01' ? el.dataset.nbStyle + ';' + el.dataset.iso : el.dataset.nbStyle));
  }
  let style = html.classList.contains('s01') ? '01' : '05';
  applyStyle(style);
  if (raw) return;

  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;
  const W = slides[0].offsetWidth, H = slides[0].offsetHeight;
  b.classList.add('viewer');

  const css = document.createElement('style');
  css.textContent = `
    body.viewer { background: #E9EDF2; min-height: 100vh; }
    .deckbar { position: sticky; top: 0; z-index: 10; background: #fff; border-bottom: 1px solid #E5E7EB; font-family: Inter, system-ui, sans-serif; }
    .deckbar .in { max-width: 1240px; margin: 0 auto; padding: 0 16px; min-height: 60px; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .deckbar img { height: 24px; display: block; }
    .deckbar .t { font-weight: 700; font-size: 15px; color: #0B1833; flex: 1; min-width: 120px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .deckbar a.btn, .deckbar button.go { font: 600 13px Inter, system-ui, sans-serif; color: #0B1833; background: #fff; border: 1.5px solid #D0D5DD; border-radius: 999px; padding: 8px 14px; text-decoration: none; cursor: pointer; white-space: nowrap; }
    .deckbar .go { background: #0D8755 !important; border-color: #0D8755 !important; color: #fff !important; }
    .seg { display: inline-flex; border: 1.5px solid #D0D5DD; border-radius: 999px; padding: 3px; background: #F7F8FA; }
    .seg button { font: 600 13px Inter, system-ui, sans-serif; border: 0; background: transparent; color: #475467; border-radius: 999px; padding: 6px 12px; cursor: pointer; white-space: nowrap; }
    .seg button[aria-pressed="true"] { background: #0B1833; color: #fff; }
    .seg .k { font-family: "JetBrains Mono", monospace; font-size: 11px; opacity: .75; margin-right: 6px; }
    .frame { position: relative; width: min(1240px, calc(100% - 32px)); margin: 20px auto; overflow: hidden; border-radius: 6px; box-shadow: 0 1px 2px rgba(11,24,51,.08), 0 0 0 1px #D9DEE5; background: #fff; }
    .frame > .slide { position: absolute; left: 0; top: 0; transform-origin: 0 0; }
    body.present { overflow: hidden; background: #F7F8FA; }
    body.present .deckbar, body.present .frame:not(.on) { display: none; }
    body.present .frame.on { position: fixed; margin: 0; left: 50%; top: 50%; translate: -50% -50%; box-shadow: 0 0 0 1px #D9DEE5; border-radius: 0; }
    .hint { position: fixed; right: 16px; bottom: 12px; font: 500 12px Inter, sans-serif; color: #667085; display: none; }
    body.present .hint { display: block; }
    @media (max-width: 640px) { .deckbar .hide-s { display: none; } .frame { margin: 12px auto; } .deckbar .in { padding: 8px 12px; } }
  `;
  document.head.appendChild(css);

  const bar = document.createElement('div');
  bar.className = 'deckbar';
  bar.innerHTML = `<div class="in"><a href="../" class="home"><img src="../assets/brand/stylo-colour.svg" alt="Stylo"></a>
    <div class="t">${document.title}</div>
    <div class="seg" role="group" aria-label="Style">
      <button type="button" data-st="05"><span class="k">05</span>Notebook</button>
      <button type="button" data-st="01"><span class="k">01</span>Plant</button>
    </div>
    <a class="btn hide-s pdf" download>PDF</a>
    <a class="btn hide-s pptx" download>Canva PPTX</a>
    <button class="go" type="button">Present</button></div>`;
  b.prepend(bar);
  const hint = document.createElement('div'); hint.className = 'hint'; hint.textContent = '← → to move · Esc to exit';
  b.appendChild(hint);

  function syncBar() {
    bar.querySelectorAll('.seg button').forEach(x => x.setAttribute('aria-pressed', String(x.dataset.st === style)));
    const d = b.dataset;
    const pdf = style === '01' ? d.pdf01 : d.pdf, pptx = style === '01' ? d.pptx01 : d.pptx;
    const P = bar.querySelector('.pdf'), X = bar.querySelector('.pptx');
    if (pdf) P.href = pdf; else P.remove();
    if (pptx) X.href = pptx; else X.remove();
    bar.querySelector('.home').href = '../' + (style === '01' ? '?style=01' : '');
  }
  bar.querySelectorAll('.seg button').forEach(btn => btn.onclick = () => {
    style = btn.dataset.st; applyStyle(style); syncBar();
    try { localStorage.setItem('styloStyle', style); } catch (e) {}
    const u = new URL(location.href); if (style === '01') u.searchParams.set('style', '01'); else u.searchParams.delete('style');
    history.replaceState(null, '', u);
  });
  syncBar();

  // ---- viewer ---------------------------------------------------------------
  const frames = slides.map(s => { const f = document.createElement('div'); f.className = 'frame'; s.parentNode.insertBefore(f, s); f.appendChild(s); return f; });
  let cur = 0;
  function fit() {
    const present = b.classList.contains('present');
    frames.forEach((f, i) => {
      let sc;
      if (present && i === cur) { sc = Math.min(innerWidth / W, innerHeight / H); f.style.width = W * sc + 'px'; }
      else { f.style.width = ''; sc = f.clientWidth / W; }
      f.style.height = H * sc + 'px';
      f.firstElementChild.style.transform = `scale(${sc})`;
    });
  }
  function show(i) { cur = Math.max(0, Math.min(frames.length - 1, i)); frames.forEach((f, j) => f.classList.toggle('on', j === cur)); fit(); }
  function enter() { b.classList.add('present'); show(cur); document.documentElement.requestFullscreen?.().catch(() => {}); }
  function exit() { b.classList.remove('present'); frames.forEach(f => f.classList.remove('on')); fit(); if (document.fullscreenElement) document.exitFullscreen(); frames[cur].scrollIntoView({ block: 'center' }); }
  bar.querySelector('.go').onclick = enter;
  frames.forEach((f, i) => f.addEventListener('dblclick', () => { cur = i; enter(); }));
  addEventListener('keydown', e => {
    if (!b.classList.contains('present')) return;
    if (['ArrowRight', 'ArrowDown', ' ', 'PageDown'].includes(e.key)) { e.preventDefault(); show(cur + 1); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); show(cur - 1); }
    if (e.key === 'Escape') exit();
  });
  document.addEventListener('fullscreenchange', () => { if (!document.fullscreenElement && b.classList.contains('present')) exit(); });
  let x0 = null;
  addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  addEventListener('touchend', e => { if (x0 === null || !b.classList.contains('present')) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1)); x0 = null; });
  addEventListener('click', e => { if (b.classList.contains('present') && !e.target.closest('a,button')) show(cur + (e.clientX > innerWidth / 3 ? 1 : -1)); });
  addEventListener('resize', fit);
  document.fonts.ready.then(fit); fit();
})();
