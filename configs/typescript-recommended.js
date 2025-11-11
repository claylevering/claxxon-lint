/**
 * TypeScript Recommended ESLint Configuration
 * All recommended TypeScript rules for flat config format
 */

import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

export default {
  name: '@claxxon-lint/typescript-recommended',
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: parserTs,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  plugins: {
    '@typescript-eslint': pluginTs
  },
  rules: {
    // All recommended TypeScript rules
    ...pluginTs.configs['recommended'].rules
  }
};
