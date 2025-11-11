/**
 * Vue Recommended ESLint Configuration
 * All recommended Vue rules for flat config format (without the Vue plugin registration)
 *
 * This is most helpful for use within Nuxt and the `withNuxt` bits.
 */

import globals from 'globals';

import { defineConfig } from 'eslint/config';

import pluginVue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import js from '@eslint/js';
import tsEslint from 'typescript-eslint';

import claxxonNodeConfig from './node.js';
import rootNodeRules from './rules/node.js';
import rootVueRules from './rules/vue.js';
import claxxonCustom from '../custom-rules/index.js';

const recommendedVueConfig = pluginVue.configs['flat/recommended'];

/**
 * When we're in the context of Nuxt, we want all of the recommended rules from the Vue plugin.
 *
 * However, because Nuxt itself is loading the Vue plugin and their plugin conflicts with the
 * plugin that we normally use within the other Vue configs in this project we need to grab the
 * rule definitions ONLY from the Vue plugin and NOT the Vue plugin itself.
 */
const vueRules = recommendedVueConfig.filter((ruleset) => ruleset.name.includes('rules')).reduce((acc, ruleset) => Object.assign(acc, ruleset.rules), {});

export default defineConfig([
    // Apply Claxxon Node recommended configuration
    ...claxxonNodeConfig,

    // Then load the Claxxon Vue configuration with hybrid JS/TS support
    {
        name: '@claxxon-lint/nuxt',
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
                // Thanks, Nuxt, for having server-side!
                ...globals['shared-node-browser']
            }
        },

        plugins: {
            js,
            'claxxon-vue': claxxonCustom
        },

        extends: [js.configs.recommended],

        rules: {
            // Enable base ESLint rules for JS files
            ...rootNodeRules,

            // Load dem rules, boi
            ...vueRules,

            // Load the standard Vue ruleset for this config
            ...rootVueRules,

            // Enable custom Claxxon rules
            ...Object.fromEntries(Object.keys(claxxonCustom.rules).map((ruleName) => [`claxxon-vue/${ruleName}`, 'error']))
        },

        ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.git/**']
    }
]);
