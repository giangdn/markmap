import { Hook as ut, getId as ft, debounce as xt, addClass as yt, walkTree as X, noop as _ } from "markmap-common";
import { loadCSS as me, loadJS as ue } from "markmap-common";
import { scaleOrdinal as Q, schemeCategory10 as kt, zoomTransform as C, select as vt, zoom as bt, max as Z, min as q, zoomIdentity as Et, minIndex as zt } from "d3";
const U = typeof navigator < "u" && navigator.userAgent.includes("Macintosh"), Ct = Q(kt), tt = (e = 1, t = 3, i = 2) => (n) => e + t / i ** n.state.depth, et = {
  autoFit: !1,
  duration: 500,
  embedGlobalCSS: !0,
  fitRatio: 0.95,
  maxInitialScale: 2,
  scrollForPan: U,
  initialExpandLevel: -1,
  zoom: !0,
  pan: !0,
  toggleRecursively: !1,
  color: (e) => {
    var t;
    return Ct(`${((t = e.state) == null ? void 0 : t.path) || ""}`);
  },
  lineWidth: tt(),
  maxWidth: 0,
  nodeMinHeight: 16,
  paddingX: 8,
  spacingHorizontal: 80,
  spacingVertical: 5
};
function le(e) {
  const t = {}, i = { ...e }, { color: n, colorFreezeLevel: s, lineWidth: a } = i;
  if ((n == null ? void 0 : n.length) === 1) {
    const c = n[0];
    t.color = () => c;
  } else if (n != null && n.length) {
    const c = Q(n);
    t.color = (l) => c(`${l.state.path}`);
  }
  if (s) {
    const c = t.color || et.color;
    t.color = (l) => (l = {
      ...l,
      state: {
        ...l.state,
        path: l.state.path.split(".").slice(0, s).join(".")
      }
    }, c(l));
  }
  if (a) {
    const c = Array.isArray(a) ? a : [a, 0, 1];
    t.lineWidth = tt(
      ...c
    );
  }
  return [
    "duration",
    "fitRatio",
    "initialExpandLevel",
    "maxInitialScale",
    "maxWidth",
    "nodeMinHeight",
    "paddingX",
    "spacingHorizontal",
    "spacingVertical"
  ].forEach((c) => {
    const l = i[c];
    typeof l == "number" && (t[c] = l);
  }), ["zoom", "pan"].forEach((c) => {
    const l = i[c];
    l != null && (t[c] = !!l);
  }), t;
}
function St(e) {
  let t = 0;
  for (let i = 0; i < e.length; i++)
    t = (t << 5) - t + e.charCodeAt(i) | 0;
  return (t >>> 0).toString(36);
}
function v(e) {
  if (typeof e == "string") {
    const i = e;
    e = (n) => n.matches(i);
  }
  const t = e;
  return function() {
    let n = Array.from(this.childNodes);
    return t && (n = n.filter((s) => t(s))), n;
  };
}
function wt(e) {
  var t = 0, i = e.children, n = i && i.length;
  if (!n) t = 1;
  else for (; --n >= 0; ) t += i[n].value;
  e.value = t;
}
function Rt() {
  return this.eachAfter(wt);
}
function Xt(e) {
  var t = this, i, n = [t], s, a, h;
  do
    for (i = n.reverse(), n = []; t = i.pop(); )
      if (e(t), s = t.children, s) for (a = 0, h = s.length; a < h; ++a)
        n.push(s[a]);
  while (n.length);
  return this;
}
function _t(e) {
  for (var t = this, i = [t], n, s; t = i.pop(); )
    if (e(t), n = t.children, n) for (s = n.length - 1; s >= 0; --s)
      i.push(n[s]);
  return this;
}
function $t(e) {
  for (var t = this, i = [t], n = [], s, a, h; t = i.pop(); )
    if (n.push(t), s = t.children, s) for (a = 0, h = s.length; a < h; ++a)
      i.push(s[a]);
  for (; t = n.pop(); )
    e(t);
  return this;
}
function Ot(e) {
  return this.eachAfter(function(t) {
    for (var i = +e(t.data) || 0, n = t.children, s = n && n.length; --s >= 0; ) i += n[s].value;
    t.value = i;
  });
}
function Mt(e) {
  return this.eachBefore(function(t) {
    t.children && t.children.sort(e);
  });
}
function At(e) {
  for (var t = this, i = Tt(t, e), n = [t]; t !== i; )
    t = t.parent, n.push(t);
  for (var s = n.length; e !== i; )
    n.splice(s, 0, e), e = e.parent;
  return n;
}
function Tt(e, t) {
  if (e === t) return e;
  var i = e.ancestors(), n = t.ancestors(), s = null;
  for (e = i.pop(), t = n.pop(); e === t; )
    s = e, e = i.pop(), t = n.pop();
  return s;
}
function Ht() {
  for (var e = this, t = [e]; e = e.parent; )
    t.push(e);
  return t;
}
function jt() {
  var e = [];
  return this.each(function(t) {
    e.push(t);
  }), e;
}
function Ft() {
  var e = [];
  return this.eachBefore(function(t) {
    t.children || e.push(t);
  }), e;
}
function Nt() {
  var e = this, t = [];
  return e.each(function(i) {
    i !== e && t.push({ source: i.parent, target: i });
  }), t;
}
function j(e, t) {
  var i = new $(e), n = +e.value && (i.value = e.value), s, a = [i], h, o, c, l;
  for (t == null && (t = Lt); s = a.pop(); )
    if (n && (s.value = +s.data.value), (o = t(s.data)) && (l = o.length))
      for (s.children = new Array(l), c = l - 1; c >= 0; --c)
        a.push(h = s.children[c] = new $(o[c])), h.parent = s, h.depth = s.depth + 1;
  return i.eachBefore(Wt);
}
function Bt() {
  return j(this).eachBefore(Dt);
}
function Lt(e) {
  return e.children;
}
function Dt(e) {
  e.data = e.data.data;
}
function Wt(e) {
  var t = 0;
  do
    e.height = t;
  while ((e = e.parent) && e.height < ++t);
}
function $(e) {
  this.data = e, this.depth = this.height = 0, this.parent = null;
}
$.prototype = j.prototype = {
  constructor: $,
  count: Rt,
  each: Xt,
  eachAfter: $t,
  eachBefore: _t,
  sum: Ot,
  sort: Mt,
  path: At,
  ancestors: Ht,
  descendants: jt,
  leaves: Ft,
  links: Nt,
  copy: Bt
};
const Pt = "2.1.2", It = {
  version: Pt
}, { version: Kt } = It, Gt = Object.freeze({
  children: (e) => e.children,
  nodeSize: (e) => e.data.size,
  spacing: 0
});
function nt(e) {
  const t = Object.assign({}, Gt, e);
  function i(o) {
    const c = t[o];
    return typeof c == "function" ? c : () => c;
  }
  function n(o) {
    const c = h(a(), o, (l) => l.children);
    return c.update(), c.data;
  }
  function s() {
    const o = i("nodeSize"), c = i("spacing");
    return class rt extends j.prototype.constructor {
      constructor(d) {
        super(d);
      }
      copy() {
        const d = h(this.constructor, this, (p) => p.children);
        return d.each((p) => p.data = p.data.data), d;
      }
      get size() {
        return o(this);
      }
      spacing(d) {
        return c(this, d);
      }
      get nodes() {
        return this.descendants();
      }
      get xSize() {
        return this.size[0];
      }
      get ySize() {
        return this.size[1];
      }
      get top() {
        return this.y;
      }
      get bottom() {
        return this.y + this.ySize;
      }
      get left() {
        return this.x - this.xSize / 2;
      }
      get right() {
        return this.x + this.xSize / 2;
      }
      get root() {
        const d = this.ancestors();
        return d[d.length - 1];
      }
      get numChildren() {
        return this.hasChildren ? this.children.length : 0;
      }
      get hasChildren() {
        return !this.noChildren;
      }
      get noChildren() {
        return this.children === null;
      }
      get firstChild() {
        return this.hasChildren ? this.children[0] : null;
      }
      get lastChild() {
        return this.hasChildren ? this.children[this.numChildren - 1] : null;
      }
      get extents() {
        return (this.children || []).reduce(
          (d, p) => rt.maxExtents(d, p.extents),
          this.nodeExtents
        );
      }
      get nodeExtents() {
        return {
          top: this.top,
          bottom: this.bottom,
          left: this.left,
          right: this.right
        };
      }
      static maxExtents(d, p) {
        return {
          top: Math.min(d.top, p.top),
          bottom: Math.max(d.bottom, p.bottom),
          left: Math.min(d.left, p.left),
          right: Math.max(d.right, p.right)
        };
      }
    };
  }
  function a() {
    const o = s(), c = i("nodeSize"), l = i("spacing");
    return class extends o {
      constructor(d) {
        super(d), Object.assign(this, {
          x: 0,
          y: 0,
          relX: 0,
          prelim: 0,
          shift: 0,
          change: 0,
          lExt: this,
          lExtRelX: 0,
          lThr: null,
          rExt: this,
          rExtRelX: 0,
          rThr: null
        });
      }
      get size() {
        return c(this.data);
      }
      spacing(d) {
        return l(this.data, d.data);
      }
      get x() {
        return this.data.x;
      }
      set x(d) {
        this.data.x = d;
      }
      get y() {
        return this.data.y;
      }
      set y(d) {
        this.data.y = d;
      }
      update() {
        return it(this), st(this), this;
      }
    };
  }
  function h(o, c, l) {
    const d = (p, m) => {
      const u = new o(p);
      Object.assign(u, {
        parent: m,
        depth: m === null ? 0 : m.depth + 1,
        height: 0,
        length: 1
      });
      const x = l(p) || [];
      return u.children = x.length === 0 ? null : x.map((y) => d(y, u)), u.children && Object.assign(u, u.children.reduce(
        (y, b) => ({
          height: Math.max(y.height, b.height + 1),
          length: y.length + b.length
        }),
        u
      )), u;
    };
    return d(c, null);
  }
  return Object.assign(n, {
    nodeSize(o) {
      return arguments.length ? (t.nodeSize = o, n) : t.nodeSize;
    },
    spacing(o) {
      return arguments.length ? (t.spacing = o, n) : t.spacing;
    },
    children(o) {
      return arguments.length ? (t.children = o, n) : t.children;
    },
    hierarchy(o, c) {
      const l = typeof c > "u" ? t.children : c;
      return h(s(), o, l);
    },
    dump(o) {
      const c = i("nodeSize"), l = (d) => (p) => {
        const m = d + "  ", u = d + "    ", { x, y } = p, b = c(p), k = p.children || [], z = k.length === 0 ? " " : `,${m}children: [${u}${k.map(l(u)).join(u)}${m}],${d}`;
        return `{ size: [${b.join(", ")}],${m}x: ${x}, y: ${y}${z}},`;
      };
      return l(`
`)(o);
    }
  }), n;
}
nt.version = Kt;
const it = (e, t = 0) => (e.y = t, (e.children || []).reduce((i, n) => {
  const [s, a] = i;
  it(n, e.y + e.ySize);
  const h = (s === 0 ? n.lExt : n.rExt).bottom;
  s !== 0 && Yt(e, s, a);
  const o = re(h, s, a);
  return [s + 1, o];
}, [0, null]), Vt(e), ee(e), e), st = (e, t, i) => {
  typeof t > "u" && (t = -e.relX - e.prelim, i = 0);
  const n = t + e.relX;
  return e.relX = n + e.prelim - i, e.prelim = 0, e.x = i + e.relX, (e.children || []).forEach((s) => st(s, n, e.x)), e;
}, Vt = (e) => {
  (e.children || []).reduce((t, i) => {
    const [n, s] = t, a = n + i.shift, h = s + a + i.change;
    return i.relX += h, [a, h];
  }, [0, 0]);
}, Yt = (e, t, i) => {
  const n = e.children[t - 1], s = e.children[t];
  let a = n, h = n.relX, o = s, c = s.relX, l = !0;
  for (; a && o; ) {
    a.bottom > i.lowY && (i = i.next);
    const d = h + a.prelim - (c + o.prelim) + a.xSize / 2 + o.xSize / 2 + a.spacing(o);
    (d > 0 || d < 0 && l) && (c += d, Zt(s, d), qt(e, t, i.index, d)), l = !1;
    const p = a.bottom, m = o.bottom;
    p <= m && (a = Qt(a), a && (h += a.relX)), p >= m && (o = Jt(o), o && (c += o.relX));
  }
  !a && o ? Ut(e, t, o, c) : a && !o && te(e, t, a, h);
}, Zt = (e, t) => {
  e.relX += t, e.lExtRelX += t, e.rExtRelX += t;
}, qt = (e, t, i, n) => {
  const s = e.children[t], a = t - i;
  if (a > 1) {
    const h = n / a;
    e.children[i + 1].shift += h, s.shift -= h, s.change -= n - h;
  }
}, Jt = (e) => e.hasChildren ? e.firstChild : e.lThr, Qt = (e) => e.hasChildren ? e.lastChild : e.rThr, Ut = (e, t, i, n) => {
  const s = e.firstChild, a = s.lExt, h = e.children[t];
  a.lThr = i;
  const o = n - i.relX - s.lExtRelX;
  a.relX += o, a.prelim -= o, s.lExt = h.lExt, s.lExtRelX = h.lExtRelX;
}, te = (e, t, i, n) => {
  const s = e.children[t], a = s.rExt, h = e.children[t - 1];
  a.rThr = i;
  const o = n - i.relX - s.rExtRelX;
  a.relX += o, a.prelim -= o, s.rExt = h.rExt, s.rExtRelX = h.rExtRelX;
}, ee = (e) => {
  if (e.hasChildren) {
    const t = e.firstChild, i = e.lastChild, n = (t.prelim + t.relX - t.xSize / 2 + i.relX + i.prelim + i.xSize / 2) / 2;
    Object.assign(e, {
      prelim: n,
      lExt: t.lExt,
      lExtRelX: t.lExtRelX,
      rExt: i.rExt,
      rExtRelX: i.rExtRelX
    });
  }
}, re = (e, t, i) => {
  for (; i !== null && e >= i.lowY; )
    i = i.next;
  return {
    lowY: e,
    index: t,
    next: i
  };
}, ot = ".markmap{--markmap-max-width: 9999px;--markmap-a-color: #0097e6;--markmap-a-hover-color: #00a8ff;--markmap-code-bg: #f0f0f0;--markmap-code-color: #555;--markmap-highlight-bg: #ffeaa7;--markmap-table-border: 1px solid currentColor;--markmap-font: 300 16px/20px sans-serif;--markmap-circle-open-bg: #fff;--markmap-text-color: #333;--markmap-highlight-node-bg: #ff02;font:var(--markmap-font);color:var(--markmap-text-color)}.markmap-link{fill:none}.markmap-node>circle{cursor:pointer}.markmap-foreign{display:inline-block}.markmap-foreign p{margin:0}.markmap-foreign a{color:var(--markmap-a-color)}.markmap-foreign a:hover{color:var(--markmap-a-hover-color)}.markmap-foreign code{padding:.25em;font-size:calc(1em - 2px);color:var(--markmap-code-color);background-color:var(--markmap-code-bg);border-radius:2px}.markmap-foreign pre{margin:0}.markmap-foreign pre>code{display:block}.markmap-foreign del{text-decoration:line-through}.markmap-foreign em{font-style:italic}.markmap-foreign strong{font-weight:700}.markmap-foreign mark{background:var(--markmap-highlight-bg)}.markmap-foreign table,.markmap-foreign th,.markmap-foreign td{border-collapse:collapse;border:var(--markmap-table-border)}.markmap-foreign img{display:inline-block}.markmap-foreign svg{fill:currentColor}.markmap-foreign>div{width:var(--markmap-max-width);text-align:left}.markmap-foreign>div>div{display:inline-block}.markmap-highlight rect{fill:var(--markmap-highlight-node-bg)}.markmap-dark .markmap{--markmap-code-bg: #1a1b26;--markmap-code-color: #ddd;--markmap-circle-open-bg: #444;--markmap-text-color: #eee}", de = ot, T = "g.markmap-node", ne = "path.markmap-link", ie = "g.markmap-highlight";
function J(e, t) {
  const i = zt(e, t);
  return e[i];
}
function H(e) {
  e.stopPropagation();
}
const se = new ut();
class at {
  constructor(t, i) {
    this.options = { ...et }, this._disposeList = [], this.handleZoom = (n) => {
      const { transform: s } = n;
      this.g.attr("transform", s);
    }, this.handlePan = (n) => {
      n.preventDefault();
      const s = C(this.svg.node()), a = s.translate(
        -n.deltaX / s.k,
        -n.deltaY / s.k
      );
      this.svg.call(this.zoom.transform, a);
    }, this.handleClick = (n, s) => {
      let a = this.options.toggleRecursively;
      (U ? n.metaKey : n.ctrlKey) && (a = !a), this.toggleNode(s, a);
    }, this.ensureView = this.ensureVisible, this.svg = t.datum ? t : vt(t), this.styleNode = this.svg.append("style"), this.zoom = bt().filter((n) => this.options.scrollForPan && n.type === "wheel" ? n.ctrlKey && !n.button : (!n.ctrlKey || n.type === "wheel") && !n.button).on("zoom", this.handleZoom), this.setOptions(i), this.state = {
      id: this.options.id || this.svg.attr("id") || ft(),
      rect: { x1: 0, y1: 0, x2: 0, y2: 0 }
    }, this.g = this.svg.append("g"), this.g.append("g").attr("class", "markmap-highlight"), this._observer = new ResizeObserver(
      xt(() => {
        this.renderData();
      }, 100)
    ), this._disposeList.push(
      se.tap(() => {
        this.setData();
      }),
      () => this._observer.disconnect()
    );
  }
  getStyleContent() {
    const { style: t } = this.options, { id: i } = this.state, n = typeof t == "function" ? t(i) : "";
    return [this.options.embedGlobalCSS && ot, n].filter(Boolean).join(`
`);
  }
  updateStyle() {
    this.svg.attr(
      "class",
      yt(this.svg.attr("class"), "markmap", this.state.id)
    );
    const t = this.getStyleContent();
    this.styleNode.text(t);
  }
  async toggleNode(t, i = !1) {
    var s, a;
    const n = (s = t.payload) != null && s.fold ? 0 : 1;
    i ? X(t, (h, o) => {
      h.payload = {
        ...h.payload,
        fold: n
      }, o();
    }) : t.payload = {
      ...t.payload,
      fold: (a = t.payload) != null && a.fold ? 0 : 1
    }, await this.renderData(t);
  }
  _initializeData(t) {
    let i = 0;
    const { color: n, initialExpandLevel: s } = this.options;
    let a = 0, h = 0;
    return X(t, (o, c, l) => {
      var p, m, u, x;
      h += 1, o.children = (p = o.children) == null ? void 0 : p.map((y) => ({ ...y })), i += 1, o.state = {
        ...o.state,
        depth: h,
        id: i,
        rect: {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        },
        size: [0, 0]
      }, o.state.key = [(m = l == null ? void 0 : l.state) == null ? void 0 : m.id, o.state.id].filter(Boolean).join(".") + St(o.content), o.state.path = [(u = l == null ? void 0 : l.state) == null ? void 0 : u.path, o.state.id].filter(Boolean).join("."), n(o);
      const d = ((x = o.payload) == null ? void 0 : x.fold) === 2;
      d ? a += 1 : (a || s >= 0 && o.state.depth >= s) && (o.payload = { ...o.payload, fold: 1 }), c(), d && (a -= 1), h -= 1;
    }), t;
  }
  _relayout() {
    if (!this.state.data) return;
    this.g.selectAll(v(T)).selectAll(
      v("foreignObject")
    ).each(function(c) {
      var p;
      const l = (p = this.firstChild) == null ? void 0 : p.firstChild, d = [l.scrollWidth, l.scrollHeight];
      c.state.size = d;
    });
    const { lineWidth: t, paddingX: i, spacingHorizontal: n, spacingVertical: s } = this.options, a = nt({}).children((c) => {
      var l;
      if (!((l = c.payload) != null && l.fold)) return c.children;
    }).nodeSize((c) => {
      const [l, d] = c.data.state.size;
      return [d, l + (l ? i * 2 : 0) + n];
    }).spacing((c, l) => (c.parent === l.parent ? s : s * 2) + t(c.data)), h = a.hierarchy(this.state.data);
    a(h);
    const o = h.descendants();
    o.forEach((c) => {
      const l = c.data;
      l.state.rect = {
        x: c.y,
        y: c.x - c.xSize / 2,
        width: c.ySize - n,
        height: c.xSize
      };
    }), this.state.rect = {
      x1: q(o, (c) => c.data.state.rect.x) || 0,
      y1: q(o, (c) => c.data.state.rect.y) || 0,
      x2: Z(
        o,
        (c) => c.data.state.rect.x + c.data.state.rect.width
      ) || 0,
      y2: Z(
        o,
        (c) => c.data.state.rect.y + c.data.state.rect.height
      ) || 0
    };
  }
  setOptions(t) {
    this.options = {
      ...this.options,
      ...t
    }, this.options.zoom ? this.svg.call(this.zoom) : this.svg.on(".zoom", null), this.options.pan ? this.svg.on("wheel", this.handlePan) : this.svg.on("wheel", null);
  }
  async setData(t, i) {
    i && this.setOptions(i), t && (this.state.data = this._initializeData(t)), this.state.data && (this.updateStyle(), await this.renderData());
  }
  async setHighlight(t) {
    this.state.highlight = t || void 0, await this.renderData();
  }
  _getHighlightRect(t) {
    const i = this.svg.node(), s = 4 / C(i).k, a = {
      ...t.state.rect
    };
    return a.x -= s, a.y -= s, a.width += 2 * s, a.height += 2 * s, a;
  }
  async renderData(t) {
    const { paddingX: i, autoFit: n, color: s, maxWidth: a, lineWidth: h } = this.options, o = this.state.data;
    if (!o) return;
    const c = {}, l = {}, d = [];
    X(o, (r, g, f) => {
      var E;
      (E = r.payload) != null && E.fold || g(), c[r.state.id] = r, f && (l[r.state.id] = f.state.id), d.push(r);
    });
    const p = (r) => {
      const [g, f] = r.source, [E, R] = r.target, V = 0.8, Y = E - g, pt = g + Y * V, mt = E - Y * V;
      return `M${g},${f} C${pt},${f} ${mt},${R} ${E},${R}`;
    }, m = {}, u = {}, x = (r) => {
      !r || m[r.state.id] || X(r, (g, f) => {
        m[g.state.id] = r.state.id, f();
      });
    }, y = (r) => u[m[r.state.id]] || o.state.rect, b = (r) => (c[m[r.state.id]] || o).state.rect;
    u[o.state.id] = o.state.rect, t && x(t);
    let { highlight: k } = this.state;
    k && !c[k.state.id] && (k = void 0);
    let z = this.g.selectAll(v(ie)).selectAll(v("rect")).data(k ? [this._getHighlightRect(k)] : []).join("rect").attr("x", (r) => r.x).attr("y", (r) => r.y).attr("width", (r) => r.width).attr("height", (r) => r.height);
    const O = this.g.selectAll(v(T)).each((r) => {
      u[r.state.id] = r.state.rect;
    }).data(d, (r) => r.state.key), F = O.enter().append("g").attr("data-depth", (r) => r.state.depth).attr("data-path", (r) => r.state.path).each((r) => {
      x(c[l[r.state.id]]);
    }), S = O.exit().each((r) => {
      x(c[l[r.state.id]]);
    }), w = O.merge(F).attr(
      "class",
      (r) => {
        var g;
        return ["markmap-node", ((g = r.payload) == null ? void 0 : g.fold) && "markmap-fold"].filter(Boolean).join(" ");
      }
    ), N = w.selectAll(v("line")).data(
      (r) => [r],
      (r) => r.state.key
    ), B = N.enter().append("line").attr("stroke", (r) => s(r)).attr("stroke-width", 0), L = N.merge(B), D = this._observer, W = w.selectAll(v("foreignObject")).data(
      (r) => [r],
      (r) => r.state.key
    ), M = W.enter().append("foreignObject").attr("class", "markmap-foreign").attr("x", i).attr("y", 0).style("opacity", 0).on("mousedown", H).on("dblclick", H);
    M.append("xhtml:div").attr("style", (r) => "--node-color:" + s(r)).append("xhtml:div").html((r) => r.content).attr("xmlns", "http://www.w3.org/1999/xhtml"), M.each(function() {
      var g;
      const r = (g = this.firstChild) == null ? void 0 : g.firstChild;
      D.observe(r);
    });
    const P = S.selectAll(
      v("foreignObject")
    );
    P.each(function() {
      var g;
      const r = (g = this.firstChild) == null ? void 0 : g.firstChild;
      D.unobserve(r);
    });
    const I = M.merge(W), K = w.selectAll(v("circle")).data(
      (r) => {
        var g;
        return (g = r.children) != null && g.length ? [r] : [];
      },
      (r) => r.state.key
    ), G = K.enter().append("circle").attr("stroke-width", 0).attr("r", 0).on("click", (r, g) => this.handleClick(r, g)).on("mousedown", H).merge(K).attr("stroke", (r) => s(r)).attr(
      "fill",
      (r) => {
        var g;
        return (g = r.payload) != null && g.fold && r.children ? s(r) : "var(--markmap-circle-open-bg)";
      }
    ), ct = d.flatMap(
      (r) => {
        var g;
        return (g = r.payload) != null && g.fold ? [] : r.children.map((f) => ({ source: r, target: f }));
      }
    ), A = this.g.selectAll(v(ne)).data(ct, (r) => r.target.state.key), ht = A.exit(), lt = A.enter().insert("path", "g").attr("class", "markmap-link").attr("data-depth", (r) => r.target.state.depth).attr("data-path", (r) => r.target.state.path).attr("d", (r) => {
      const g = y(r.target), f = [
        g.x + g.width,
        g.y + g.height
      ];
      return p({ source: f, target: f });
    }).attr("stroke-width", 0).merge(A);
    this.svg.style(
      "--markmap-max-width",
      a ? `${a}px` : null
    ), await new Promise(requestAnimationFrame), this._relayout(), z = z.data(k ? [this._getHighlightRect(k)] : []).join("rect"), this.transition(z).attr("x", (r) => r.x).attr("y", (r) => r.y).attr("width", (r) => r.width).attr("height", (r) => r.height), F.attr("transform", (r) => {
      const g = y(r);
      return `translate(${g.x + g.width - r.state.rect.width},${g.y + g.height - r.state.rect.height})`;
    }), this.transition(S).attr("transform", (r) => {
      const g = b(r), f = g.x + g.width - r.state.rect.width, E = g.y + g.height - r.state.rect.height;
      return `translate(${f},${E})`;
    }).remove(), this.transition(w).attr(
      "transform",
      (r) => `translate(${r.state.rect.x},${r.state.rect.y})`
    );
    const dt = S.selectAll(
      v("line")
    );
    this.transition(dt).attr("x1", (r) => r.state.rect.width).attr("stroke-width", 0), B.attr("x1", (r) => r.state.rect.width).attr("x2", (r) => r.state.rect.width), L.attr("y1", (r) => r.state.rect.height + h(r) / 2).attr("y2", (r) => r.state.rect.height + h(r) / 2), this.transition(L).attr("x1", -1).attr("x2", (r) => r.state.rect.width + 2).attr("stroke", (r) => s(r)).attr("stroke-width", h);
    const gt = S.selectAll(
      v("circle")
    );
    this.transition(gt).attr("r", 0).attr("stroke-width", 0), G.attr("cx", (r) => r.state.rect.width).attr("cy", (r) => r.state.rect.height + h(r) / 2), this.transition(G).attr("r", 5).attr("stroke-width", "1"), this.transition(P).style("opacity", 0), I.attr("width", (r) => Math.max(0, r.state.rect.width - i * 2)).attr("height", (r) => r.state.rect.height), this.transition(I).style("opacity", 1), this.transition(ht).attr("d", (r) => {
      const g = b(r.target), f = [
        g.x + g.width,
        g.y + g.height + h(r.target) / 2
      ];
      return p({ source: f, target: f });
    }).attr("stroke-width", 0).remove(), this.transition(lt).attr("stroke", (r) => s(r.target)).attr("stroke-width", (r) => h(r.target)).attr("d", (r) => {
      const g = r.source, f = r.target, E = [
        g.state.rect.x + g.state.rect.width,
        g.state.rect.y + g.state.rect.height + h(g) / 2
      ], R = [
        f.state.rect.x,
        f.state.rect.y + f.state.rect.height + h(f) / 2
      ];
      return p({ source: E, target: R });
    }), n && this.fit();
  }
  transition(t) {
    const { duration: i } = this.options;
    return t.transition().duration(i);
  }
  /**
   * Fit the content to the viewport.
   */
  async fit(t = this.options.maxInitialScale) {
    const i = this.svg.node(), { width: n, height: s } = i.getBoundingClientRect(), { fitRatio: a } = this.options, { x1: h, y1: o, x2: c, y2: l } = this.state.rect, d = c - h, p = l - o, m = Math.min(
      n / d * a,
      s / p * a,
      t
    ), u = Et.translate(
      (n - d * m) / 2 - h * m,
      (s - p * m) / 2 - o * m
    ).scale(m);
    return this.transition(this.svg).call(this.zoom.transform, u).end().catch(_);
  }
  findElement(t) {
    let i;
    return this.g.selectAll(v(T)).each(function(s) {
      s === t && (i = {
        data: s,
        g: this
      });
    }), i;
  }
  /**
   * Pan the content to make the provided node visible in the viewport.
   */
  async ensureVisible(t, i) {
    var b;
    const n = (b = this.findElement(t)) == null ? void 0 : b.data;
    if (!n) return;
    const s = this.svg.node(), a = s.getBoundingClientRect(), h = C(s), [o, c] = [
      n.state.rect.x,
      n.state.rect.x + n.state.rect.width + 2
    ].map((k) => k * h.k + h.x), [l, d] = [
      n.state.rect.y,
      n.state.rect.y + n.state.rect.height
    ].map((k) => k * h.k + h.y), p = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      ...i
    }, m = [p.left - o, a.width - p.right - c], u = [p.top - l, a.height - p.bottom - d], x = m[0] * m[1] > 0 ? J(m, Math.abs) / h.k : 0, y = u[0] * u[1] > 0 ? J(u, Math.abs) / h.k : 0;
    if (x || y) {
      const k = h.translate(x, y);
      return this.transition(this.svg).call(this.zoom.transform, k).end().catch(_);
    }
  }
  async centerNode(t, i) {
    var x;
    const n = (x = this.findElement(t)) == null ? void 0 : x.data;
    if (!n) return;
    const s = this.svg.node(), a = s.getBoundingClientRect(), h = C(s), o = (n.state.rect.x + n.state.rect.width / 2) * h.k + h.x, c = (n.state.rect.y + n.state.rect.height / 2) * h.k + h.y, l = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      ...i
    }, d = (l.left + a.width - l.right) / 2, p = (l.top + a.height - l.bottom) / 2, m = (d - o) / h.k, u = (p - c) / h.k;
    if (m || u) {
      const y = h.translate(m, u);
      return this.transition(this.svg).call(this.zoom.transform, y).end().catch(_);
    }
  }
  /**
   * Scale content with it pinned at the center of the viewport.
   */
  async rescale(t) {
    const i = this.svg.node(), { width: n, height: s } = i.getBoundingClientRect(), a = n / 2, h = s / 2, o = C(i), c = o.translate(
      (a - o.x) * (1 - t) / o.k,
      (h - o.y) * (1 - t) / o.k
    ).scale(t);
    return this.transition(this.svg).call(this.zoom.transform, c).end().catch(_);
  }
  destroy() {
    this.svg.on(".zoom", null), this.svg.html(null), this._disposeList.forEach((t) => {
      t();
    });
  }
  static create(t, i, n = null) {
    const s = new at(t, i);
    return n && s.setData(n).then(() => {
      s.fit();
    }), s;
  }
}
export {
  at as Markmap,
  v as childSelector,
  Ct as defaultColorFn,
  et as defaultOptions,
  le as deriveOptions,
  de as globalCSS,
  U as isMacintosh,
  tt as lineWidthFactory,
  me as loadCSS,
  ue as loadJS,
  se as refreshHook,
  St as simpleHash
};
