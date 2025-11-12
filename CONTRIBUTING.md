# Contributing to @claxxon-lint/eslint-config

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/claylevering/claxxon-lint.git
cd claxxon-lint
```

2. Install dependencies:
```bash
npm install
```

3. Run tests:
```bash
npm test
```

## Project Structure

```
claxxon-lint/
├── configs/              # ESLint configuration modules
│   ├── vue.js           # Custom Vue rules
│   ├── vue-recommended.js
│   ├── node.js          # Custom Node rules
│   ├── node-recommended.js
│   ├── typescript.js    # Custom TypeScript rules
│   └── typescript-recommended.js
├── examples/            # Example usage files
├── test/               # Test files
├── index.js           # Main entry point
└── package.json       # Package configuration
```

## Adding New Configurations

To add a new configuration type (e.g., React):

1. Create configuration files in `configs/`:
   - `configs/react.js` - Custom rules
   - `configs/react-recommended.js` - Recommended rules

2. Update `index.js` to export the new configurations

3. Add exports to `package.json`:
```json
"exports": {
  "./react": "./configs/react.js",
  "./react-recommended": "./configs/react-recommended.js"
}
```

4. Add tests in `test/index.test.js`

5. Update documentation:
   - README.md
   - USAGE.md
   - CHANGELOG.md

## Configuration Format

Each configuration should follow the ESLint flat config format:

```javascript
export default {
  name: '@claxxon-lint/config-name',
  files: ['**/*.ext'],
  languageOptions: {
    parser: parserModule,
    parserOptions: { /* ... */ }
  },
  plugins: {
    pluginName: pluginModule
  },
  rules: {
    'plugin/rule-name': 'error'
  }
};
```

## Testing

- All configurations must have corresponding tests
- Tests should verify:
  - Configuration structure
  - Plugin loading
  - Rule presence
  - File pattern matching

Run tests with:
```bash
npm test
```

## Code Quality

- Follow existing code style
- Add JSDoc comments for new functions
- Include error handling for plugin loading
- Add validation for external dependencies

## Documentation

When adding features, update:
- README.md - Quick start and feature list
- USAGE.md - Detailed usage examples
- CHANGELOG.md - Record changes
- examples/ - Add example files if applicable

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and ensure they pass
5. Update documentation
6. Submit a pull request

## Publishing

This package is published to GitHub Packages. For detailed information on how to publish new versions, see [PUBLISHING.md](./PUBLISHING.md).

**Quick reference:**
- Automatic publishing via GitHub Releases (recommended)
- Manual publishing with `npm run publish:github`
- Always update version with `npm version patch|minor|major`

## Questions?

Feel free to open an issue for:
- Bug reports
- Feature requests
- Questions about usage
- Suggestions for improvement
