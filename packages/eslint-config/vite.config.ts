import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

const packageRoot = __dirname;

export default defineConfig({
  root: packageRoot,
  cacheDir: '../../node_modules/.vite/packages/eslint-config',

  plugins: [
    nxViteTsPaths(),
    nxCopyAssetsPlugin(['*.md']),
    dts({
      entryRoot: 'src',
      tsconfigPath: path.join(__dirname, 'tsconfig.lib.json'),
    }),
  ],

  build: {
    outDir: '../../dist/packages/eslint-config',
    emptyOutDir: true,
    reportCompressedSize: true,
    lib: {
      entry: 'src/index.ts',
      name: 'eslint-config',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // Externalize all dependencies - they should be provided by the consuming project
      external: [
        'eslint',
        '@eslint/js',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'eslint-plugin-simple-import-sort',
        'eslint-plugin-unused-imports',
        'globals',
        'typescript-eslint',
        /^node:/,
      ],
    },
  },
});
