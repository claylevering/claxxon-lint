/**
 * Vue ESLint Configuration
 * Individual Vue rules for flat config format
 */

import pluginVue from 'eslint-plugin-vue';

// Get the parser from the flat/recommended config
const vueParser = pluginVue.configs['flat/recommended']
  ?.find(config => config.languageOptions?.parser)?.languageOptions?.parser;

if (!vueParser) {
  throw new Error('Unable to find Vue parser in eslint-plugin-vue. This may be due to an incompatible version of eslint-plugin-vue.');
}

export default {
  name: '@claxxon-lint/vue',
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
  rules: {
    // Custom Vue rules - these can be customized per project
    'vue/multi-word-component-names': 'warn',
    'vue/no-unused-vars': 'error',
    'vue/no-unused-components': 'warn',
    'vue/require-default-prop': 'warn',
    'vue/require-prop-types': 'warn',
    'vue/html-indent': ['warn', 2],
    'vue/max-attributes-per-line': ['warn', {
      singleline: 3,
      multiline: 1
    }],
    'vue/component-name-in-template-casing': ['warn', 'PascalCase', {
      registeredComponentsOnly: false
    }]
  }
};
