# @claylevering/claxxon-lint

[![Publish Package to npm](https://github.com/claylevering/claxxon-lint/actions/workflows/publish.yml/badge.svg)](https://github.com/claylevering/claxxon-lint/actions/workflows/publish.yml)

A comprehensive ESLint plugin providing shareable configurations in ESLint flat config format (ESLint 9+) with support for Vue, Node.js, and TypeScript projects. Includes custom rules for Vue/Pinia development patterns.

## Features

- **ESLint 9+ Flat Config Format** - Modern array-based configuration
- **Multiple Presets** - Choose configurations for your stack:
    - Node.js/JavaScript
    - TypeScript
    - Vue 3
    - Vue 3 + TypeScript
    - Nuxt 4
    - Nuxt 4 + TypeScript
- **Custom Rules** - Specialized rules for Vue and Pinia development
- **Opinionated Defaults** - Battle-tested rules for production applications

## Installation

### Base Installation

All projects require the base package and ESLint:

```bash
pnpm add -D @claylevering/eslint-config eslint
```

### Framework-Specific Dependencies

Depending on which configuration you're using, install the appropriate peer dependencies:

#### For Node.js/JavaScript Only

No additional dependencies needed! The base installation is sufficient.

#### For TypeScript Projects

```bash
pnpm add -D typescript-eslint
```

#### For Vue 3 Projects

```bash
pnpm add -D eslint-plugin-vue vue-eslint-parser typescript-eslint
```

**Note:** `typescript-eslint` is required even for pure JavaScript Vue projects to support the hybrid parser that allows mixing JS and TS components.

#### For Nuxt Projects

```bash
pnpm add -D @nuxt/eslint eslint-plugin-vue vue-eslint-parser typescript-eslint
```

## Usage

All examples use the `defineConfig()` helper from the [ESLint package](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file) to create flat config arrays.

### Node.js/JavaScript Projects

Create `eslint.config.js` in your project root:

```javascript
import { defineConfig } from 'eslint/config';
import claxxonLint from '@claylevering/eslint-config';

export default defineConfig([
    ...claxxonLint.configs['node'],

    {
        // Your custom configurations here
    }
]);
```

### TypeScript Projects

```javascript
import { defineConfig } from 'eslint/config';
import claxxonLint from '@claylevering/eslint-config';

export default defineConfig([
    ...claxxonLint.configs['typescript'], // Includes Node config + TypeScript rules

    {
        // Your custom configurations here
    }
]);
```

### Vue 3 Projects

The `vue` config supports hybrid JavaScript and TypeScript Vue components in the same project:

```javascript
import { defineConfig } from 'eslint/config';
import claxxonLint from '@claylevering/eslint-config';

export default defineConfig([
    ...claxxonLint.configs['vue'], // Supports both JS and TS Vue components + standalone .ts files

    {
        // Your custom configurations here
    }
]);
```

## Framework configurations

When you're dealing with specific frameworks (e.g. `Nuxt`) simply spreading the configurations may not always work.

### Nuxt projects

The [eslint Nuxt plugin](https://eslint.nuxt.com/) loads the [eslint-plugin-vue](https://eslint.vuejs.org/)
plugin during their `withNuxt()` method and eslint likes to barf if differing / conflicting plugins exist from
within the same configuration. I suppose you could leverage the `FlatConfigComposer` / etc. from the
[Nuxt plugin itself](https://eslint.nuxt.com/packages/module#config-customizations) but the whole intention of
this particular library is to make this as dead-ass simple as possible for config. So here you go:

#### Nuxt Configuration

```javascript
import claxxonLint from '@claylevering/eslint-config';
import withNuxt from './.nuxt/eslint.config.mjs';

const claxxonNuxtConfig = claxxonLint.configs['nuxt'];

export default withNuxt({
    // Your custom config options / objects
}).prepend([
    /**
     * Prepend the custom Claxxon configurations. This includes Node and Vue
     * configurations but WITHOUT the Vue plugin itself so Nuxt/ESLint don't conflict.
     * Supports both JavaScript and TypeScript Vue components.
     */
    ...claxxonNuxtConfig
]);
```

### Using Custom Rules

All configurations include custom rules automatically. To use individual custom rules:

```javascript
import claxxonLint from '@claylevering/eslint-config';

export default [
    {
        plugins: {
            claxxon: claxxonLint
        },

        rules: {
            'claxxon/pinia-store-top-level': 'error',
            'claxxon/no-switch-statements': 'warn',
            'claxxon/no-vue-global-imports': 'error',
            'claxxon/pinia-store-pattern': 'error'
        }
    }
];
```

### Prettier note

While these rules are already opinionated-AF, I recognize that some folks don't love [Prettier](https://prettier.io/)
and just want some established rules for safety (which is totally fine). That being said - if you wanted to add
the [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier) to your config so that those two
place nicely with each other, just have it be the last thing in your config. Here's how:

#### Vue w/Prettier

```javascript
import claxxonLint from '@claylevering/eslint-config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
    ...claxxonLint.configs['vue'], // For Vue SFC files

    {
        // Your custom configurations here
    },

    eslintConfigPrettier // Prettier goes last to disable conflicting rules
]);
```

#### Nuxt (TS + Prettier)

```javascript
import claxxonLint from '@claylevering/eslint-config';
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const claxxonNuxtTsConfig = claxxonLint.configs['nuxt-ts'];

export default withNuxt({
    // Your custom config options / objects
})
    .prepend([
        /**
         * Prepend the custom Claxxon configurations.  This comes with all of the the `node`,
         * `typescript` and `vue` configurations but WITHOUT the Vue plugin itself so Nuxt and
         * eslint don't barf all over themselves
         */
        ...claxxonNuxtTsConfig
    ])
    .append([
        // Again, making sure it goes last
        eslintConfigPrettier
    ]);
```

## Custom Rule Definitions

### `pinia-store-top-level`

Enforces Pinia store definitions only at top-level scope to prevent stores being created in loops or conditionals.

**Valid:**

```javascript
// Top-level in script setup
const userStore = useUserStore();

// In setup function
export default {
    setup() {
        const userStore = useUserStore();
    }
};
```

**Invalid:**

```javascript
// Inside conditional
if (condition) {
    const userStore = useUserStore(); // ❌ Error
}

// Inside loop
for (let i = 0; i < 10; i++) {
    const store = useMyStore(); // ❌ Error
}
```

### `no-switch-statements`

Disallows switch statements to prevent fallthrough bugs and improve readability.

**Invalid:**

```javascript
switch (
    value // ❌ Error
) {
    case 1:
        return 'one';
    default:
        return 'other';
}
```

**Valid:**

```javascript
if (value === 1) {
    return 'one';
} else {
    return 'other';
}
```

### `no-vue-global-imports`

Prevents importing Vue 3 compiler macros that are automatically available in `<script setup>`. This is a bit of an
extension / insurance policy around the possibility that [`vue/no-import-compiler-macros`](https://eslint.vuejs.org/rules/no-import-compiler-macros)
might not catch everything (for whatever reason)

**Invalid:**

```javascript
import { defineProps, defineEmits } from 'vue'; // ❌ Error
```

**Valid:**

```javascript
// Just use them directly in <script setup>
const props = defineProps({...});
const emit = defineEmits(['update']);
```

### `pinia-store-pattern`

Enforces defining stores as variables before accessing properties.

**Invalid:**

```javascript
const userId = useUserStore().id; // ❌ Error
```

**Valid:**

```javascript
const userStore = useUserStore();
const userId = userStore.id;
```

## Requirements

- **ESLint** 9.0.0 or higher (peer dependency, always required)
- **Node.js** 18 or higher (recommended)
- **Framework-specific packages** (optional peer dependencies):
    - `typescript-eslint` >= 8.0.0 for TypeScript support
    - `eslint-plugin-vue` >= 10.0.0 for Vue support
    - `vue-eslint-parser` >= 10.0.0 for Vue support
    - `@nuxt/eslint` >= 1.0.0 for Nuxt support

Install only the packages you need for your project type (see Installation section above).

## License

MIT © Clay Levering

## Repository

[https://github.com/claylevering/claxxon-lint](https://github.com/claylevering/claxxon-lint)
