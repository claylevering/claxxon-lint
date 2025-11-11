/**
 * Node Recommended ESLint Configuration
 * All recommended Node rules for flat config format
 */

import pluginN from 'eslint-plugin-n';

export default {
  name: '@claxxon-lint/node-recommended',
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
    // All recommended Node rules from eslint-plugin-n
    ...pluginN.configs['flat/recommended-module'].rules
  }
};
