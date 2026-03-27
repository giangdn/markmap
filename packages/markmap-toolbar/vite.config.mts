import { defineConfig } from 'vite';
import { resolve } from 'path';

const configEs = defineConfig({
  resolve: {
    alias: {
      'markmap-common': resolve(__dirname, '../markmap-common/src/index.ts'),
    },
  },
  build: {
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: 'src/index.ts',
      fileName: 'index',
      cssFileName: 'style',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['markmap-common'],
    },
  },
});

const configJs = defineConfig({
  resolve: {
    alias: {
      'markmap-common': resolve(__dirname, '../markmap-common/src/index.ts'),
    },
  },
  build: {
    emptyOutDir: false,
    minify: false,
    lib: {
      entry: 'src/index.ts',
      fileName: () => 'index.js',
      cssFileName: 'style',
      formats: ['iife'],
      name: 'markmap',
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
});

export default process.env.TARGET === 'es' ? configEs : configJs;
