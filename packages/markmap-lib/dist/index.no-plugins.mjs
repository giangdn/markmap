import { Hook, UrlBuilder } from "markmap-common";
import { buildTree } from "markmap-html-parser";
import MarkdownIt from "markdown-it";
import md_ins from "markdown-it-ins";
import md_mark from "markdown-it-mark";
import md_sub from "markdown-it-sub";
import md_sup from "markdown-it-sup";
function initializeMarkdownIt() {
  const md = MarkdownIt({
    html: true,
    breaks: true
  });
  md.use(md_ins).use(md_mark).use(md_sub).use(md_sup);
  return md;
}
function createTransformHooks(transformer) {
  return {
    transformer,
    parser: new Hook(),
    beforeParse: new Hook(),
    afterParse: new Hook(),
    retransform: new Hook()
  };
}
function patchJSItem(urlBuilder, item) {
  if (item.type === "script" && item.data.src) {
    return {
      ...item,
      data: {
        ...item.data,
        src: urlBuilder.getFullUrl(item.data.src)
      }
    };
  }
  return item;
}
function patchCSSItem(urlBuilder, item) {
  if (item.type === "stylesheet" && item.data.href) {
    return {
      ...item,
      data: {
        ...item.data,
        href: urlBuilder.getFullUrl(item.data.href)
      }
    };
  }
  return item;
}
const builtInPlugins = [];
function cleanNode(node) {
  while (!node.content && node.children.length === 1) {
    node = node.children[0];
  }
  while (node.children.length === 1 && !node.children[0].content) {
    node = {
      ...node,
      children: node.children[0].children
    };
  }
  return {
    ...node,
    children: node.children.map(cleanNode)
  };
}
class Transformer {
  constructor(plugins = builtInPlugins) {
    this.assetsMap = {};
    this.urlBuilder = new UrlBuilder();
    this.hooks = createTransformHooks(this);
    this.plugins = plugins.map(
      (plugin) => typeof plugin === "function" ? plugin() : plugin
    );
    const assetsMap = {};
    for (const { name, transform } of this.plugins) {
      assetsMap[name] = transform(this.hooks);
    }
    this.assetsMap = assetsMap;
    const md = initializeMarkdownIt();
    this.md = md;
    this.hooks.parser.call(md);
  }
  transform(content, fallbackParserOptions) {
    var _a;
    const context = {
      content,
      features: {},
      parserOptions: fallbackParserOptions
    };
    this.hooks.beforeParse.call(this.md, context);
    let { content: rawContent } = context;
    if (context.frontmatterInfo)
      rawContent = rawContent.slice(context.frontmatterInfo.offset);
    const html = this.md.render(rawContent, {});
    this.hooks.afterParse.call(this.md, context);
    const root = cleanNode(buildTree(html, context.parserOptions));
    root.content || (root.content = `${((_a = context.frontmatter) == null ? void 0 : _a.title) || ""}`);
    return { ...context, root };
  }
  resolveJS(item) {
    return patchJSItem(this.urlBuilder, item);
  }
  resolveCSS(item) {
    return patchCSSItem(this.urlBuilder, item);
  }
  /**
   * Get all assets from enabled plugins or filter them by plugin names as keys.
   */
  getAssets(keys) {
    const styles = [];
    const scripts = [];
    keys ?? (keys = this.plugins.map((plugin) => plugin.name));
    for (const assets of keys.map((key) => this.assetsMap[key])) {
      if (assets) {
        if (assets.styles) styles.push(...assets.styles);
        if (assets.scripts) scripts.push(...assets.scripts);
      }
    }
    return {
      styles: styles.map((item) => this.resolveCSS(item)),
      scripts: scripts.map((item) => this.resolveJS(item))
    };
  }
  /**
   * Get used assets by features object returned by `transform`.
   */
  getUsedAssets(features) {
    const keys = this.plugins.map((plugin) => plugin.name).filter((name) => features[name]);
    return this.getAssets(keys);
  }
}
Math.random().toString(36).slice(2, 8);
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
  isSvg: false
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
  if (e = U[e] || e, n === true)
    t.setAttribute(e, "");
  else if (n === false)
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
      isSvg: true
    })), e.isSvg ? n = document.createElementNS(P, r) : n = document.createElement(r), D(n, s, e), s.children) {
      let i = e;
      e.isSvg && r === "foreignObject" && (i = Object.assign({}, i, {
        isSvg: false
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
const pluginAssets = {
  katex: {
    styles: [
      {
        type: "stylesheet",
        data: {
          href: "https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.min.css"
        }
      }
    ],
    scripts: [
      {
        type: "script",
        data: {
          src: "https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.min.js"
        }
      }
    ]
  },
  hljs: {
    styles: [
      {
        type: "stylesheet",
        data: {
          href: "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/default.min.css"
        }
      }
    ],
    scripts: [
      {
        type: "script",
        data: {
          src: "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/core.min.js"
        }
      }
    ]
  },
  prism: {
    styles: [
      {
        type: "stylesheet",
        data: {
          href: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css"
        }
      }
    ],
    scripts: [
      {
        type: "script",
        data: {
          src: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"
        }
      }
    ]
  }
};
async function loadPlugins(plugins = ["katex", "hljs"]) {
  const allStyles = [];
  const allScripts = [];
  for (const plugin of plugins) {
    const assets = pluginAssets[plugin];
    if (assets) {
      allStyles.push(...assets.styles);
      allScripts.push(...assets.scripts);
    }
  }
  await ct(allStyles);
  await it(allScripts);
  const loaded = {};
  if (typeof window !== "undefined") {
    loaded.katex = !!window.katex;
    loaded.hljs = !!window.hljs;
    loaded.Prism = !!window.Prism;
  }
  return loaded;
}
const transformerVersions = {
  "markmap-lib": "0.18.12"
};
export {
  Transformer,
  builtInPlugins,
  loadPlugins,
  patchCSSItem,
  patchJSItem,
  pluginAssets,
  transformerVersions
};
