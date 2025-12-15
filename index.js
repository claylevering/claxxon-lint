/**
 * @claylevering/eslint-config
 *
 * ESLint flat config with support for Vue, Node, and TypeScript
 */

import nodeConfig from './configs/node.js';
import typescriptConfig from './configs/typescript.js';
import vueConfig from './configs/vue.js';
import nuxtConfig from './configs/nuxt.js';

import claxxonRules from './custom-rules/index.js';

const plugin = {
    // Preferred location of name and version
    meta: {
        name: 'eslint-plugin-claxxon',
        namespace: 'claxxon'
    },

    rules: claxxonRules.rules,

    configs: {
        node: nodeConfig,
        typescript: typescriptConfig,
        vue: vueConfig,
        nuxt: nuxtConfig
    }
};

export default plugin;
