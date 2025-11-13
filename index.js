/**
 * @claxxon-lint/eslint-config
 *
 * ESLint flat config with support for Vue, Node, and TypeScript
 */

import vueRecommended from './configs/vue.js';
import nodeRecommended from './configs/node.js';
import typescriptRecommended from './configs/typescript.js';
import vueTsRecommended from './configs/vue-ts.js';
import customRules from './custom-rules/index.js';

const plugin = {
    // preferred location of name and version
    meta: {
        name: 'eslint-plugin-claxxon',
        namespace: 'claxxon'
    },

    rules: customRules.rules,

    configs: {
        vue: vueRecommended,
        node: nodeRecommended,
        typescript: typescriptRecommended,
        'vue-ts': vueTsRecommended
    }
};

export default plugin;
