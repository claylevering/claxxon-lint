# @claylevering/claxxon-lint

[![Publish Package to npm](https://github.com/claylevering/claxxon-lint/actions/workflows/publish.yaml/badge.svg)](https://github.com/claylevering/claxxon-lint/actions/workflows/publish.yaml)

A comprehensive ESLint plugin providing shareable configurations in ESLint flat config format (ESLint 9+) with support for Vue, Node.js, and TypeScript projects. Includes custom rules for Vue/Pinia development patterns.

## TOC

- [@claylevering/claxxon-lint](#clayleveringclaxxon-lint)
  - [TOC](#toc)
  - [Features](#features)
  - [Installation](#installation)
    - [Base Installation](#base-installation)
    - [Framework-Specific Dependencies](#framework-specific-dependencies)
      - [For Node.js/JavaScript Only](#for-nodejsjavascript-only)
      - [For TypeScript Projects](#for-typescript-projects)
      - [For Vue 3 Projects](#for-vue-3-projects)
      - [For Nuxt Projects](#for-nuxt-projects)
  - [Usage](#usage)
    - [Node.js/JavaScript Projects](#nodejsjavascript-projects)
    - [TypeScript Projects](#typescript-projects)
    - [Vue 3 Projects](#vue-3-projects)
  - [Framework configurations](#framework-configurations)
    - [Nuxt projects](#nuxt-projects)
      - [Nuxt Configuration](#nuxt-configuration)
    - [Using Custom Rules](#using-custom-rules)
    - [Prettier note](#prettier-note)
      - [Vue w/Prettier](#vue-wprettier)
      - [Nuxt + Prettier](#nuxt--prettier)
  - [Custom Rule Definitions](#custom-rule-definitions)
    - [`pinia-store-top-level`](#pinia-store-top-level)
    - [`no-switch-statements`](#no-switch-statements)
    - [`no-vue-global-imports`](#no-vue-global-imports)
    - [`pinia-store-pattern`](#pinia-store-pattern)
  - [Built-in Rule Configurations](#built-in-rule-configurations)
    - [`padding-line-between-statements` (warn, auto-fixable)](#padding-line-between-statements-warn-auto-fixable)
  - [Requirements](#requirements)
  - [License](#license)
  - [Repository](#repository)

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

#### Nuxt + Prettier

```javascript
import claxxonLint from '@claylevering/eslint-config';
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

const claxxonNuxtConfig = claxxonLint.configs['nuxt'];

export default withNuxt({
    // Your custom config options / objects
})
    .prepend([
        /**
         * Prepend the custom Claxxon configurations. This includes Node and Vue
         * configurations but WITHOUT the Vue plugin itself so Nuxt/ESLint don't conflict.
         * Supports both JavaScript and TypeScript Vue components.
         */
        ...claxxonNuxtConfig
    ])
    .append([
        // Prettier goes last to disable conflicting rules
        eslintConfigPrettier
    ]);
```

## Custom Rule Definitions

### `pinia-store-top-level`

Enforces Pinia store definitions only at top-level scope to prevent stores being created in loops or conditionals.

**Valid:**

```javascript
// Top-level in script setup
const myPiniaStore = useMyPiniaStore();

// In setup function
export default {
    setup() {
        const myPiniaStore = useMyPiniaStore();
    }
};
```

**Invalid:**

```javascript
// Inside conditional
if (condition) {
    const myPiniaStore = useMyPiniaStore(); // ❌ Error
}

// Inside loop
for (let i = 0; i < 10; i += 1) {
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

Prevents importing Vue 3 compiler macros (`defineProps`, `defineEmits`, `defineExpose`, `defineOptions`, `defineSlots`, `defineModel`, `withDefaults`) that are automatically available in `<script setup>`. This is a complementary rule to [`vue/no-import-compiler-macros`](https://eslint.vuejs.org/rules/no-import-compiler-macros).

Note: `defineComponent` and `defineAsyncComponent` are **not** flagged as they are runtime functions that must be imported.

**Invalid:**

```javascript
import { defineProps, defineEmits } from 'vue'; // ❌ Error
```

**Valid:**

```javascript
// Compiler macros: just use them directly in <script setup>
const props = defineProps({...});
const emit = defineEmits(['update']);

// Runtime functions: these must be imported
import { defineComponent, defineAsyncComponent } from 'vue'; // ✅ OK
```

### `pinia-store-pattern`

Enforces defining stores as variables before accessing properties.

**Invalid:**

```javascript
const userId = useMyPiniaStore().id; // ❌ Error
```

**Valid:**

```javascript
const myPiniaStore = useMyPiniaStore();
const userId = userStore.id;
```

## Built-in Rule Configurations

### `padding-line-between-statements` (warn, auto-fixable)

Requires blank lines around block statements (if, for, while, switch, try) for improved readability. This prevents code from being too compressed and makes control flow easier to scan.

**Before (triggers warning):**

```javascript
const onClickEvent = () => {
    if (!myMovieRef.value) {
        return;
    }
    if (myMovieRef.value?.title_id) {
        const title = myMovieRef.value?.title;
        if (title) {
            modalStore.openModal({ ... });
        }
    }
};
```

**After (auto-fixed):**

```javascript
const onClickEvent = () => {
    if (!myMovieRef.value) {
        return;
    }

    if (myMovieRef.value?.title_id) {
        const title = myMovieRef.value?.title;

        if (title) {
            modalStore.openModal({ ... });
        }
    }
};
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
