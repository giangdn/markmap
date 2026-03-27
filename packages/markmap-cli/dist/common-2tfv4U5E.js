import { buildJSItem, buildCSSItem } from "markmap-common";
import { dirname } from "path";
import { fileURLToPath } from "url";
const TOOLBAR_VERSION = "0.18.12";
const TOOLBAR_CSS = `markmap-toolbar@${TOOLBAR_VERSION}/dist/style.css`;
const TOOLBAR_JS = `markmap-toolbar@${TOOLBAR_VERSION}/dist/index.js`;
const distDir = dirname(fileURLToPath(import.meta.url));
const ASSETS_PREFIX = "/assets/";
const renderToolbar = () => {
  const { markmap, mm } = window;
  const toolbar = new markmap.Toolbar();
  toolbar.attach(mm);
  const el = toolbar.render();
  el.setAttribute("style", "position:absolute;bottom:20px;right:20px");
  document.body.append(el);
};
const toolbarAssets = {
  styles: [buildCSSItem(TOOLBAR_CSS)],
  scripts: [
    buildJSItem(TOOLBAR_JS),
    {
      type: "iife",
      data: {
        fn: (r) => {
          setTimeout(r);
        },
        getParams: () => [renderToolbar]
      }
    }
  ]
};
function localProvider(path) {
  return `${ASSETS_PREFIX}${path}`;
}
function createStreamBody(stream) {
  const body = new ReadableStream({
    start(controller) {
      stream.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      stream.on("end", () => {
        controller.close();
      });
    },
    cancel() {
      stream.destroy();
    }
  });
  return body;
}
const config = {
  distDir,
  assetsDir: `${distDir}${ASSETS_PREFIX}`
};
export {
  ASSETS_PREFIX as A,
  createStreamBody as a,
  config as c,
  localProvider as l,
  toolbarAssets as t
};
