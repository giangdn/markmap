declare const pluginAssets: {
  katex: {
    styles: {
      type: 'stylesheet';
      data: {
        href: string;
      };
    }[];
    scripts: {
      type: 'script';
      data: {
        src: string;
      };
    }[];
  };
  hljs: {
    styles: {
      type: 'stylesheet';
      data: {
        href: string;
      };
    }[];
    scripts: {
      type: 'script';
      data: {
        src: string;
      };
    }[];
  };
  prism: {
    styles: {
      type: 'stylesheet';
      data: {
        href: string;
      };
    }[];
    scripts: {
      type: 'script';
      data: {
        src: string;
      };
    }[];
  };
};
export type PluginName = keyof typeof pluginAssets;
export declare function loadPlugins(
  plugins?: PluginName[],
): Promise<Record<string, boolean>>;
export { pluginAssets };
