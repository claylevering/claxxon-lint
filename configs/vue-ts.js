import globals from 'globals';

import { defineConfig } from 'eslint/config';
import tsEslint from 'typescript-eslint';

import claxxonVueRecommended from './vue.js';
import claxxonTsRecommended from './typescript.js';

const tsConfig = defineConfig([
    // Apply Claxxon TS configuration
    ...claxxonTsRecommended,

    // Apply Claxxon Vue configuration
    ...claxxonVueRecommended,

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

export default tsConfig;
