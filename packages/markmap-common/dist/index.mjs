const T = "npm2url/dist/index.cjs", k = {
  jsdelivr: (t) => `https://cdn.jsdelivr.net/npm/${t}`,
  unpkg: (t) => `https://unpkg.com/${t}`
};
async function A(t, e) {
  const n = await fetch(t, {
    signal: e
  });
  if (!n.ok)
    throw n;
  await n.text();
}
class C {
  constructor() {
    this.providers = { ...k }, this.provider = "jsdelivr";
  }
  /**
   * Get the fastest provider name.
   * If none of the providers returns a valid response within `timeout`, an error will be thrown.
   */
  async getFastestProvider(e = 5e3, n = T) {
    const r = new AbortController();
    let s = 0;
    try {
      return await new Promise((o, i) => {
        Promise.all(
          Object.entries(this.providers).map(async ([c, j]) => {
            try {
              await A(j(n), r.signal), o(c);
            } catch {
            }
          })
        ).then(() => i(new Error("All providers failed"))), s = setTimeout(i, e, new Error("Timed out"));
      });
    } finally {
      r.abort(), clearTimeout(s);
    }
  }
  /**
   * Set the current provider to the fastest provider found by `getFastestProvider`.
   */
  async findFastestProvider(e, n) {
    return this.provider = await this.getFastestProvider(e, n), this.provider;
  }
  setProvider(e, n) {
    n ? this.providers[e] = n : delete this.providers[e];
  }
  getFullUrl(e, n = this.provider) {
    if (e.includes("://"))
      return e;
    const r = this.providers[n];
    if (!r)
      throw new Error(`Provider ${n} not found`);
    return r(e);
  }
}
const W = new C();
class X {
  constructor() {
    this.listeners = [];
  }
  tap(e) {
    return this.listeners.push(e), () => this.revoke(e);
  }
  revoke(e) {
    const n = this.listeners.indexOf(e);
    n >= 0 && this.listeners.splice(n, 1);
  }
  revokeAll() {
    this.listeners.splice(0);
  }
  call(...e) {
    for (const n of this.listeners)
      n(...e);
  }
}
const $ = {
  "&": "&amp;",
  "<": "&lt;",
  '"': "&quot;"
};
function p(t) {
  return t.replace(/[&<"]/g, (e) => $[e]);
}
function x(t) {
  return t.replace(/<(\/script>)/g, "\\x3c$2");
}
function h(t, e) {
  const n = e ? Object.entries(e).map(([r, s]) => {
    if (!(s == null || s === !1))
      return r = ` ${p(r)}`, s === !0 ? r : `${r}="${p(s)}"`;
  }).filter(Boolean).join("") : "";
  return `<${t}${n}>`;
}
function E(t) {
  return `</${t}>`;
}
function l(t, e, n) {
  return e == null ? h(t, n) : h(t, n) + (e || "") + E(t);
}
function N(t, e) {
  const n = e.map((r) => typeof r == "function" ? r.toString() : JSON.stringify(r ?? null)).join(",");
  return `(${t.toString()})(${n})`;
}
function Q(t, e) {
  return t.map((n) => {
    if (n.type === "script") {
      const { textContent: r, ...s } = n.data;
      return l(
        "script",
        r || "",
        s
      );
    }
    if (n.type === "iife") {
      const { fn: r, getParams: s } = n.data;
      return l(
        "script",
        x(N(r, (s == null ? void 0 : s(e)) || []))
      );
    }
    return "";
  });
}
function Z(t) {
  return t.map((e) => e.type === "stylesheet" ? l("link", null, {
    rel: "stylesheet",
    ...e.data
  }) : l("style", e.data));
}
const I = Math.random().toString(36).slice(2, 8);
let y = 0;
function tt() {
  return y += 1, `mm-${I}-${y}`;
}
function et() {
}
function nt(t, e) {
  const n = (r, s) => e(
    r,
    () => {
      var o;
      return (o = r.children) == null ? void 0 : o.map((i) => n(i, r));
    },
    s
  );
  return n(t);
}
function rt(t, ...e) {
  const n = (t || "").split(" ").filter(Boolean);
  return e.forEach((r) => {
    r && n.indexOf(r) < 0 && n.push(r);
  }), n.join(" ");
}
function st(t, e) {
  return (...n) => e(t, ...n);
}
function g() {
  const t = {};
  return t.promise = new Promise((e, n) => {
    t.resolve = e, t.reject = n;
  }), t;
}
function O(t) {
  const e = {};
  return function(...r) {
    const s = `${r[0]}`;
    let o = e[s];
    return o || (o = {
      value: t(...r)
    }, e[s] = o), o.value;
  };
}
function ot(t, e) {
  const n = {
    timer: 0
  };
  function r() {
    n.timer && (window.clearTimeout(n.timer), n.timer = 0);
  }
  function s() {
    r(), n.args && (n.result = t(...n.args));
  }
  return function(...i) {
    return r(), n.args = i, n.timer = window.setTimeout(s, e), n.result;
  };
}
/*! @gera2ld/jsx-dom v2.2.2 | ISC License */
const v = 1, b = 2, P = "http://www.w3.org/2000/svg", a = "http://www.w3.org/1999/xlink", F = {
  show: a,
  actuate: a,
  href: a
}, L = (t) => typeof t == "string" || typeof t == "number", M = (t) => (t == null ? void 0 : t.vtype) === v, _ = (t) => (t == null ? void 0 : t.vtype) === b;
function V(t, e, ...n) {
  return e = Object.assign({}, e, {
    children: n.length === 1 ? n[0] : n
  }), B(t, e);
}
function B(t, e) {
  let n;
  if (typeof t == "string") n = v;
  else if (typeof t == "function") n = b;
  else throw new Error("Invalid VNode type");
  return {
    vtype: n,
    type: t,
    props: e
  };
}
function H(t) {
  return t.children;
}
const J = {
  isSvg: !1
};
function w(t, e) {
  Array.isArray(e) || (e = [e]), e = e.filter(Boolean), e.length && t.append(...e);
}
function D(t, e, n) {
  for (const r in e)
    if (!(r === "key" || r === "children" || r === "ref"))
      if (r === "dangerouslySetInnerHTML")
        t.innerHTML = e[r].__html;
      else if (r === "innerHTML" || r === "textContent" || r === "innerText" || r === "value" && ["textarea", "select"].includes(t.tagName)) {
        const s = e[r];
        s != null && (t[r] = s);
      } else r.startsWith("on") ? t[r.toLowerCase()] = e[r] : z(t, r, e[r], n.isSvg);
}
const U = {
  className: "class",
  labelFor: "for"
};
function z(t, e, n, r) {
  if (e = U[e] || e, n === !0)
    t.setAttribute(e, "");
  else if (n === !1)
    t.removeAttribute(e);
  else {
    const s = r ? F[e] : void 0;
    s !== void 0 ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
  }
}
function q(t) {
  return t.reduce((e, n) => e.concat(n), []);
}
function f(t, e) {
  return Array.isArray(t) ? q(t.map((n) => f(n, e))) : d(t, e);
}
function d(t, e = J) {
  if (t == null || typeof t == "boolean")
    return null;
  if (t instanceof Node)
    return t;
  if (_(t)) {
    const {
      type: n,
      props: r
    } = t;
    if (n === H) {
      const o = document.createDocumentFragment();
      if (r.children) {
        const i = f(r.children, e);
        w(o, i);
      }
      return o;
    }
    const s = n(r);
    return d(s, e);
  }
  if (L(t))
    return document.createTextNode(`${t}`);
  if (M(t)) {
    let n;
    const {
      type: r,
      props: s
    } = t;
    if (!e.isSvg && r === "svg" && (e = Object.assign({}, e, {
      isSvg: !0
    })), e.isSvg ? n = document.createElementNS(P, r) : n = document.createElement(r), D(n, s, e), s.children) {
      let i = e;
      e.isSvg && r === "foreignObject" && (i = Object.assign({}, i, {
        isSvg: !1
      }));
      const c = f(s.children, i);
      c != null && w(n, c);
    }
    const {
      ref: o
    } = s;
    return typeof o == "function" && o(n), n;
  }
  throw new Error("mount: Invalid Vnode!");
}
function R(t) {
  return d(t);
}
function u(...t) {
  return R(V(...t));
}
const Y = O((t) => {
  document.head.append(
    u("link", {
      rel: "preload",
      as: "script",
      href: t
    })
  );
}), S = {}, m = {};
async function G(t, e) {
  var r;
  const n = t.type === "script" && ((r = t.data) == null ? void 0 : r.src) || "";
  if (t.loaded || (t.loaded = S[n]), !t.loaded) {
    const s = g();
    if (t.loaded = s.promise, t.type === "script" && (document.head.append(
      u("script", {
        ...t.data,
        onLoad: () => s.resolve(),
        onError: s.reject
      })
    ), n ? S[n] = t.loaded : s.resolve()), t.type === "iife") {
      const { fn: o, getParams: i } = t.data;
      o(...(i == null ? void 0 : i(e)) || []), s.resolve();
    }
  }
  await t.loaded;
}
async function K(t) {
  const e = t.type === "stylesheet" && t.data.href || "";
  if (t.loaded || (t.loaded = m[e]), !t.loaded) {
    const n = g();
    t.loaded = n.promise, e && (m[e] = t.loaded), t.type === "style" ? (document.head.append(
      u("style", {
        textContent: t.data
      })
    ), n.resolve()) : e && (document.head.append(
      u("link", {
        rel: "stylesheet",
        ...t.data
      })
    ), fetch(e).then((r) => {
      if (r.ok) return r.text();
      throw r;
    }).then(() => n.resolve(), n.reject));
  }
  await t.loaded;
}
async function it(t, e) {
  t.forEach((n) => {
    var r;
    n.type === "script" && ((r = n.data) != null && r.src) && Y(n.data.src);
  }), e = {
    getMarkmap: () => window.markmap,
    ...e
  };
  for (const n of t)
    await G(n, e);
}
async function ct(t) {
  await Promise.all(t.map((e) => K(e)));
}
function lt(t) {
  return {
    type: "script",
    data: {
      src: t
    }
  };
}
function ut(t) {
  return {
    type: "stylesheet",
    data: {
      href: t
    }
  };
}
function at(t) {
  var e, n;
  return [
    ...((e = t.scripts) == null ? void 0 : e.map(
      (r) => r.type === "script" && r.data.src || ""
    )) || [],
    ...((n = t.styles) == null ? void 0 : n.map(
      (r) => r.type === "stylesheet" && r.data.href || ""
    )) || []
  ].filter(Boolean);
}
function ft(...t) {
  return {
    styles: t.flatMap((e) => (e == null ? void 0 : e.styles) || []),
    scripts: t.flatMap((e) => (e == null ? void 0 : e.scripts) || [])
  };
}
export {
  X as Hook,
  C as UrlBuilder,
  rt as addClass,
  ut as buildCSSItem,
  N as buildCode,
  lt as buildJSItem,
  ot as debounce,
  g as defer,
  p as escapeHtml,
  x as escapeScript,
  at as extractAssets,
  tt as getId,
  E as htmlClose,
  h as htmlOpen,
  ct as loadCSS,
  it as loadJS,
  O as memoize,
  ft as mergeAssets,
  et as noop,
  Z as persistCSS,
  Q as persistJS,
  W as urlBuilder,
  nt as walkTree,
  st as wrapFunction,
  l as wrapHtml
};
