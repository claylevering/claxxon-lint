/**
 * TypeScript ESLint Configuration
 * Individual TypeScript rules for flat config format
 */

import pluginTs from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';

export default {
  name: '@claxxon-lint/typescript',
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
    // Custom TypeScript rules - these can be customized per project
    '@typescript-eslint/no-unused-vars': ['error', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_'
    }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/consistent-type-imports': ['warn', {
      prefer: 'type-imports'
    }]
  }
};
