/**
 * ESLint configuration for the @claylevering/eslint-config repository
 */

import { defineConfig } from 'eslint/config';

import claxxonLint from './index.js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const claxxonNodeConfig = claxxonLint.configs['node'];
const claxxonVueConfig = claxxonLint.configs['vue'];
const claxxonVueTsConfig = claxxonLint.configs['vue-ts'];
const claxxonTsRecommendedConfig = claxxonLint.configs['typescript'];

const config = defineConfig([
    // Apply Claxxon JavaScript / Node configuration to JS files
    ...claxxonNodeConfig,

    // Apply Claxxon Vue TypeScript configuration
    ...claxxonVueConfig,

    // Apply Claxxon Vue TypeScript configuration
    ...claxxonVueTsConfig,

    // Apply Claxxon TypeScript recommended configuration
    ...claxxonTsRecommendedConfig,

    eslintConfigPrettier // Prettier goes last to disable conflicting rules
]);

export default config;
