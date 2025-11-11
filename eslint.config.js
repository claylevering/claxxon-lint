/**
 * ESLint configuration for the @claylevering/eslint-config repository
 */

import { defineConfig, globalIgnores } from 'eslint/config';

import claxxonLint from './index.js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const claxxonVueConfig = claxxonLint.configs['vue'];

const config = defineConfig([
    ...claxxonVueConfig,

    eslintConfigPrettier, // Prettier goes last to disable conflicting rules

    globalIgnores(['custom-rules/**/*', 'tmp/**'])
]);

export default config;
