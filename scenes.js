// Isometric plant scenes for style 01. Each <svg data-scene> is drawn once; CSS shows it only in 01.
(function () {
  if (!window.Iso) return;
  const { INK, GREEN, DEEP, MINT, PALE, WHITE } = ISO_COL;
  function plant(iso, full) {
    iso.tile(-0.5, -0.5, 0, 15, 13, WHITE, { k: -5000 });
    for (let i = 0; i < 15; i++) iso.tile(i - 0.5, 6.6, 0.001, 0.5, 0.12, MINT, { k: -4000 });
    iso.rack(0.4, 0.6, 4, 2, { alt: true }); iso.rack(2.2, 0.6, 4, 2);
    iso.box(5.2, 0.4, 0, 3.2, 2.6, 2.1, { windows: 3, door: 1.0 });
    iso.box(6.2, 1.0, 2.1, 1.0, 1.0, 0.7, { top: WHITE });
    iso.box(9.6, 0.6, 0, 2.6, 2.2, 1.8, { windows: 2, door: 0.8 });
    iso.box(1.0, 5.0, 0, 12.0, 0.9, 0.38, { top: WHITE, left: MINT, right: WHITE, bias: -0.2 });
    for (let i = 0; i < 6; i++) iso.drum(2.0 + i * 1.9, 5.45, 0.38, 0.3, 0.68, { bias: 0.3, body: i === 2 ? DEEP : GREEN });
    iso.box(1.0, 8.0, 0, 5.0, 3.0, 2.9, { windows: 3, door: 1.6 });
    iso.box(2.0, 8.6, 2.9, 0.7, 0.7, 1.3, { top: WHITE });
    iso.box(7.4, 8.4, 0, 3.0, 2.4, 1.6, { windows: 2 });
    iso.box(11.4, 8.2, 0, 1.5, 2.9, 1.4, { top: WHITE, left: MINT, right: WHITE });
    iso.box(11.5, 11.1, 0, 1.3, 1.0, 1.0, { top: GREEN, left: MINT, right: WHITE });
    iso.box(12.8, 3.0, 0, 1.4, 1.2, 1.3, { door: 0.3 });
  }
  function mini(iso) {
    iso.tile(-0.5, -0.5, 0, 8, 6, WHITE, { k: -5000 });
    iso.box(0.2, 0.3, 0, 3.0, 2.4, 2.2, { windows: 2, door: 1.0 });
    iso.box(1.0, 0.8, 2.2, 0.6, 0.6, 1.0, { top: WHITE });
    iso.box(0.4, 3.4, 0, 6.6, 0.8, 0.34, { top: WHITE, left: MINT, right: WHITE, bias: -0.2 });
    for (let i = 0; i < 4; i++) iso.drum(1.0 + i * 1.6, 3.8, 0.34, 0.28, 0.62, { bias: 0.3, body: i === 1 ? DEEP : GREEN });
    iso.box(4.4, 0.4, 0, 1.4, 2.6, 1.3, { top: WHITE, left: MINT, right: WHITE });
    iso.box(4.5, 3.0, 0, 1.2, 0.9, 0.9, { top: GREEN });
    iso.box(6.0, 0.6, 0, 1.2, 1.0, 0.9, { top: GREEN });
  }
  document.querySelectorAll('svg[data-scene]').forEach(svg => {
    const kind = svg.dataset.scene;
    if (kind === 'title') {
      const iso = new Iso(svg, { s: 42, ox: 1450, oy: Number(svg.dataset.oy || 540), stroke: 1.7 });
      plant(iso);
      const [x, y] = iso.at(10.9, 1.7, 1.8);
      const [tx, ty] = (svg.dataset.leader || '1700,300').split(',').map(Number);
      iso.extra(`<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="${INK}" stroke-width="2" stroke-dasharray="6 6"/><circle cx="${x}" cy="${y}" r="9" fill="${GREEN}" stroke="${INK}" stroke-width="2"/>`, 9999);
      iso.draw();
    } else if (kind === 'problem') {
      const s = 28, k = s / 44;
      const iso = new Iso(svg, { s, ox: 1590, oy: 232, stroke: 1.5 });
      plant(iso);
      const bub = (x, y, z) => { const [a, b] = iso.at(x, y, z); return `<g transform="translate(${a},${b - 52 * k}) scale(${k})"><path d="M-34 -30 h68 a10 10 0 0 1 10 10 v40 a10 10 0 0 1 -10 10 h-24 l-10 14 l-10 -14 h-24 a10 10 0 0 1 -10 -10 v-40 a10 10 0 0 1 10 -10 z" fill="${WHITE}" stroke="${INK}" stroke-width="2.5"/><text x="0" y="11" text-anchor="middle" font-family="Inter" font-weight="800" font-size="30" fill="${INK}">?</text></g>`; };
      const tags = (svg.dataset.tags || '').split('|');
      const tag = (x, y, z, t) => { const [a, b] = iso.at(x, y, z); const w = t.length * 9.6 + 20; return `<g transform="translate(${a + 10},${b - 14})"><rect x="0" y="0" width="${w}" height="26" rx="4" fill="${WHITE}" stroke="${INK}" stroke-width="1.6"/><text x="10" y="18" font-family="JetBrains Mono" font-weight="600" font-size="12.5" letter-spacing=".8" fill="${INK}">${t}</text></g>`; };
      iso.extra(bub(6.8, 1.7, 2.8) + bub(10.9, 1.7, 1.8) + bub(1.3, 2.6, 2.2), 9999);
      iso.extra(tag(5.6, 3.6, 0.9, tags[0] || '') + tag(0.2, 4.4, 0.4, tags[1] || '') + tag(3.0, 11.4, 1.6, tags[2] || ''), 9998);
      const p1 = iso.at(1.0, 11.4, 0), p2 = iso.at(6.2, 11.4, 0), h = 18;
      iso.extra(`<defs><pattern id="hz${kind}" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="20" fill="#FDB022"/><rect x="10" width="10" height="20" fill="${INK}"/></pattern></defs><path d="M${p1[0]} ${p1[1] - 28} L${p2[0]} ${p2[1] - 28} L${p2[0]} ${p2[1] - 28 + h} L${p1[0]} ${p1[1] - 28 + h} Z" fill="url(#hz${kind})" stroke="${INK}" stroke-width="1.6"/>`, 9997);
      iso.draw();
    } else if (kind === 'mini') {
      const [ox, oy, s] = (svg.dataset.at || '1560,840,26').split(',').map(Number);
      const iso = new Iso(svg, { s, ox, oy, stroke: 1.5 });
      mini(iso); iso.draw();
    }
  });
})();
