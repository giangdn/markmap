import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readPackageUp } from 'read-package-up';

const dir = import.meta.dirname;

const internalPackages = [
  'markmap-common',
  'markmap-html-parser',
  'markmap-lib',
  'markmap-toolbar',
  'markmap-render',
  'markmap-autoloader',
  'd3',
];

const { packageJson: pkg } = await readPackageUp({ cwd: dir });
const external = [
  ...Object.keys(pkg.dependencies).filter(
    (dep) => !internalPackages.includes(dep),
  ),
  ...Object.keys(pkg.peerDependencies || {}).filter(
    (dep) => !internalPackages.includes(dep),
  ),
];

const aliases = {
  'markmap-common': resolve(dir, '../markmap-common/src/index.ts'),
  'markmap-html-parser': resolve(dir, '../markmap-html-parser/src/index.ts'),
  'markmap-lib': resolve(dir, '../markmap-lib/src/index.ts'),
};

const configEs = defineConfig({
  resolve: { alias: aliases },
  build: {
    emptyOutDir: false,
    lib: {
      entry: 'src/index.ts',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'js'}`,
    },
    rollupOptions: { external },
  },
});

const configJs = defineConfig({
  resolve: { alias: aliases },
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
