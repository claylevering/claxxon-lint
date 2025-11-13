/**
 * Vue Recommended ESLint Configuration
 * All recommended Vue rules for flat config format
 */

import globals from 'globals';

import { defineConfig } from 'eslint/config';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

import claxxonLint from '../custom-rules/index.js';

export default defineConfig([
    {
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
            claxxonLint
        },

        extends: ['vue/flat/recommended'],

        rules: {
            // Customized Vue rules from Claxxon
            'vue/html-indent': ['error', 4],
            'vue/script-indent': ['error', 4, { baseIndent: 0 }],
            'vue/block-order': ['error', { order: ['script', 'template', 'style'] }],
            'vue/multi-word-component-names': 'off',
            'vue/component-name-in-template-casing': ['error', 'PascalCase', { registeredComponentsOnly: false }],
            'vue/component-definition-name-casing': ['error', 'PascalCase'],
            'vue/no-unused-vars': ['error', { ignorePattern: '^_' }],
            'vue/no-unused-properties': ['error']
        },

        ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.git/**']
    }
]);
