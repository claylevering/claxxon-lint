# Example ESLint Flat Config Usage
# This file demonstrates how to use @claxxon-lint/eslint-config

## Installation

```bash
npm install --save-dev @claxxon-lint/eslint-config eslint
```

## Basic Usage

Create an `eslint.config.js` file in your project root:

### Using Individual Rule Sets

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
  claxxonLint.vue,
  claxxonLint.node,
  claxxonLint.typescript
];
```

### Using Recommended Packages

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
  claxxonLint.vueRecommended,
  claxxonLint.nodeRecommended,
  claxxonLint.typescriptRecommended
];
```

### Using Named Imports

```javascript
import { 
  vueRecommended, 
  nodeRecommended, 
  typescriptRecommended 
} from '@claxxon-lint/eslint-config';

export default [
  vueRecommended,
  nodeRecommended,
  typescriptRecommended
];
```

### Using Individual Configs

```javascript
import vueConfig from '@claxxon-lint/eslint-config/vue';
import nodeConfig from '@claxxon-lint/eslint-config/node';
import tsConfig from '@claxxon-lint/eslint-config/typescript';

export default [
  vueConfig,
  nodeConfig,
  tsConfig
];
```

### Mixing Individual and Recommended Configs

```javascript
import { vue, nodeRecommended, typescriptRecommended } from '@claxxon-lint/eslint-config';

export default [
  vue,                     // Custom Vue rules
  nodeRecommended,         // All recommended Node rules
  typescriptRecommended    // All recommended TypeScript rules
];
```

## Available Configurations

- **vue**: Custom Vue rules
- **vue-recommended**: All recommended Vue rules from eslint-plugin-vue
- **node**: Custom Node rules
- **node-recommended**: All recommended Node rules from eslint-plugin-n
- **typescript**: Custom TypeScript rules
- **typescript-recommended**: All recommended TypeScript rules from @typescript-eslint
- **vue-with-custom**: Vue rules with custom claxxon-lint rules
- **custom-rules**: Custom ESLint rules plugin

## Using Custom Rules

The `vue-with-custom` configuration includes custom claxxon-lint rules:

```javascript
import { vueWithCustom } from '@claxxon-lint/eslint-config';

export default [
  vueWithCustom
];
```

Or use custom rules in your own configuration:

```javascript
import { customRules } from '@claxxon-lint/eslint-config';

export default [
  {
    files: ['**/*.vue'],
    plugins: {
      'claxxon-lint': customRules
    },
    rules: {
      'claxxon-lint/vue-component-name-the': 'warn'
    }
  }
];
```

### Available Custom Rules

- **claxxon-lint/vue-component-name-the**: Requires all Vue component names to contain the word "The"

## Customizing Rules

You can override or extend any rules:

```javascript
import { vueRecommended } from '@claxxon-lint/eslint-config';

export default [
  vueRecommended,
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/html-indent': ['error', 4]
    }
  }
];
```

## File Patterns

Each configuration automatically applies to the appropriate file types:

- **Vue configs**: `**/*.vue`
- **Node configs**: `**/*.js`, `**/*.mjs`, `**/*.cjs`
- **TypeScript configs**: `**/*.ts`, `**/*.tsx`
