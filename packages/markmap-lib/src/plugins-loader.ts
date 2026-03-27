import { loadCSS, loadJS, JSItem, CSSItem } from 'markmap-common';

// Define all plugin assets
const pluginAssets = {
  katex: {
    styles: [
      {
        type: 'stylesheet' as const,
        data: {
          href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
        },
      },
    ],
    scripts: [
      {
        type: 'script' as const,
        data: {
          src: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
        },
      },
    ],
  },
  hljs: {
    styles: [
      {
        type: 'stylesheet' as const,
        data: {
          href: 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/default.min.css',
        },
      },
    ],
    scripts: [
      {
        type: 'script' as const,
        data: {
          src: 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/lib/core.min.js',
        },
      },
    ],
  },
  prism: {
    styles: [
      {
        type: 'stylesheet' as const,
        data: {
          href: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.min.css',
        },
      },
    ],
    scripts: [
      {
        type: 'script' as const,
        data: {
          src: 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js',
        },
      },
    ],
  },
};

export type PluginName = keyof typeof pluginAssets;

export async function loadPlugins(plugins: PluginName[] = ['katex', 'hljs']) {
  const allStyles: CSSItem[] = [];
  const allScripts: JSItem[] = [];

  for (const plugin of plugins) {
    const assets = pluginAssets[plugin];
    if (assets) {
      allStyles.push(...assets.styles);
      allScripts.push(...assets.scripts);
    }
  }

  await loadCSS(allStyles);
  await loadJS(allScripts);

  // Verify plugins are loaded
  const loaded: Record<string, boolean> = {};
  if (typeof window !== 'undefined') {
    loaded.katex = !!(window as any).katex;
    loaded.hljs = !!(window as any).hljs;
    loaded.Prism = !!(window as any).Prism;
  }

  return loaded;
}

export { pluginAssets };
