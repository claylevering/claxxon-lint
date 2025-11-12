/**
 * ESLint configuration for the @claxxon-lint/eslint-config repository
 */

import nodeConfig from './configs/node.js';
import vueWithCustom from './configs/vue-with-custom.js';

export default [
  // Apply Node configuration to JavaScript files (with adjustments)
  {
    ...nodeConfig,
    rules: {
      ...nodeConfig.rules,
      // Disable node version checks for test files since they use newer Node features
      'n/no-unsupported-features/node-builtins': 'off'
    }
  },
  
  // Apply Vue configuration with custom rules to Vue files
  vueWithCustom,
  
  // Ignore patterns
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'coverage/**',
      '.git/**'
    ]
  }
];
