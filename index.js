/**
 * @claxxon-lint/eslint-config
 * 
 * ESLint flat config with support for Vue, Node, and TypeScript
 */

import vue from './configs/vue.js';
import vueRecommended from './configs/vue-recommended.js';
import vueWithCustom from './configs/vue-with-custom.js';
import node from './configs/node.js';
import nodeRecommended from './configs/node-recommended.js';
import typescript from './configs/typescript.js';
import typescriptRecommended from './configs/typescript-recommended.js';
import customRules from './custom-rules/index.js';

export {
  vue,
  vueRecommended,
  vueWithCustom,
  node,
  nodeRecommended,
  typescript,
  typescriptRecommended,
  customRules
};

export default {
  vue,
  vueRecommended,
  vueWithCustom,
  node,
  nodeRecommended,
  typescript,
  typescriptRecommended,
  customRules
};
