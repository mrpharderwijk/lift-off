import type { Linter } from 'eslint';
import prettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import eslintJs from '@eslint/js';
import tseslint from 'typescript-eslint';

const customGlobals = {
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.jest,
      ...globals.node,
    },
  },
};

export default [
  eslintJs.configs.recommended,
  ...tseslint.configs.recommended,
  customGlobals,
  prettier,
  {
    plugins: {
      prettier: eslintPluginPrettier,
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': eslintPluginSimpleImportSort,
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      endOfLine: 'off',
      'no-console': [0],
      'no-unused-vars': 'off',

      /**
       * https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/docs/rules/explicit-function-return-type.md
       */
      '@typescript-eslint/explicit-function-return-type': 'warn',

      'prettier/prettier': [
        'error',
        {
          trailingComma: 'all',
          tabWidth: 2,
          useTabs: false,
          semi: false,
          singleQuote: true,
          endOfLine: 'auto',
        },
      ],

      /**
       * https://github.com/sweepline/eslint-plugin-unused-imports
       */
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      /**
       * https://github.com/lydell/eslint-plugin-simple-import-sort
       */
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^\\w', '^@\\w'], // external deps
            ['^\\.\\./', '^\\./'], // local dependencies
            ['^\\./(.*)module.scss$'], // css always last
          ],
        },
      ],
      'simple-import-sort/exports': 'error',
    },
  },
] satisfies Linter.Config[];
