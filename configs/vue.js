/**
 * Vue Recommended ESLint Configuration
 * All recommended Vue rules for flat config format (without the Vue plugin registration)
 *
 * This is most helpful for use within Nuxt and the `withNuxt` bits.
 */

import globals from 'globals';

import { defineConfig } from 'eslint/config';

import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

import vueRules from './vue-rules.js';
import claxxonCustom from '../custom-rules/index.js';

const vueCoreConfig = {
    name: '@claxxon-lint/vue',
    files: ['**/*.vue'],

    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: {
            ...globals.browser
        },

        parserOptions: {
            parser: vueParser
        }
    },

    plugins: {
        vue,
        'claxxon-vue': claxxonCustom
    },

    extends: ['vue/flat/recommended'],

    rules: vueRules,

    ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.git/**']
};

export default defineConfig(vueCoreConfig);
