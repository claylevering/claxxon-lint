/**
 * TypeScript Recommended ESLint Configuration
 * All recommended TypeScript rules for flat config format
 */

import globals from 'globals';

import { defineConfig, globalIgnores } from 'eslint/config';
import js from '@eslint/js';

import tsEslint from 'typescript-eslint';

import rootNodeRules from './rules/node.js';

/**
 * Exported TypeScript configuration array for use by other configs (e.g., vue.js)
 * Includes Node.js rules + TypeScript rules for .ts/.tsx files
 */
export const claxxonTsConfig = [
    // Register Typescript rules from typescript-eslint
    ...tsEslint.configs['recommended'],
    ...tsEslint.configs['stylistic'],

    /**
     * Apply JS/Node rules to TypeScript files using the TypeScript parser.
     * This ensures that Node.js rules (no-console, no-shadow, etc.) also
     * apply to .ts/.tsx files.
     */
    {
        name: '@claxxon-lint/typescript-js',
        files: ['**/*.ts', '**/*.tsx'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsEslint.parser,
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },

        plugins: {
            js
        },

        extends: [js.configs.recommended],

        rules: {
            ...rootNodeRules
        }
    },

    // Apply Claxxon TypeScript-specific configuration
    {
        name: '@claxxon-lint/typescript',
        files: ['**/*.ts', '**/*.tsx'],

        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsEslint.parser,
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },

        rules: {
            // Customized TypeScript rules from Claxxon
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    varsIgnorePattern: '^_',
                    argsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                    destructuredArrayIgnorePattern: '^_',
                    ignoreRestSiblings: true
                }
            ]
        }
    }
];

const tsConfig = defineConfig([...claxxonTsConfig, globalIgnores(['node_modules/**', 'dist/**', 'coverage/**', '.git/**'])]);

export default tsConfig;
