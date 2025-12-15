import globals from 'globals';

import { defineConfig, globalIgnores } from 'eslint/config';
import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';

import claxxonNodeConfig from './node.js';
import { claxxonTsConfig } from './typescript.js';
import rootNodeRules from './rules/node.js';
import rootVueRules from './rules/vue.js';
import rootTypescriptRules from './rules/typescript.js';
import claxxonCustom from '../custom-rules/index.js';

const recommendedVueConfig = pluginVue.configs['flat/recommended'];

export const claxxonVueConfig = {
    name: '@claxxon-lint/vue',
    files: ['**/*.vue'],

    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: vueParser,
        parserOptions: {
            parser: {
                // Script parser for <script> or <script setup> (plain JavaScript)
                js: 'espree',

                // Script parser for <script lang="ts"> or <script setup lang="ts">
                ts: tsEslint.parser,

                // Script parser for template expressions
                '<template>': 'espree'
            }
        },
        globals: {
            ...globals.browser
        }
    },

    plugins: {
        '@typescript-eslint': tsEslint.plugin,
        'claxxon-vue': claxxonCustom
    },

    extends: [js.configs.all],

    rules: {
        // Load the root node rules
        ...rootNodeRules,

        // Load the root typescript rules
        ...rootTypescriptRules,

        // Load the root vue rules
        ...rootVueRules,

        // Load the custom claxxon rules
        ...Object.fromEntries(Object.keys(claxxonCustom.rules).map((ruleName) => [`claxxon-vue/${ruleName}`, 'error']))
    }
};

const definedVueConfig = defineConfig([
    // Load the rules that apply to .js / .mjs / .cjs files
    ...claxxonNodeConfig,

    // Load TypeScript config for standalone .ts/.tsx files (composables, utilities, etc.)
    ...claxxonTsConfig,

    // Always load the Vue recommended config first
    ...recommendedVueConfig,

    // Then load the Claxxon Vue configuration (includes hybrid JS/TS support for .vue files)
    claxxonVueConfig,

    globalIgnores(['node_modules/**', 'dist/**', 'coverage/**', '.git/**'])
]);

export default definedVueConfig;
