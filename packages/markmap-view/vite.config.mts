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
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: {
      external: ['d3', 'markmap-common'],
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
    outDir: 'dist/browser',
    minify: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['iife'],
      fileName: () => 'index.js',
      name: 'markmap',
    },
    rollupOptions: {
      external: ['d3'],
      output: {
        extend: true,
        globals: {
          d3: 'd3',
        },
      },
    },
  },
});

export default process.env.TARGET === 'es' ? configEs : configJs;
