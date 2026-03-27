import { createReadStream, createWriteStream } from "fs";
import { stat, mkdir } from "fs/promises";
import { extractAssets } from "markmap-common";
import { Transformer } from "markmap-lib";
import { baseJsPaths } from "markmap-render";
import { resolve, dirname } from "path";
import { pipeline } from "stream/promises";
import { l as localProvider, A as ASSETS_PREFIX, t as toolbarAssets, c as config, a as createStreamBody } from "./common-2tfv4U5E.js";
const providerName = "local-hook";
async function fetchAssets({
  assetsDir = config.assetsDir,
  verbose
} = {}) {
  const transformer = new Transformer();
  transformer.urlBuilder.setProvider(providerName, localProvider);
  transformer.urlBuilder.provider = providerName;
  const assets = transformer.getAssets();
  delete transformer.urlBuilder.providers[providerName];
  const pluginPaths = extractAssets(assets).filter((url) => url.startsWith(ASSETS_PREFIX)).map((url) => url.slice(ASSETS_PREFIX.length));
  const resources = transformer.plugins.flatMap(
    (plugin) => {
      var _a;
      return ((_a = plugin.config) == null ? void 0 : _a.resources) || [];
    }
  );
  const paths = [
    ...baseJsPaths,
    ...pluginPaths,
    ...resources,
    ...extractAssets(toolbarAssets)
  ];
  const resolveDepPath = (path) => {
    const parts = path.split("/");
    const offset = parts[0].startsWith("@") ? 1 : 0;
    parts[offset] = parts[offset].split("@")[0];
    path = parts.join("/");
    if (path.startsWith("d3")) {
      path = "markmap-view/node_modules/" + path;
    } else if (!path.startsWith("markmap-")) {
      path = "markmap-lib/node_modules/" + path;
    }
    return resolve("..", path);
  };
  await Promise.all(
    paths.map(async (path) => {
      const fullPath = resolve(assetsDir, path);
      let url;
      await downloadAsset(fullPath, async () => url = resolveDepPath(path));
      if (verbose) {
        console.log(
          url ? `Fetched: ${url} -> ${fullPath}` : `Skipped existing file: ${fullPath}`
        );
      }
    })
  );
}
async function downloadAsset(fullPath, resolveUrl) {
  try {
    const result = await stat(fullPath);
    if (result.isFile()) return;
  } catch {
  }
  const url = await resolveUrl();
  let body;
  if (url.startsWith("/")) {
    body = createStreamBody(createReadStream(url));
  } else {
    const res = await fetch(url);
    if (!res.ok || !res.body) throw new Error(`Failed to download: ${url}`);
    body = res.body;
  }
  await mkdir(dirname(fullPath), { recursive: true });
  await pipeline(body, createWriteStream(fullPath));
}
async function main() {
  await fetchAssets({ verbose: true });
}
main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
