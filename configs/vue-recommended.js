/**
 * Vue Recommended ESLint Configuration
 * All recommended Vue rules for flat config format
 */

import pluginVue from 'eslint-plugin-vue';

// Get the parser from the flat/recommended config
const vueParser = pluginVue.configs['flat/recommended']
  ?.find(config => config.languageOptions?.parser)?.languageOptions?.parser;

if (!vueParser) {
  throw new Error('Unable to find Vue parser in eslint-plugin-vue. This may be due to an incompatible version of eslint-plugin-vue.');
}

// Merge all rules from the flat/recommended config array
// Ensure we have a valid array before filtering and reducing
const flatRecommended = pluginVue.configs['flat/recommended'];
if (!Array.isArray(flatRecommended)) {
  throw new Error('Expected eslint-plugin-vue flat/recommended to be an array. This may be due to an incompatible version of eslint-plugin-vue.');
}

const mergedRules = flatRecommended
  .filter(config => config && config.rules && typeof config.rules === 'object')
  .reduce((acc, config) => ({ ...acc, ...config.rules }), {});

if (Object.keys(mergedRules).length === 0) {
  console.warn('Warning: No rules found in eslint-plugin-vue flat/recommended config.');
}

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
