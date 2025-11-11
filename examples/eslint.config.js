/**
 * Example ESLint flat config using @claxxon-lint/eslint-config
 * 
 * This example demonstrates different ways to use the library.
 * Uncomment the approach you want to use.
 */

// Approach 1: Import default and use specific configs
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
  claxxonLint.vueRecommended,
  claxxonLint.nodeRecommended,
  claxxonLint.typescriptRecommended
];

// Approach 2: Import named exports
// import { vueRecommended, nodeRecommended, typescriptRecommended } from '@claxxon-lint/eslint-config';
// 
// export default [
//   vueRecommended,
//   nodeRecommended,
//   typescriptRecommended
// ];

// Approach 3: Import individual configs from their paths
// import vueConfig from '@claxxon-lint/eslint-config/vue';
// import nodeConfig from '@claxxon-lint/eslint-config/node';
// import tsConfig from '@claxxon-lint/eslint-config/typescript';
// 
// export default [
//   vueConfig,
//   nodeConfig,
//   tsConfig
// ];

// Approach 4: Mix individual and recommended configs
// import { vue, nodeRecommended, typescriptRecommended } from '@claxxon-lint/eslint-config';
// 
// export default [
//   vue,                     // Custom Vue rules
//   nodeRecommended,         // All recommended Node rules
//   typescriptRecommended    // All recommended TypeScript rules
// ];

// Approach 5: Customize rules after applying recommended configs
// import { vueRecommended } from '@claxxon-lint/eslint-config';
// 
// export default [
//   vueRecommended,
//   {
//     // Override or add custom rules
//     rules: {
//       'vue/multi-word-component-names': 'off',
//       'vue/html-indent': ['error', 4]
//     }
//   }
// ];
