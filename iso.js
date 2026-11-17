// Tiny isometric drawing kit for the Stylo "Isometric Plant" look (code-drawn, no images).
// Units are grid cells; P() projects to screen. Draw back-to-front (sorted by depth).
(function () {
  const C = Math.cos(Math.PI / 6), S = Math.sin(Math.PI / 6);
  const INK = '#0B1833', GREEN = '#16A36A', DEEP = '#087A4C', MINT = '#CFEFDF', PALE = '#EAF8F1', WHITE = '#FFFFFF';

  function Iso(svg, { s = 40, ox = 0, oy = 0, stroke = 1.6 } = {}) {
    this.svg = svg; this.s = s; this.ox = ox; this.oy = oy; this.sw = stroke; this.items = [];
  }
  Iso.prototype.P = function (x, y, z) {
    return [this.ox + (x - y) * C * this.s, this.oy + (x + y) * S * this.s - z * this.s];
  };
  Iso.prototype.poly = function (pts, fill, extra = '') {
    const d = pts.map(p => this.P(...p)).map(([a, b], i) => (i ? 'L' : 'M') + a.toFixed(1) + ' ' + b.toFixed(1)).join(' ') + ' Z';
    return `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${this.sw}" stroke-linejoin="round" ${extra}/>`;
  };
  // a box: top / front-left (y+d) / front-right (x+w)
  Iso.prototype.box = function (x, y, z, w, d, h, o = {}) {
    const top = o.top || GREEN, left = o.left || MINT, right = o.right || WHITE;
    const g = [
      this.poly([[x, y + d, z], [x + w, y + d, z], [x + w, y + d, z + h], [x, y + d, z + h]], left),
      this.poly([[x + w, y, z], [x + w, y + d, z], [x + w, y + d, z + h], [x + w, y, z + h]], right),
      this.poly([[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]], top),
    ];
    if (o.windows) g.push(this.windows(x, y, z, w, d, h, o.windows));
    if (o.door) g.push(this.door(x, y, z, w, d, h, o.door));
    this.items.push({ k: x + y + z * 0.01 + (o.bias || 0), svg: g.join('') });
    return this;
  };
  // windows on the front-right face (x+w)
  Iso.prototype.windows = function (x, y, z, w, d, h, n) {
    let out = '';
    const gap = d / (n + 1);
    for (let i = 1; i <= n; i++) {
      const yy = y + gap * i - 0.22;
      out += this.poly([[x + w, yy, z + h * 0.45], [x + w, yy + 0.44, z + h * 0.45], [x + w, yy + 0.44, z + h * 0.75], [x + w, yy, z + h * 0.75]], PALE);
    }
    return out;
  };
  Iso.prototype.door = function (x, y, z, w, d, h, at) {
    const xx = x + at;
    return this.poly([[xx, y + d, z], [xx + 0.7, y + d, z], [xx + 0.7, y + d, z + Math.min(1.1, h * 0.7)], [xx, y + d, z + Math.min(1.1, h * 0.7)]], GREEN);
  };
  // a flat tile (ground, belt)
  Iso.prototype.tile = function (x, y, z, w, d, fill = WHITE, o = {}) {
    this.items.push({ k: (o.k !== undefined ? o.k : -1000 + x + y), svg: this.poly([[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]], fill, o.extra || '') });
    return this;
  };
  // a drum (cylinder) standing at x,y,z, radius r (cells), height h
  Iso.prototype.drum = function (x, y, z, r = 0.32, h = 0.75, o = {}) {
    const [cx, cyb] = this.P(x, y, z), [, cyt] = this.P(x, y, z + h);
    const rx = r * this.s * 1.22, ry = rx * 0.5;
    const body = o.body || GREEN, lid = o.lid || MINT;
    const sw = this.sw;
    const svg = `<path d="M${cx - rx} ${cyt} L${cx - rx} ${cyb} A${rx} ${ry} 0 0 0 ${cx + rx} ${cyb} L${cx + rx} ${cyt} Z" fill="${body}" stroke="${INK}" stroke-width="${sw}"/>` +
      `<path d="M${cx - rx} ${(cyt + cyb) / 2} A${rx} ${ry} 0 0 0 ${cx + rx} ${(cyt + cyb) / 2}" fill="none" stroke="${INK}" stroke-width="${sw * 0.7}" opacity=".55"/>` +
      `<ellipse cx="${cx}" cy="${cyt}" rx="${rx}" ry="${ry}" fill="${lid}" stroke="${INK}" stroke-width="${sw}"/>`;
    this.items.push({ k: x + y + 0.5 + (o.bias || 0), svg });
    return this;
  };
  // a rack: posts + shelves with drums
  Iso.prototype.rack = function (x, y, len = 3, levels = 2, o = {}) {
    for (let l = 0; l < levels; l++) {
      this.box(x, y, l * 1.1, 0.9, len, 0.12, { top: WHITE, left: MINT, right: WHITE, bias: l * 0.01 });
      for (let i = 0; i < len; i++) this.drum(x + 0.45, y + 0.5 + i, l * 1.1 + 0.12, 0.3, 0.7, { bias: l * 0.02 + 0.05, body: (o.alt && (i + l) % 3 === 1) ? DEEP : GREEN });
    }
    return this;
  };
  // a point on screen for leader lines
  Iso.prototype.at = function (x, y, z) { return this.P(x, y, z); };
  Iso.prototype.extra = function (svg, k = 999) { this.items.push({ k, svg }); return this; };
  Iso.prototype.draw = function () {
    this.items.sort((a, b) => a.k - b.k);
    this.svg.insertAdjacentHTML('beforeend', this.items.map(i => i.svg).join(''));
    this.items = [];
  };
  window.Iso = Iso;
  window.ISO_COL = { INK, GREEN, DEEP, MINT, PALE, WHITE };
})();
