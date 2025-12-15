# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `@claylevering/eslint-config` - an ESLint plugin that provides shareable configurations in ESLint 9+ flat config format. It supports Node.js, TypeScript, Vue 3, and Nuxt 4 projects with opinionated, battle-tested rules and custom rules specifically for Vue/Pinia development patterns.

## Development Commands

### Linting

```bash
pnpm run lint          # Run ESLint and Prettier checks
pnpm run lint:fix      # Auto-fix all linting and formatting issues
pnpm run eslint        # Run ESLint only
pnpm run eslint:fix    # Auto-fix ESLint issues only
pnpm run prettier      # Check Prettier formatting
pnpm run prettier:fix  # Auto-fix Prettier formatting
pnpm test              # Alias for pnpm run lint
```

### Publishing

```bash
pnpm run publish:github   # Manually publish to npm (use with caution)
```

Note: Publishing is typically automated via GitHub Actions when a version tag is pushed. The workflow runs linting, verifies package contents, and publishes to npm.

## Dependency Management

The package uses a peer dependency model to keep bundle sizes small and avoid forcing users to install unused frameworks:

### Core Dependencies (always installed)

- `@eslint/js` - ESLint's recommended rules
- `globals` - Global variable definitions for different environments

### Peer Dependencies (user installs based on needs)

- `eslint` >= 9.0.0 - **Required** for all users
- `typescript-eslint` >= 8.0.0 - **Optional**, needed for `typescript`, `vue`, and `nuxt` configs
- `eslint-plugin-vue` >= 10.0.0 - **Optional**, needed for `vue` and `nuxt` configs
- `vue-eslint-parser` >= 10.0.0 - **Optional**, needed for `vue` and `nuxt` configs
- `@nuxt/eslint` >= 1.0.0 - **Optional**, needed for `nuxt` config

### Installation Examples

**Node.js only:**

```bash
pnpm add -D @claylevering/eslint-config eslint
```

**TypeScript:**

```bash
pnpm add -D @claylevering/eslint-config eslint typescript-eslint
```

**Vue 3:**

```bash
pnpm add -D @claylevering/eslint-config eslint eslint-plugin-vue vue-eslint-parser typescript-eslint
```

**Nuxt:**

```bash
pnpm add -D @claylevering/eslint-config eslint @nuxt/eslint eslint-plugin-vue vue-eslint-parser typescript-eslint
```

## Architecture

### Plugin Structure

The plugin is structured as an ESLint plugin with multiple preset configurations:

- **Main entry point**: `index.js` exports the plugin object with:
    - `meta`: Plugin metadata (name, namespace)
    - `rules`: Custom ESLint rules
    - `configs`: Preset configurations for different project types

### Configuration Hierarchy

Each configuration builds on others to avoid duplication:

1. **`configs/node.js`**: Base JavaScript/Node.js rules
    - Uses `@eslint/js` recommended rules
    - Applies custom Node.js rules from `configs/rules/node.js`
    - Targets `**/*.js`, `**/*.mjs`, `**/*.cjs` files

2. **`configs/typescript.js`**: TypeScript support
    - Uses TypeScript parser (`@typescript-eslint/parser`) for `.ts/.tsx` files
    - Adds `typescript-eslint` recommended and stylistic configs
    - Includes Node.js rules (from `configs/rules/node.js`) applied with TypeScript parser via `@claxxon-lint/typescript-js` config block
    - Exports `claxxonTsConfig` array for use by other configs (e.g., `vue.js`)
    - Targets `**/*.ts`, `**/*.tsx` files
    - Customizes TypeScript-specific rules (e.g., allows `any`, strict unused vars with `_` prefix)

3. **`configs/vue.js`**: Vue 3 SFC support with hybrid JS/TS
    - Spreads Node.js config for `.js/.mjs/.cjs` files
    - Spreads TypeScript config for standalone `.ts/.tsx` files (composables, utils)
    - Adds `eslint-plugin-vue` recommended rules
    - **Hybrid parser support**: Uses `vue-eslint-parser` with nested parser configuration:
        - `<script>` or `<script setup>` → `espree` (JavaScript)
        - `<script lang="ts">` or `<script setup lang="ts">` → `@typescript-eslint/parser`
        - Template expressions → `espree`
    - Applies custom Vue rules from `configs/rules/vue.js`
    - Registers custom Claxxon rules under `claxxon-vue` namespace
    - Targets `**/*.vue` files
    - Supports both JavaScript and TypeScript Vue components in the same project

4. **`configs/nuxt.js`**: Nuxt-specific config with hybrid JS/TS support
    - **Special consideration**: Extracts Vue plugin rules WITHOUT re-registering the plugin itself
    - This prevents conflicts with Nuxt's own Vue plugin registration in `withNuxt()`
    - **Hybrid parser support**: Includes nested parser configuration for mixed JS/TS Vue components
    - Use with Nuxt's `.prepend()` method when using `withNuxt()`
    - Supports both JavaScript and TypeScript Vue components in the same project

### Custom Rules

Located in `custom-rules/`, these are custom ESLint rules specific to Vue/Pinia patterns:

1. **`pinia-store-top-level.js`**: Enforces Pinia store calls (e.g., `useUserStore()`) only at top-level scope
    - Prevents store initialization in loops, conditionals, or nested functions
    - Tracks scope depth using a stack-based approach
    - Allows stores in: script setup, setup functions, defineStore setup, plugin install, and top-level composable functions

2. **`pinia-store-pattern.js`**: Requires stores to be assigned to variables before property access
    - Disallows: `const userId = useUserStore().id`
    - Requires: `const userStore = useUserStore(); const userId = userStore.id`

3. **`no-switch-statements.js`**: Disallows switch statements to prevent fallthrough bugs

4. **`no-vue-global-imports.js`**: Prevents importing Vue 3 compiler macros that are auto-available in `<script setup>`
    - Disallows importing: `defineProps`, `defineEmits`, `defineExpose`, `withDefaults`

All custom rules are exported from `custom-rules/index.js` and registered under the `claxxon-vue` namespace in Vue configurations.

### Rule Files

- **`configs/rules/node.js`**: Base JavaScript/Node.js rules (indent, no-console, no-shadow, etc.)
- **`configs/rules/vue.js`**: Vue-specific rules (block-order, component-api-style, html-indent, etc.) + enables custom Claxxon rules

## Key Implementation Details

### Hybrid JavaScript/TypeScript Vue Component Support

Vue configurations (`vue.js`, `nuxt.js`) support **mixed JavaScript and TypeScript** Vue components in the same project using `vue-eslint-parser`'s nested parser feature:

```javascript
languageOptions: {
    parser: vueParser,  // Primary parser for .vue files
    parserOptions: {
        parser: {
            // Nested parser mapping based on lang attribute
            js: 'espree',           // For <script> or <script setup>
            ts: tsEslint.parser,    // For <script lang="ts"> or <script setup lang="ts">
            '<template>': 'espree'  // For template expressions
        }
    }
}
```

**How it works:**

- The `vue-eslint-parser` examines the `lang` attribute on `<script>` tags
- JavaScript Vue components (no `lang` or `lang="js"`) use `espree` parser → no TypeScript errors
- TypeScript Vue components (`lang="ts"`) use `@typescript-eslint/parser` → full TypeScript support
- This allows a single config to handle both file types without applying TypeScript rules to JavaScript files

### Nuxt Configuration Pattern

Nuxt requires special handling because it loads `eslint-plugin-vue` internally. The `nuxt.js` config:

1. Extract only the **rules** from the Vue plugin's recommended config (not the plugin itself)
2. Apply these rules without re-registering the Vue plugin
3. Include the same hybrid parser configuration for mixed JS/TS Vue components
4. Are designed to be used with Nuxt's `withNuxt().prepend([...claxxonNuxtConfig])`

This prevents the "plugin already registered" error that would occur if the Vue plugin were loaded twice.

### ESLint Flat Config Format

All configurations use ESLint 9+ flat config format with `defineConfig()` from `eslint/config`. Key patterns:

- Configuration objects have `name`, `files`, `languageOptions`, `rules`, and optional `ignores`
- Configurations are arrays that can be spread: `...claxxonLint.configs['node']`
- Use `globalIgnores()` at the end of config arrays for repository-wide ignores
- `extends` is used within config objects to pull in base rulesets

### Custom Rule Registration

Custom rules are registered with the `claxxon-vue` namespace in Vue configs to avoid collisions:

```javascript
plugins: {
    'claxxon-vue': claxxonCustom
},
rules: {
    'claxxon-vue/pinia-store-pattern': 'error',
    'claxxon-vue/pinia-store-top-level': 'error',
    // ...
}
```

## Testing

The repository has two types of tests:

### Linting (Self-Hosted)

The self-hosted `eslint.config.js` uses its own rules for validation:

- Uses the `vue` config (which supports hybrid JS/TS Vue components)
- Adds `eslint-config-prettier` to disable conflicting Prettier rules
- Ignores `custom-rules/**/*` to avoid linting custom rule implementations
- Relaxes `max-statements` and `max-lines-per-function` for test files

### Unit Tests (Vitest + RuleTester)

Custom rules have comprehensive unit tests in the `tests/` directory using ESLint's RuleTester:

- `tests/no-switch-statements.test.js` - Tests for switch statement detection
- `tests/no-vue-global-imports.test.js` - Tests for Vue compiler macro import detection
- `tests/pinia-store-pattern.test.js` - Tests for store chaining detection (Vue files only)
- `tests/pinia-store-top-level.test.js` - Tests for store scope detection (loops, conditionals, nested functions)

### Test Commands

```bash
pnpm test           # Run lint + unit tests
pnpm test:unit      # Run unit tests only (vitest run)
pnpm test:watch     # Run unit tests in watch mode (vitest)
```

## Publishing Workflow

1. Update version in `package.json`
2. Commit changes
3. Create and push a version tag: `git tag v2.0.x && git push origin v2.0.x`
4. GitHub Actions workflow (`.github/workflows/publish.yaml`) automatically:
    - Runs `pnpm install --frozen-lockfile` to install dependencies
    - Runs `pnpm run lint` to ensure code quality
    - Verifies package contents with `pnpm pack --dry-run`
    - Publishes to npm with public access
    - Creates a GitHub release (with auto-generated release notes)

Alternatively, use `pnpm run publish:github` for manual publishing (requires npm authentication).

## Package Exports

The package exports multiple entry points via `package.json` exports field:

- `.` → `index.js` (main plugin)
- `./configs/node` → `configs/node.js`
- `./configs/typescript` → `configs/typescript.js`
- `./configs/vue` → `configs/vue.js`
- `./configs/nuxt` → `configs/nuxt.js`

Users typically import the main plugin and access configs via `claxxonLint.configs['config-name']`.
