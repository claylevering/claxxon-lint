/**
 * @claylevering/eslint-config
 *
 * ESLint flat config with support for Vue, Node, and TypeScript
 */

import vueConfig from './configs/vue.js';
import vueStandaloneConfig from './configs/vue-standalone.js';
import vueTsConfig from './configs/vue-ts.js';
import vueTsStandaloneConfig from './configs/vue-ts-standalone.js';

import nodeConfig from './configs/node.js';
import typescriptConfig from './configs/typescript.js';
import claxxonRules from './custom-rules/index.js';

const plugin = {
    // preferred location of name and version
    meta: {
        name: 'eslint-plugin-claxxon',
        namespace: 'claxxon'
    },

    rules: claxxonRules.rules,

    configs: {
        vue: vueConfig,
        'vue-standalone': vueStandaloneConfig,
        node: nodeConfig,
        typescript: typescriptConfig,
        'vue-ts': vueTsConfig,
        'vue-ts-standalone': vueTsStandaloneConfig
    }
};

export default plugin;
