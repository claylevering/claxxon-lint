/**
 * JavaScript Recommended ESLint Configuration
 * ESLint's strongly recommended ruleset
 */

import globals from 'globals';

import { defineConfig } from 'eslint/config';
import js from '@eslint/js';

import nodeRules from './rules/node.js';

const nodeConfig = defineConfig({
    name: '@claxxon-lint/node',
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],

    languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',

        globals: {
            ...globals.node
        }
    },

    extends: [js.configs.all],

    rules: {
        ...nodeRules
    },

    ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.git/**']
});

export default nodeConfig;
