import { defineConfig } from 'vite';
import { resolve } from 'path';
import { versionLoader } from '../../util.mts';

const getVersion = versionLoader(import.meta.dirname);

export default defineConfig({
  define: {
    '__define__.D3_VERSION': JSON.stringify(await getVersion('d3')),
    '__define__.LIB_VERSION': JSON.stringify(await getVersion('markmap-lib')),
    '__define__.VIEW_VERSION': JSON.stringify(await getVersion('markmap-view')),
    '__define__.TOOLBAR_VERSION': JSON.stringify(
      await getVersion('markmap-toolbar'),
    ),
  },
  resolve: {
    alias: {
      'markmap-common': resolve(__dirname, '../markmap-common/src/index.ts'),
      'markmap-lib': resolve(__dirname, '../markmap-lib/src/index.ts'),
      'markmap-view': resolve(__dirname, '../markmap-view/src/index.ts'),
      'markmap-toolbar': resolve(__dirname, '../markmap-toolbar/src/index.ts'),
      'markmap-html-parser': resolve(
        __dirname,
        '../markmap-html-parser/src/index.ts',
      ),
    },
  },
  build: {
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['iife'],
      name: 'markmap.autoLoader',
      fileName: () => 'index.js',
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
});
