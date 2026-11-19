// Draws the dotted "connect the dots" lines of the one-pager story.
// <svg class="links" data-links="from > to > colour | …">, where an end is
//   id@c        → edge of a circle (the brAIn hub), or
//   id@ax,ay    → a point on the element's box (fractions), e.g. b1@.5,1 = bottom centre.
// Elements with data-loop get a hand-drawn pen loop (05 Notebook only).
(function () {
  const COL = { navy: '#0B1833', blue: '#2475F5', green: '#16A36A' };
  const INK = '#1C64D8';
  const f = n => Math.round(n * 10) / 10;

  function draw() {
    document.querySelectorAll('svg.links').forEach(svg => {
      const slide = svg.closest('.slide');
      const sr = slide.getBoundingClientRect(), k = sr.width / slide.offsetWidth;
      const box = el => { const r = el.getBoundingClientRect(); return { x: (r.left - sr.left) / k, y: (r.top - sr.top) / k, w: r.width / k, h: r.height / k }; };
      const end = s => {
        const [id, an] = s.split('@');
        const g = box(document.getElementById(id));
        if (an === 'c') return { x: g.x + g.w / 2, y: g.y + g.h / 2, r: g.w / 2 + 14 };
        const [ax, ay] = an.split(',').map(Number);
        return { x: g.x + g.w * ax, y: g.y + g.h * ay, r: 10 };
      };
      let lines = '', dots = '';
      (svg.dataset.links || '').split('|').map(s => s.trim()).filter(Boolean).forEach(spec => {
        const [a, b, kind] = spec.split('>').map(s => s.trim());
        const A = end(a), B = end(b), c = COL[kind || 'blue'];
        const dx = B.x - A.x, dy = B.y - A.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L;
        const x1 = A.x + ux * A.r, y1 = A.y + uy * A.r, x2 = B.x - ux * B.r, y2 = B.y - uy * B.r;
        lines += `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${c}" stroke-width="5" stroke-linecap="round" stroke-dasharray="0.1 12"/>`;
        dots += `<circle cx="${f(x1)}" cy="${f(y1)}" r="7" fill="${c}" stroke="#fff" stroke-width="2.5"/><circle cx="${f(x2)}" cy="${f(y2)}" r="7" fill="${c}" stroke="#fff" stroke-width="2.5"/>`;
      });
      let loops = '';
      slide.querySelectorAll('[data-loop]').forEach(el => {
        const g = box(el), cx = g.x + g.w / 2, cy = g.y + g.h / 2, pad = Number(el.dataset.loop || 26);
        const rx = g.w / 2 + pad, ry = g.h / 2 + pad * 0.8, pts = [];
        for (let i = 0; i <= 64; i++) {
          const t = -0.35 + (i / 64) * (Math.PI * 2 + 0.55);
          const wob = 1 + 0.035 * Math.sin(t * 3 + 1) + (i / 64) * 0.06;
          pts.push([cx + Math.cos(t) * rx * wob, cy + Math.sin(t) * ry * wob]);
        }
        loops += `<path d="M${pts.map(p => f(p[0]) + ' ' + f(p[1])).join(' L')}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
      });
      svg.innerHTML = `<g class="nb-only">${loops}</g>${lines}${dots}`;
    });
  }
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(draw);
})();
