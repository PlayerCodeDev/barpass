// ESLint v9.39.1 — Configuración Flat Config moderna y 100% compatible

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import pluginN from 'eslint-plugin-n';
import globals from 'globals';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  // -------------------------
  // Ignorados
  // -------------------------
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '**/*.config.js',
      '**/eslint.config.js',
    ],
  },

  // -------------------------
  // Configuración JS base
  // -------------------------
  js.configs.recommended,

  // -------------------------
  // TypeScript (Flat Config real)
  // -------------------------
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,

  // -------------------------
  // Plugin N (Node.js moderno)
  // -------------------------
  {
    plugins: { n: pluginN },
    rules: {
      ...pluginN.configs.recommended.rules,
    },
  },

  // -------------------------
  // Configuración Global del proyecto
  // -------------------------
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: { prettier },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'prettier/prettier': 'error',
    },
  },

  // -------------------------
  // Backend (apps/backend)
  // -------------------------
  {
    files: ['apps/backend/src/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(__dirname, 'apps/backend'),
      },
    },
    rules: {
      // Importaciones dinámicas/TS
      'n/no-missing-import': 'off',
      'n/no-unsupported-features/es-syntax': 'off',
      'n/no-process-exit': 'off',
    },
  },

  // -------------------------
  // Tests Backend
  // -------------------------
  {
    files: ['apps/backend/tests/**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: path.join(__dirname, 'apps/backend'),
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      'n/no-missing-import': 'off',
    },
  },
];
