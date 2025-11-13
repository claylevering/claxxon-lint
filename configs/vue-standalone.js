/**
 * Vue Recommended ESLint Configuration
 * All recommended Vue rules for flat config format (without the Vue plugin registration)
 *
 * This is most helpful for use within Nuxt and the `withNuxt` bits.
 */

import { defineConfig } from 'eslint/config';

import claxxonCustom from '../custom-rules/index.js';
import vueRules from './vue-rules.js';

const vueStandaloneConfig = {
    name: '@claxxon-lint/vue-standalone',
    files: ['**/*.vue'],

    plugins: {
        'claxxon-vue': claxxonCustom
    },

    rules: vueRules,

    ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.git/**']
};

export default defineConfig([vueStandaloneConfig]);
