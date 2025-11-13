# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**@claylevering/eslint-config** is an ESLint plugin that provides shareable ESLint configurations in flat config format (ESLint 9+). It supports Vue, Node.js, and TypeScript projects with custom rules for Vue/Pinia development patterns.

## Development Commands

### Linting

```bash
npm run lint              # Run ESLint and Prettier checks
npm run lint:fix          # Auto-fix ESLint and Prettier issues
npm run eslint            # Run ESLint only
npm run eslint:fix        # Auto-fix ESLint issues only
npm run prettier          # Check Prettier formatting
npm run prettier:fix      # Auto-fix Prettier formatting
```

### Publishing

```bash
npm run publish:github    # Publish to GitHub Packages
```

Note: Publishing is automated via GitHub Actions workflow (`.github/workflows/publish.yml`) on releases.

## Architecture

### Entry Point (`index.js`)

The main export defines a plugin object with four configuration presets and custom rules:

- `configs.node` - JavaScript/Node.js rules
- `configs.typescript` - TypeScript rules (extends node config)
- `configs.vue` - Vue SFC rules
- `configs['vue-ts']` - Vue + TypeScript (combines both)

All configs use ESLint's flat config format (array-based).

### Configuration Layering Strategy

Configs extend each other to avoid duplication:

- **Node** → Base JavaScript/Node.js rules
- **TypeScript** → Imports Node config + adds TypeScript-specific rules
- **Vue** → Standalone Vue rules for SFCs
- **Vue-TS** → Combines TypeScript + Vue configs

Users apply configs by spreading them: `...claxxonLint.configs.vue`

### Custom Rules (`/custom-rules/`)

Four custom ESLint rules for Vue/Pinia patterns:

1. **pinia-store-top-level** - Enforces Pinia stores only at top-level scope (prevents stores in loops/conditionals)
2. **no-switch-statements** - Disallows switch statements
3. **no-vue-global-imports** - Prevents importing Vue 3 auto-globals (defineProps, defineEmits, etc.)
4. **pinia-store-pattern** - Enforces assigning stores to variables before property access

All custom rules use AST traversal with scope tracking for validation.

### File Organization

```
configs/          # Four configuration presets
custom-rules/     # Custom ESLint rules + index.js export
index.js          # Main plugin entry point
eslint.config.js  # Self-linting configuration
```

## Key Implementation Details

### Flat Config Format

All configs return arrays from `defineConfig()`:

```javascript
defineConfig([
    {
        name: '@claxxon-lint/xxx',
        files: ['pattern'],
        languageOptions: {
            /* parser, globals */
        },
        plugins: {
            /* plugins */
        },
        rules: {
            /* customizations */
        },
        ignores: ['node_modules/**', 'dist/**']
    }
]);
```

### Parser Configuration

- **Node/TypeScript**: Default ESLint parser / `typescript-eslint` parser
- **Vue**: `vue-eslint-parser` with TypeScript support via `parserOptions.parser`

### Important Customizations

- Indentation: 4 spaces (all configs)
- Console/debugger: Error in production, warn in development
- Disallows `++` and `--` operators
- TypeScript: Allows `any` type (strict check disabled)
- Vue: PascalCase component names, disables multi-word requirement

## Dependencies

- ESLint 9+ (peer dependency)
- Published to GitHub Packages
- ES Module format (`"type": "module"`)
