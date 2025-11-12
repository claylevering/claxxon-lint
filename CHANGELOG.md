# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- GitHub Packages publishing configuration
  - `.npmrc` file for package registry configuration
  - `publishConfig` in package.json pointing to GitHub Packages
  - GitHub Actions workflow for automatic publishing on releases
  - `publish:github` npm script for manual publishing
  - `prepublishOnly` script to run tests before publishing
- Publishing documentation:
  - PUBLISHING.md with detailed publishing guide
  - Updated README.md with GitHub Packages installation instructions
  - Updated CONTRIBUTING.md with publishing reference
- Custom ESLint rules
  - New `custom-rules/` directory with custom rule implementations
  - `vue-component-name-the` rule requiring "The" in component names
  - `vue-with-custom` configuration that includes custom rules
  - Custom rules plugin export for flexible usage
  - Documentation in `custom-rules/README.md`
- Repository self-linting
  - `eslint.config.js` to lint the repository itself
  - Updated example Vue component to comply with custom rules

## [1.0.0] - 2025-11-11

### Added
- Initial release of @claxxon-lint/eslint-config
- Support for ESLint flat config format (ESLint 8.57+)
- Vue.js configurations:
  - `vue`: Custom Vue rules for flexible configuration
  - `vue-recommended`: All recommended Vue rules from eslint-plugin-vue
- Node.js configurations:
  - `node`: Custom Node rules for flexible configuration
  - `node-recommended`: All recommended Node rules from eslint-plugin-n
- TypeScript configurations:
  - `typescript`: Custom TypeScript rules for flexible configuration
  - `typescript-recommended`: All recommended TypeScript rules from @typescript-eslint
- Multiple import methods:
  - Default import with property access
  - Named imports
  - Direct path imports
- Comprehensive documentation:
  - README.md with quick start guide
  - USAGE.md with detailed examples
  - Example configurations and files
- Full test suite with 15+ unit tests
- Error handling and validation for plugin configurations
