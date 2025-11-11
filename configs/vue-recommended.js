/**
 * Vue Recommended ESLint Configuration
 * All recommended Vue rules for flat config format
 */

import pluginVue from 'eslint-plugin-vue';

// Get the parser from the flat/recommended config
const vueParser = pluginVue.configs['flat/recommended']
  .find(config => config.languageOptions?.parser)?.languageOptions.parser;

// Merge all rules from the flat/recommended config array
const mergedRules = pluginVue.configs['flat/recommended']
  .filter(config => config.rules)
  .reduce((acc, config) => ({ ...acc, ...config.rules }), {});

export default {
  name: '@claxxon-lint/vue-recommended',
  files: ['**/*.vue'],
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  plugins: {
    vue: pluginVue
  },
  rules: mergedRules
};
