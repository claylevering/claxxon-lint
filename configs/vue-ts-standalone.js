import globals from 'globals';

import { defineConfig } from 'eslint/config';
import tsEslint from 'typescript-eslint';

import claxxonVueStandalone from './vue-standalone.js';
import claxxonTsConfig from './typescript.js';

const vueStandaloneConfig = defineConfig([
    // Apply Claxxon TS configuration
    ...claxxonTsConfig,

    // Apply Claxxon Vue configuration
    ...claxxonVueStandalone,

    {
        name: '@claxxon-lint/vue-typescript',
        files: ['**/*.ts', '**/*.vue'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser
            },

            parserOptions: {
                parser: tsEslint.parser
            }
        },

        rules: {
            // Customized Vue (w/TypeScript) rules from Claxxon
        },

        ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.git/**']
    }
]);

export default vueStandaloneConfig;
