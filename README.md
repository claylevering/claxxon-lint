# @claxxon-lint/eslint-config

A comprehensive ESLint plugin providing shareable configurations in ESLint flat config format (ESLint 9+) with support for Vue, Node.js, and TypeScript projects. Includes custom rules for Vue/Pinia development patterns.

## Features

- **ESLint 9+ Flat Config Format** - Modern array-based configuration
- **Multiple Presets** - Choose configurations for your stack:
  - Node.js/JavaScript
  - TypeScript
  - Vue 3
  - Vue 3 + TypeScript
- **Custom Rules** - Specialized rules for Vue and Pinia development
- **Opinionated Defaults** - Battle-tested rules for production applications

## Installation

### From GitHub Packages

1. Create or update `.npmrc` in your project root:

```
@claxxon-lint:registry=https://npm.pkg.github.com
```

2. Install the package:

```bash
npm install --save-dev @claxxon-lint/eslint-config eslint
```

**Note:** You'll need a GitHub Personal Access Token with `read:packages` permission. Set it in your environment or `.npmrc`:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

## Usage

### Basic Setup

Create `eslint.config.js` in your project root:

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
    ...claxxonLint.configs.node,  // For Node.js/JavaScript projects
];
```

### TypeScript Projects

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
    ...claxxonLint.configs.typescript,  // Includes Node config + TypeScript rules
];
```

### Vue 3 Projects

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
    ...claxxonLint.configs.vue,  // For Vue SFC files
];
```

### Vue 3 + TypeScript Projects

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
    ...claxxonLint.configs['vue-ts'],  // Combines Vue + TypeScript configs
];
```

### Mixed Projects

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
    ...claxxonLint.configs.node,       // For .js files
    ...claxxonLint.configs.typescript, // For .ts files
    ...claxxonLint.configs.vue,        // For .vue files
];
```

### Using Custom Rules

All configurations include custom rules automatically. To use individual custom rules:

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
    {
        plugins: {
            claxxon: claxxonLint
        },
        rules: {
            'claxxon/pinia-store-top-level': 'error',
            'claxxon/no-switch-statements': 'warn',
            'claxxon/no-vue-global-imports': 'error',
            'claxxon/pinia-store-pattern': 'error',
        }
    }
];
```

## Custom Rules

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
}
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
switch (value) {  // ❌ Error
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

Prevents importing Vue 3 compiler macros that are automatically available in `<script setup>`.

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

## Configuration Details

### Node/JavaScript Config
- 4-space indentation
- Disallows `console` and `debugger` in production
- Disallows `++` and `--` operators
- Enforces `const` where possible

### TypeScript Config
- Extends Node config
- Allows `any` type (configurable)
- Enhanced unused variable detection
- TypeScript-ESLint recommended rules

### Vue Config
- 4-space HTML and script indentation
- Block order: script, template, style
- PascalCase component names
- Disables multi-word component name requirement

### Vue + TypeScript Config
- Combines both TypeScript and Vue configurations
- Applies TypeScript rules to `.ts` and `.vue` files

## Package Scripts

```bash
npm run lint          # Run ESLint and Prettier checks
npm run lint:fix      # Auto-fix all issues
npm run eslint        # Run ESLint only
npm run eslint:fix    # Auto-fix ESLint issues only
```

## Requirements

- ESLint 9.0.0 or higher
- Node.js 18 or higher (recommended)

## License

MIT © Clay Levering

## Repository

[https://github.com/claylevering/claxxon-lint](https://github.com/claylevering/claxxon-lint)
