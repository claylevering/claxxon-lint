# Publishing Guide

This document explains how to publish new versions of `@claxxon-lint/eslint-config` to GitHub Packages.

## Prerequisites

1. You must have write access to the `claylevering/claxxon-lint` repository
2. All tests must pass (`npm test`)
3. Code must be committed and pushed to the repository

## Publishing Methods

### Method 1: Automatic Publishing via GitHub Release (Recommended)

This is the easiest and recommended method. The package will be automatically published when you create a GitHub release.

1. **Update the version** in `package.json`:
   ```bash
   npm version patch  # For bug fixes
   npm version minor  # For new features
   npm version major  # For breaking changes
   ```

2. **Push the version commit and tag**:
   ```bash
   git push && git push --tags
   ```

3. **Create a GitHub Release**:
   - Go to https://github.com/claylevering/claxxon-lint/releases/new
   - Select the tag you just pushed
   - Add release notes describing the changes
   - Click "Publish release"

4. **The GitHub Action will automatically**:
   - Checkout the code
   - Install dependencies
   - Run tests
   - Publish to GitHub Packages

### Method 2: Manual Publishing

If you need to publish manually:

1. **Ensure you're authenticated**:
   ```bash
   npm login --registry=https://npm.pkg.github.com
   # Username: your-github-username
   # Password: your-github-personal-access-token
   # Email: your-email
   ```

2. **Update the version**:
   ```bash
   npm version patch  # or minor, or major
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Publish**:
   ```bash
   npm run publish:github
   ```

## Version Guidelines

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.0.0 → 2.0.0): Breaking changes
  - Removing or changing existing rules
  - Changing configuration structure
  - Dropping support for ESLint versions

- **MINOR** (1.0.0 → 1.1.0): New features
  - Adding new rule configurations
  - Adding new supported ecosystems
  - New optional features

- **PATCH** (1.0.0 → 1.0.1): Bug fixes
  - Fixing incorrect rule configurations
  - Documentation updates
  - Dependency updates (non-breaking)

## After Publishing

1. **Update CHANGELOG.md** with the new version and changes
2. **Verify the package** is visible at:
   - https://github.com/claylevering/claxxon-lint/packages
3. **Test installation** in a separate project:
   ```bash
   npm install @claxxon-lint/eslint-config@latest
   ```

## Troubleshooting

### "Package already exists" error
- You may have forgotten to update the version number
- Run `npm version patch` (or minor/major) and try again

### "Authentication failed" error
- Ensure your GitHub token has `write:packages` permission
- Check that you're logged in: `npm whoami --registry=https://npm.pkg.github.com`

### "Tests failed" error
- The `prepublishOnly` script runs tests before publishing
- Fix the failing tests before publishing
- Run `npm test` locally to debug

## GitHub Token Permissions

For manual publishing, your Personal Access Token needs:
- `read:packages` - To read existing packages
- `write:packages` - To publish new versions
- `repo` - To access private repositories (if needed)

Create a token at: https://github.com/settings/tokens
