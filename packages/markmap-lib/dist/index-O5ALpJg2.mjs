import { parse } from "yaml";
import hljs from "highlight.js";
import katexPluginModule from "@vscode/markdown-it-katex";
class Hook {
  constructor() {
    this.listeners = [];
  }
  tap(fn) {
    this.listeners.push(fn);
    return () => this.revoke(fn);
  }
  revoke(fn) {
    const i = this.listeners.indexOf(fn);
    if (i >= 0) this.listeners.splice(i, 1);
  }
  revokeAll() {
    this.listeners.splice(0);
  }
  call(...args) {
    for (const fn of this.listeners) {
      fn(...args);
    }
  }
}
Math.random().toString(36).slice(2, 8);
function noop() {
}
function walkTree(tree, callback) {
  const walk = (item, parent) => callback(
    item,
    () => {
      var _a;
      return (_a = item.children) == null ? void 0 : _a.map((child) => walk(child, item));
    },
    parent
  );
  return walk(tree);
}
function wrapFunction(fn, wrapper) {
  return (...args) => wrapper(fn, ...args);
}
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
function buildJSItem(path) {
  return {
    type: "script",
    data: {
      src: path
    }
  };
}
function buildCSSItem(path) {
  return {
    type: "stylesheet",
    data: {
      href: path
    }
  };
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
function definePlugin(plugin2) {
  return plugin2;
}
const svgMarked = '<svg width="16" height="16" viewBox="0 -3 24 24"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-9 14-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8z"/></svg>\n';
const svgUnmarked = '<svg width="16" height="16" viewBox="0 -3 24 24"><path fill-rule="evenodd" d="M6 5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1zM3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-5z" clip-rule="evenodd"/></svg>\n';
const name$5 = "checkbox";
const images = {
  " ": svgUnmarked.trim(),
  x: svgMarked.trim()
};
const plugin$3 = definePlugin({
  name: name$5,
  transform(transformHooks) {
    transformHooks.parser.tap((md) => {
      md.core.ruler.before("inline", "checkbox", (state) => {
        for (let i = 2; i < state.tokens.length; i += 1) {
          const token = state.tokens[i];
          if (token.type === "inline" && token.content) {
            const prevType = state.tokens[i - 1].type;
            const prevPrevType = state.tokens[i - 2].type;
            if (prevType === "heading_open" || prevType === "paragraph_open" && prevPrevType === "list_item_open") {
              token.content = token.content.replace(
                /^\[(.)\] /,
                (m, g) => images[g] ? `${images[g]} ` : m
              );
            }
          }
        }
        return false;
      });
    });
    return {};
  }
});
const name$4 = "frontmatter";
const pluginFrontmatter = definePlugin({
  name: name$4,
  transform(transformHooks) {
    transformHooks.beforeParse.tap((_md, context) => {
      var _a;
      const { content } = context;
      if (!/^---\r?\n/.test(content)) return;
      const match = /\n---\r?\n/.exec(content);
      if (!match) return;
      const raw = content.slice(4, match.index).trimEnd();
      let frontmatter;
      try {
        frontmatter = parse(raw.replace(/\r?\n|\r/g, "\n"));
        if (frontmatter == null ? void 0 : frontmatter.markmap) {
          frontmatter.markmap = normalizeMarkmapJsonOptions(
            frontmatter.markmap
          );
        }
      } catch {
        return;
      }
      context.frontmatter = frontmatter;
      context.parserOptions = {
        ...context.parserOptions,
        ...(_a = frontmatter == null ? void 0 : frontmatter.markmap) == null ? void 0 : _a.htmlParser
      };
      context.frontmatterInfo = {
        lines: content.slice(0, match.index).split("\n").length + 1,
        offset: match.index + match[0].length
      };
    });
    return {};
  }
});
function normalizeMarkmapJsonOptions(options) {
  if (!options) return;
  ["color", "extraJs", "extraCss"].forEach((key) => {
    if (options[key] != null) options[key] = normalizeStringArray(options[key]);
  });
  ["duration", "maxWidth", "initialExpandLevel"].forEach((key) => {
    if (options[key] != null) options[key] = normalizeNumber(options[key]);
  });
  return options;
}
function normalizeStringArray(value) {
  let result;
  if (typeof value === "string") result = [value];
  else if (Array.isArray(value))
    result = value.filter((item) => item && typeof item === "string");
  return (result == null ? void 0 : result.length) ? result : void 0;
}
function normalizeNumber(value) {
  if (isNaN(+value)) return;
  return +value;
}
const name$3 = "hljs";
const preloadScripts$1 = [
  `@highlightjs/cdn-assets@${"11.11.1"}/highlight.min.js`
].map((path) => buildJSItem(path));
const styles$1 = [
  `@highlightjs/cdn-assets@${"11.11.1"}/styles/default.min.css`
].map((path) => buildCSSItem(path));
const config$1 = {
  versions: {
    hljs: "11.11.1"
  },
  preloadScripts: preloadScripts$1,
  styles: styles$1
};
const plugin$2 = definePlugin({
  name: name$3,
  config: config$1,
  transform(transformHooks) {
    var _a;
    let enableFeature = noop;
    transformHooks.parser.tap((md) => {
      md.set({
        highlight: (str, language) => {
          enableFeature();
          return hljs.highlightAuto(str, language ? [language] : void 0).value;
        }
      });
    });
    transformHooks.beforeParse.tap((_, context) => {
      enableFeature = () => {
        context.features[name$3] = true;
      };
    });
    return {
      styles: (_a = plugin$2.config) == null ? void 0 : _a.styles
    };
  }
});
var define_define_KATEX_RESOURCES_default = ["katex@0.16.43/dist/fonts/KaTeX_AMS-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Caligraphic-Bold.woff2", "katex@0.16.43/dist/fonts/KaTeX_Caligraphic-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Fraktur-Bold.woff2", "katex@0.16.43/dist/fonts/KaTeX_Fraktur-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Main-Bold.woff2", "katex@0.16.43/dist/fonts/KaTeX_Main-BoldItalic.woff2", "katex@0.16.43/dist/fonts/KaTeX_Main-Italic.woff2", "katex@0.16.43/dist/fonts/KaTeX_Main-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Math-BoldItalic.woff2", "katex@0.16.43/dist/fonts/KaTeX_Math-Italic.woff2", "katex@0.16.43/dist/fonts/KaTeX_SansSerif-Bold.woff2", "katex@0.16.43/dist/fonts/KaTeX_SansSerif-Italic.woff2", "katex@0.16.43/dist/fonts/KaTeX_SansSerif-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Script-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Size1-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Size2-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Size3-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Size4-Regular.woff2", "katex@0.16.43/dist/fonts/KaTeX_Typewriter-Regular.woff2"];
const name$2 = "katex";
const preloadScripts = [
  `katex@${"0.16.43"}/dist/katex.min.js`
].map((path) => buildJSItem(path));
const webfontloader = buildJSItem(
  `webfontloader@${"1.6.28"}/webfontloader.js`
);
webfontloader.data.defer = true;
const styles = [`katex@${"0.16.43"}/dist/katex.min.css`].map(
  (path) => buildCSSItem(path)
);
const config = {
  versions: {
    katex: "0.16.43",
    webfontloader: "1.6.28"
  },
  preloadScripts,
  scripts: [
    {
      type: "iife",
      data: {
        fn: (getMarkmap) => {
          window.WebFontConfig = {
            custom: {
              families: [
                "KaTeX_AMS",
                "KaTeX_Caligraphic:n4,n7",
                "KaTeX_Fraktur:n4,n7",
                "KaTeX_Main:n4,n7,i4,i7",
                "KaTeX_Math:i4,i7",
                "KaTeX_Script",
                "KaTeX_SansSerif:n4,n7,i4",
                "KaTeX_Size1",
                "KaTeX_Size2",
                "KaTeX_Size3",
                "KaTeX_Size4",
                "KaTeX_Typewriter"
              ]
            },
            active: () => {
              getMarkmap().refreshHook.call();
            }
          };
        },
        getParams({ getMarkmap }) {
          return [getMarkmap];
        }
      }
    },
    webfontloader
  ],
  styles,
  resources: define_define_KATEX_RESOURCES_default
};
function interop(mod) {
  return mod.default || mod;
}
const katexPlugin = interop(katexPluginModule);
const plugin$1 = definePlugin({
  name: name$2,
  config,
  transform(transformHooks) {
    var _a, _b;
    let enableFeature = noop;
    transformHooks.parser.tap((md) => {
      md.use(katexPlugin);
      ["math_block", "math_inline"].forEach((key) => {
        const fn = md.renderer.rules[key];
        if (fn) {
          md.renderer.rules[key] = wrapFunction(fn, (render, ...args) => {
            enableFeature();
            return render(...args);
          });
        }
      });
    });
    transformHooks.beforeParse.tap((_, context) => {
      enableFeature = () => {
        context.features[name$2] = true;
      };
    });
    return {
      styles: (_a = plugin$1.config) == null ? void 0 : _a.styles,
      scripts: (_b = plugin$1.config) == null ? void 0 : _b.scripts
    };
  }
});
const name$1 = "npmUrl";
const pluginNpmUrl = definePlugin({
  name: name$1,
  transform(transformHooks) {
    transformHooks.afterParse.tap((_, context) => {
      const { frontmatter } = context;
      const markmap = frontmatter == null ? void 0 : frontmatter.markmap;
      if (markmap) {
        ["extraJs", "extraCss"].forEach((key) => {
          const value = markmap[key];
          if (value) {
            markmap[key] = value.map((path) => {
              if (path.startsWith("npm:")) {
                return transformHooks.transformer.urlBuilder.getFullUrl(
                  path.slice(4)
                );
              }
              return path;
            });
          }
        });
      }
    });
    return {};
  }
});
const name = "sourceLines";
const plugin = definePlugin({
  name,
  transform(transformHooks) {
    let frontmatterLines = 0;
    transformHooks.beforeParse.tap((_md, context) => {
      var _a;
      frontmatterLines = ((_a = context.frontmatterInfo) == null ? void 0 : _a.lines) || 0;
    });
    transformHooks.parser.tap((md) => {
      md.renderer.renderAttrs = wrapFunction(
        md.renderer.renderAttrs,
        (renderAttrs, token) => {
          if (token.block && token.map) {
            const lineRange = token.map.map((line) => line + frontmatterLines);
            token.attrSet("data-lines", lineRange.join(","));
          }
          return renderAttrs(token);
        }
      );
      if (md.renderer.rules.fence) {
        md.renderer.rules.fence = wrapFunction(
          md.renderer.rules.fence,
          (fence, tokens, idx, ...rest) => {
            let result = fence(tokens, idx, ...rest);
            const token = tokens[idx];
            if (result.startsWith("<pre>") && token.map) {
              const lineRange = token.map.map(
                (line) => line + frontmatterLines
              );
              result = result.slice(0, 4) + ` data-lines="${lineRange.join(",")}"` + result.slice(4);
            }
            return result;
          }
        );
      }
    });
    return {};
  }
});
const plugins = [
  pluginFrontmatter,
  plugin$1,
  plugin$2,
  pluginNpmUrl,
  plugin$3,
  plugin
];
export {
  loadJS as a,
  plugin$3 as b,
  createTransformHooks as c,
  definePlugin as d,
  pluginFrontmatter as e,
  plugin$2 as f,
  plugin$1 as g,
  pluginNpmUrl as h,
  plugin as i,
  loadCSS as l,
  plugins as p,
  walkTree as w
};
