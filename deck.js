// Web viewer for the Stylo decks: slides scaled to the screen, plus a Present mode.
// Rendering for PDF/PPTX opens the page with ?raw, which leaves the slides untouched.
(function () {
  if (/[?&]raw\b/.test(location.search)) return;
  const slides = [...document.querySelectorAll('.slide')];
  if (!slides.length) return;
  const W = slides[0].offsetWidth, H = slides[0].offsetHeight;
  const b = document.body;
  b.classList.add('viewer');

  const css = document.createElement('style');
  css.textContent = `
    body.viewer { background: #E9EDF2; min-height: 100vh; }
    .deckbar { position: sticky; top: 0; z-index: 10; background: #fff; border-bottom: 1px solid #E5E7EB; font-family: Inter, system-ui, sans-serif; }
    .deckbar .in { max-width: 1240px; margin: 0 auto; padding: 0 16px; height: 60px; display: flex; align-items: center; gap: 14px; }
    .deckbar img { height: 24px; }
    .deckbar .t { font-weight: 700; font-size: 15px; color: #0B1833; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .deckbar a, .deckbar button { font: 600 13px Inter, system-ui, sans-serif; color: #0B1833; background: #fff; border: 1.5px solid #D0D5DD; border-radius: 999px; padding: 8px 14px; text-decoration: none; cursor: pointer; white-space: nowrap; }
    .deckbar .go { background: #0D8755; border-color: #0D8755; color: #fff; }
    .frame { position: relative; width: min(1240px, calc(100% - 32px)); margin: 20px auto; overflow: hidden; border-radius: 6px; box-shadow: 0 1px 2px rgba(11,24,51,.08), 0 0 0 1px #D9DEE5; background: #fff; }
    .frame > .slide { position: absolute; left: 0; top: 0; transform-origin: 0 0; }
    body.present { overflow: hidden; background: #F7F8FA; }
    body.present .deckbar, body.present .frame:not(.on) { display: none; }
    body.present .frame.on { position: fixed; margin: 0; left: 50%; top: 50%; translate: -50% -50%; box-shadow: 0 0 0 1px #D9DEE5; border-radius: 0; }
    .hint { position: fixed; right: 16px; bottom: 12px; font: 500 12px Inter, sans-serif; color: #667085; display: none; }
    body.present .hint { display: block; }
    @media (max-width: 640px) { .deckbar .hide-s { display: none; } .frame { margin: 12px auto; } }
  `;
  document.head.appendChild(css);

  const bar = document.createElement('div');
  bar.className = 'deckbar';
  const pdf = b.dataset.pdf, pptx = b.dataset.pptx;
  bar.innerHTML = `<div class="in"><a href="../" style="border:0;padding:0"><img src="../assets/brand/stylo-colour.svg" alt="Stylo"></a>
    <div class="t">${document.title}</div>
    ${pdf ? `<a class="hide-s" href="${pdf}" download>PDF</a>` : ''}
    ${pptx ? `<a class="hide-s" href="${pptx}" download>Canva PPTX</a>` : ''}
    <button class="go" type="button">Present</button></div>`;
  b.prepend(bar);
  const hint = document.createElement('div'); hint.className = 'hint'; hint.textContent = '← → to move · Esc to exit';
  b.appendChild(hint);

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
