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

    rules: {
        // Customized Vue rules from Claxxon - assuming the Vue plugin is already loaded
        'vue/html-indent': ['error', 4],
        'vue/script-indent': ['error', 4, { baseIndent: 0 }],
        'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
        'vue/multi-word-component-names': 'off',
        'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
        'vue/component-definition-name-casing': ['error', 'PascalCase'],
        'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
        'vue/no-unused-properties': ['error'],

        // Custom Pinia store rules
        'claxxon-vue/pinia-store-pattern': 'error',
        'claxxon-vue/pinia-store-top-level': 'error',

        // Prevent importing Vue globals
        'claxxon-vue/no-vue-global-imports': 'error',

        // Disallow switch statements
        'claxxon-vue/no-switch-statements': 'error'
    },

    ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.git/**']
};

export default defineConfig([vueCoreConfig]);
