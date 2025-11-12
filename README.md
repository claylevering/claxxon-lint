# @claxxon-lint/eslint-config

A set of linting rules I like and can't find elsewhere, with support for ESLint flat config format.

## Features

- 🚀 **ESLint Flat Config Support** - Built for the modern ESLint configuration format
- 🎨 **Vue Support** - Individual and recommended rule packages for Vue.js
- 📦 **Node Support** - Individual and recommended rule packages for Node.js
- 🔷 **TypeScript Support** - Individual and recommended rule packages for TypeScript
- 🔧 **Flexible** - Use individual rules or complete recommended packages
- 🎯 **Modular** - Import only what you need

## Installation

This package is published to GitHub Packages. To install it, you need to configure npm to use GitHub Packages for the `@claxxon-lint` scope.

### Step 1: Configure npm

Create or update your `.npmrc` file in your project root:

```
@claxxon-lint:registry=https://npm.pkg.github.com
```

### Step 2: Authenticate with GitHub Packages

You'll need a GitHub Personal Access Token with `read:packages` permission. Set it in your `.npmrc`:

```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

Or set it as an environment variable:

```bash
export NODE_AUTH_TOKEN=YOUR_GITHUB_TOKEN
```

### Step 3: Install the package

```bash
npm install --save-dev @claxxon-lint/eslint-config eslint
```

## Quick Start

Create an `eslint.config.js` file in your project root:

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
  claxxonLint.vueRecommended,
  claxxonLint.nodeRecommended,
  claxxonLint.typescriptRecommended
];
```

## Available Configurations

| Config | Description |
|--------|-------------|
| `vue` | Custom Vue rules for flexible configuration |
| `vue-recommended` | All recommended Vue rules from eslint-plugin-vue |
| `node` | Custom Node rules for flexible configuration |
| `node-recommended` | All recommended Node rules from eslint-plugin-n |
| `typescript` | Custom TypeScript rules for flexible configuration |
| `typescript-recommended` | All recommended TypeScript rules from @typescript-eslint |

## Usage

See [USAGE.md](./USAGE.md) for detailed usage examples and configuration options.

## License

MIT
