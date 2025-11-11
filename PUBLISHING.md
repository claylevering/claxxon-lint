# Publishing and Using @claylevering/eslint-config

This guide covers how to publish this package to npm and how to use it in your projects.

## Publishing to npm

### Prerequisites

1. **npm Account**: Create an account at https://www.npmjs.com if you don't have one
2. **npm Token**: Generate an Automation token or Publish token from https://www.npmjs.com/settings/YOUR_USERNAME/tokens
3. **GitHub Secret**: Add your npm token as `NPM_TOKEN` in GitHub repository settings:
    - Go to https://github.com/claylevering/claxxon-lint/settings/secrets/actions
    - Click "New repository secret"
    - Name: `NPM_TOKEN`
    - Value: Your npm token
    - Click "Add secret"

### Publishing Methods

#### Method 1: Automated via GitHub Release (Recommended)

1. **Update Version**: Update the version in package.json:

    ```bash
    # Update version in package.json
    pnpm version patch  # or minor, or major
    ```

2. **Commit and Push**:

    ```bash
    git add package.json pnpm-lock.yaml
    git commit -m "Bump version to X.X.X"
    git push
    ```

3. **Create GitHub Release**:
    - Go to GitHub repository → Releases → "Create a new release"
    - Create a new tag (e.g., `v1.0.0`)
    - Title: `v1.0.0`
    - Description: List of changes
    - Click "Publish release"

4. **GitHub Actions** will automatically:
    - Install dependencies
    - Run linting
    - Verify package contents
    - Publish to npm

#### Method 2: Manual Publishing via Workflow Dispatch

1. Update version as above
2. Go to GitHub → Actions → "Publish Package to npm"
3. Click "Run workflow" → Select branch → "Run workflow"

#### Method 3: Manual Local Publishing

**Not recommended** - Use GitHub Actions instead to ensure consistency.

```bash
# Login to npm
pnpm login

# Publish
pnpm publish --access public
```

### Verify Publication

After publishing, verify at:

```
https://www.npmjs.com/package/@claylevering/eslint-config
```

## Installing in Your Projects

### Install the Package

No special configuration needed - just install from npm:

```bash
pnpm add -D @claylevering/eslint-config eslint
```

### Use in Your Project

Create `eslint.config.js`:

```javascript
import claxxonLint from '@claylevering/eslint-config';

export default [
    ...claxxonLint.configs.node // or typescript, vue, vue-ts
];
```

See [README.md](./README.md) for more usage examples.

## GitHub Actions CI/CD Setup

To use the package in GitHub Actions workflows, just install normally:

```yaml
- name: Install pnpm
  uses: pnpm/action-setup@v4
  with:
      version: 9

- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
      node-version: '20.x'
      cache: 'pnpm'

- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

No authentication needed for public npm packages.

## Troubleshooting

### "404 Not Found - GET https://registry.npmjs.org/@claylevering/eslint-config"

Package isn't published yet or name is incorrect. Verify:

- Package exists at https://www.npmjs.com/package/@claylevering/eslint-config
- Package name is correct: `@claylevering/eslint-config`

### "403 Forbidden" when publishing

Your npm token is missing, invalid, or doesn't have publish permissions. Verify:

- `NPM_TOKEN` secret is set in GitHub repository settings
- Token has "Automation" or "Publish" permissions
- Token hasn't expired (check at https://www.npmjs.com/settings/YOUR_USERNAME/tokens)

### "EPUBLISHCONFLICT Cannot publish over existing version"

Version already exists. Bump version in `package.json`:

```bash
pnpm version patch
```

## Package Contents Verification

Before publishing, verify what will be included:

```bash
pnpm pack --dry-run
```

Expected contents:

- `index.js` - Main entry point
- `configs/` - All configuration files
- `custom-rules/` - All custom rules
- `LICENSE` - MIT license
- `README.md` - Usage documentation
- `CLAUDE.md` - AI assistant guidance

## Version Management

Use pnpm version command to auto-update package.json:

```bash
pnpm version patch  # 1.0.0 → 1.0.1
pnpm version minor  # 1.0.0 → 1.1.0
pnpm version major  # 1.0.0 → 2.0.0
```
