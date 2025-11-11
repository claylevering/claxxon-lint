/**
 * Node ESLint Configuration
 * Individual Node rules for flat config format
 */

import pluginN from 'eslint-plugin-n';

export default {
  name: '@claxxon-lint/node',
  files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...pluginN.configs['flat/recommended-module'].languageOptions.globals
    }
  },
  plugins: {
    n: pluginN
  },
  rules: {
    // Custom Node rules - these can be customized per project
    'n/no-missing-import': 'error',
    'n/no-missing-require': 'error',
    'n/no-unpublished-import': 'warn',
    'n/no-unpublished-require': 'warn',
    'n/no-unsupported-features/es-syntax': 'off',
    'n/no-unsupported-features/node-builtins': 'error',
    'n/prefer-global/buffer': ['warn', 'never'],
    'n/prefer-global/console': ['warn', 'always'],
    'n/prefer-global/process': ['warn', 'never'],
    'n/prefer-promises/dns': 'warn',
    'n/prefer-promises/fs': 'warn'
  }
};
