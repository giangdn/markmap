"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const markmapCommon = require("markmap-common");
const markmapHtmlParser = require("markmap-html-parser");
const MarkdownIt = require("markdown-it");
const md_ins = require("markdown-it-ins");
const md_mark = require("markdown-it-mark");
const md_sub = require("markdown-it-sub");
const md_sup = require("markdown-it-sup");
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
    parser: new markmapCommon.Hook(),
    beforeParse: new markmapCommon.Hook(),
    afterParse: new markmapCommon.Hook(),
    retransform: new markmapCommon.Hook()
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
    this.urlBuilder = new markmapCommon.UrlBuilder();
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
    const root = cleanNode(markmapHtmlParser.buildTree(html, context.parserOptions));
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
function defer() {
  const obj = {};
  obj.promise = new Promise((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  return obj;
}
function memoize(fn) {
  const cache = {};
  return function memoized(...args) {
    const key = `${args[0]}`;
    let data = cache[key];
    if (!data) {
      data = {
        value: fn(...args)
      };
      cache[key] = data;
    }
    return data.value;
  };
}
/*! @gera2ld/jsx-dom v2.2.2 | ISC License */
const VTYPE_ELEMENT = 1;
const VTYPE_FUNCTION = 2;
const SVG_NS = "http://www.w3.org/2000/svg";
const XLINK_NS = "http://www.w3.org/1999/xlink";
const NS_ATTRS = {
  show: XLINK_NS,
  actuate: XLINK_NS,
  href: XLINK_NS
};
const isLeaf = (c) => typeof c === "string" || typeof c === "number";
const isElement = (c) => (c == null ? void 0 : c.vtype) === VTYPE_ELEMENT;
const isRenderFunction = (c) => (c == null ? void 0 : c.vtype) === VTYPE_FUNCTION;
function h(type, props, ...children) {
  props = Object.assign({}, props, {
    children: children.length === 1 ? children[0] : children
  });
  return jsx(type, props);
}
function jsx(type, props) {
  let vtype;
  if (typeof type === "string") vtype = VTYPE_ELEMENT;
  else if (typeof type === "function") vtype = VTYPE_FUNCTION;
  else throw new Error("Invalid VNode type");
  return {
    vtype,
    type,
    props
  };
}
function Fragment(props) {
  return props.children;
}
const DEFAULT_ENV = {
  isSvg: false
};
function insertDom(parent, nodes) {
  if (!Array.isArray(nodes)) nodes = [nodes];
  nodes = nodes.filter(Boolean);
  if (nodes.length) parent.append(...nodes);
}
function mountAttributes(domElement, props, env) {
  for (const key in props) {
    if (key === "key" || key === "children" || key === "ref") continue;
    if (key === "dangerouslySetInnerHTML") {
      domElement.innerHTML = props[key].__html;
    } else if (key === "innerHTML" || key === "textContent" || key === "innerText" || key === "value" && ["textarea", "select"].includes(domElement.tagName)) {
      const value = props[key];
      if (value != null) domElement[key] = value;
    } else if (key.startsWith("on")) {
      domElement[key.toLowerCase()] = props[key];
    } else {
      setDOMAttribute(domElement, key, props[key], env.isSvg);
    }
  }
}
const attrMap = {
  className: "class",
  labelFor: "for"
};
function setDOMAttribute(el, attr, value, isSVG) {
  attr = attrMap[attr] || attr;
  if (value === true) {
    el.setAttribute(attr, "");
  } else if (value === false) {
    el.removeAttribute(attr);
  } else {
    const namespace = isSVG ? NS_ATTRS[attr] : void 0;
    if (namespace !== void 0) {
      el.setAttributeNS(namespace, attr, value);
    } else {
      el.setAttribute(attr, value);
    }
  }
}
function flatten(arr) {
  return arr.reduce((prev, item) => prev.concat(item), []);
}
function mountChildren(children, env) {
  return Array.isArray(children) ? flatten(children.map((child) => mountChildren(child, env))) : mount(children, env);
}
function mount(vnode, env = DEFAULT_ENV) {
  if (vnode == null || typeof vnode === "boolean") {
    return null;
  }
  if (vnode instanceof Node) {
    return vnode;
  }
  if (isRenderFunction(vnode)) {
    const {
      type,
      props
    } = vnode;
    if (type === Fragment) {
      const node = document.createDocumentFragment();
      if (props.children) {
        const children = mountChildren(props.children, env);
        insertDom(node, children);
      }
      return node;
    }
    const childVNode = type(props);
    return mount(childVNode, env);
  }
  if (isLeaf(vnode)) {
    return document.createTextNode(`${vnode}`);
  }
  if (isElement(vnode)) {
    let node;
    const {
      type,
      props
    } = vnode;
    if (!env.isSvg && type === "svg") {
      env = Object.assign({}, env, {
        isSvg: true
      });
    }
    if (!env.isSvg) {
      node = document.createElement(type);
    } else {
      node = document.createElementNS(SVG_NS, type);
    }
    mountAttributes(node, props, env);
    if (props.children) {
      let childEnv = env;
      if (env.isSvg && type === "foreignObject") {
        childEnv = Object.assign({}, childEnv, {
          isSvg: false
        });
      }
      const children = mountChildren(props.children, childEnv);
      if (children != null) insertDom(node, children);
    }
    const {
      ref
    } = props;
    if (typeof ref === "function") ref(node);
    return node;
  }
  throw new Error("mount: Invalid Vnode!");
}
function mountDom(vnode) {
  return mount(vnode);
}
function hm(...args) {
  return mountDom(h(...args));
}
const memoizedPreloadJS = memoize((url) => {
  document.head.append(
    hm("link", {
      rel: "preload",
      as: "script",
      href: url
    })
  );
});
const jsCache = {};
const cssCache = {};
async function loadJSItem(item, context) {
  var _a;
  const src = item.type === "script" && ((_a = item.data) == null ? void 0 : _a.src) || "";
  item.loaded || (item.loaded = jsCache[src]);
  if (!item.loaded) {
    const deferred = defer();
    item.loaded = deferred.promise;
    if (item.type === "script") {
      document.head.append(
        hm("script", {
          ...item.data,
          onLoad: () => deferred.resolve(),
          onError: deferred.reject
        })
      );
      if (!src) {
        deferred.resolve();
      } else {
        jsCache[src] = item.loaded;
      }
    }
    if (item.type === "iife") {
      const { fn, getParams } = item.data;
      fn(...(getParams == null ? void 0 : getParams(context)) || []);
      deferred.resolve();
    }
  }
  await item.loaded;
}
async function loadCSSItem(item) {
  const url = item.type === "stylesheet" && item.data.href || "";
  item.loaded || (item.loaded = cssCache[url]);
  if (!item.loaded) {
    const deferred = defer();
    item.loaded = deferred.promise;
    if (url) cssCache[url] = item.loaded;
    if (item.type === "style") {
      document.head.append(
        hm("style", {
          textContent: item.data
        })
      );
      deferred.resolve();
    } else if (url) {
      document.head.append(
        hm("link", {
          rel: "stylesheet",
          ...item.data
        })
      );
      fetch(url).then((res) => {
        if (res.ok) return res.text();
        throw res;
      }).then(() => deferred.resolve(), deferred.reject);
    }
  }
  await item.loaded;
}
async function loadJS(items, context) {
  items.forEach((item) => {
    var _a;
    if (item.type === "script" && ((_a = item.data) == null ? void 0 : _a.src)) {
      memoizedPreloadJS(item.data.src);
    }
  });
  context = {
    getMarkmap: () => window.markmap,
    ...context
  };
  for (const item of items) {
    await loadJSItem(item, context);
  }
}
async function loadCSS(items) {
  await Promise.all(items.map((item) => loadCSSItem(item)));
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
  await loadCSS(allStyles);
  await loadJS(allScripts);
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
exports.Transformer = Transformer;
exports.builtInPlugins = builtInPlugins;
exports.loadPlugins = loadPlugins;
exports.patchCSSItem = patchCSSItem;
exports.patchJSItem = patchJSItem;
exports.pluginAssets = pluginAssets;
exports.transformerVersions = transformerVersions;
