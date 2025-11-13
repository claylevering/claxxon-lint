/**
 * TypeScript Recommended ESLint Configuration
 * All recommended TypeScript rules for flat config format
 */

import globals from 'globals';

import { defineConfig } from 'eslint/config';
import tsEslint from 'typescript-eslint';

import claxxonNodeRecConfig from './node.js';

const tsConfig = defineConfig([
    // Apply Claxxon Node recommended configuration
    ...claxxonNodeRecConfig,

    // Apply Claxxon TypeScript configuration
    {
        name: '@claxxon-lint/typescript',
        files: ['**/*.ts', '**/*.tsx'],

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

        plugins: {
            'typescript-eslint': tsEslint
        },

        extends: [
            'typescript-eslint/recommended', // Apply TypeScript strict configuration
            'typescript-eslint/stylistic' // Apply TypeScript stylistic configuration
        ],

        rules: {
            // Customized TypeScript rules from Claxxon
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    caughtErrors: 'all',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }
            ]
        },

        ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.git/**']
    }
]);

export default tsConfig;
