/**
 * Vue Recommended ESLint Configuration
 * All recommended Vue rules for flat config format
 */

import { vueCoreConfig } from './vue-standalone.js';

import { defineConfig } from 'eslint/config';
import vue from 'eslint-plugin-vue';

vueCoreConfig.name = '@claxxon-lint/vue';
vueCoreConfig.plugins.vue = vue;
vueCoreConfig.extends = ['vue/flat/recommended'];

export default defineConfig([vueCoreConfig]);
