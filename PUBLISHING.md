# Publishing and Using @claxxon-lint/eslint-config

This guide covers how to publish this package to GitHub Packages and how to use it in your projects.

## Publishing to GitHub Packages

### Prerequisites

1. **GitHub Repository**: Ensure the repository is pushed to GitHub at `https://github.com/claylevering/claxxon-lint`
2. **GitHub Personal Access Token**: Not needed for publishing via GitHub Actions (uses `GITHUB_TOKEN` automatically)

### Publishing Methods

#### Method 1: Automated via GitHub Release (Recommended)

1. **Update Version**: Update the version in both files:
   ```bash
   # Update version in package.json
   npm version patch  # or minor, or major

   # Update version in index.js meta.version to match
   ```

2. **Commit and Push**:
   ```bash
   git add package.json index.js package-lock.json
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
   - Publish to GitHub Packages

#### Method 2: Manual Publishing via Workflow Dispatch

1. Update version as above
2. Go to GitHub → Actions → "Publish Package to GitHub Packages"
3. Click "Run workflow" → Select branch → "Run workflow"

#### Method 3: Manual Local Publishing

**Not recommended** - Use GitHub Actions instead to ensure consistency.

```bash
# Create .npmrc with your GitHub token (if not using Actions)
echo "//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN" >> .npmrc

# Publish
npm publish
```

### Verify Publication

After publishing, verify at:
```
https://github.com/claylevering/claxxon-lint/packages
```

## Installing in Your Projects

### Step 1: Configure npm for GitHub Packages

Create or update `.npmrc` in your project root:

```
@claxxon-lint:registry=https://npm.pkg.github.com
```

### Step 2: Authenticate with GitHub Packages

You need a GitHub Personal Access Token with `read:packages` permission.

#### Create Token

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Select scope: `read:packages`
4. Copy the token

#### Configure Authentication

**Option A: Project-level .npmrc** (Recommended for local development)

Add to `.npmrc` in your project:
```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

**Don't commit this!** Add `.npmrc` to `.gitignore`:
```bash
echo ".npmrc" >> .gitignore
```

**Option B: User-level .npmrc** (Recommended for CI/CD)

Add to `~/.npmrc`:
```
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

**Option C: Environment Variable** (Best for CI/CD)

```bash
# In CI/CD or locally
export NPM_TOKEN=YOUR_GITHUB_TOKEN

# .npmrc uses:
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

### Step 3: Install the Package

```bash
npm install --save-dev @claxxon-lint/eslint-config eslint
```

### Step 4: Use in Your Project

Create `eslint.config.js`:

```javascript
import claxxonLint from '@claxxon-lint/eslint-config';

export default [
    ...claxxonLint.configs.node,  // or typescript, vue, vue-ts
];
```

See [README.md](./README.md) for more usage examples.

## GitHub Actions CI/CD Setup

To use the package in GitHub Actions workflows:

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
      node-version: '20.x'
      registry-url: 'https://npm.pkg.github.com'
      scope: '@claxxon-lint'

- name: Install dependencies
  run: npm ci
  env:
      NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The `GITHUB_TOKEN` is automatically available in GitHub Actions.

## Migration to npm Registry (Future)

When ready to publish to npm:

1. **Update package.json**:
   ```json
   {
       "publishConfig": {
           "registry": "https://registry.npmjs.org",
           "access": "public"
       }
   }
   ```

2. **Update .npmrc**:
   ```
   # Remove or comment out GitHub Packages config
   # @claxxon-lint:registry=https://npm.pkg.github.com
   ```

3. **Login to npm**:
   ```bash
   npm login
   ```

4. **Publish**:
   ```bash
   npm publish --access public
   ```

5. **Update GitHub Actions workflow** (`.github/workflows/publish.yml`):
   ```yaml
   - name: Setup Node.js
     uses: actions/setup-node@v4
     with:
         node-version: '20.x'
         registry-url: 'https://registry.npmjs.org'

   - name: Publish to npm
     run: npm publish --access public
     env:
         NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
   ```

   Add `NPM_TOKEN` to GitHub Secrets (Settings → Secrets and variables → Actions).

## Troubleshooting

### "Unable to authenticate need: Basic realm"

Your GitHub token is missing or invalid. Verify:
- Token has `read:packages` permission
- `.npmrc` contains correct token
- Token hasn't expired

### "404 Not Found - GET https://npm.pkg.github.com/@claxxon-lint/eslint-config"

Package isn't published yet or name/scope is incorrect. Verify:
- Package exists at https://github.com/claylevering/claxxon-lint/packages
- Scope matches exactly: `@claxxon-lint`

### "EPUBLISHCONFLICT Cannot publish over existing version"

Version already exists. Bump version in `package.json` and `index.js`:
```bash
npm version patch
```

## Package Contents Verification

Before publishing, verify what will be included:

```bash
npm pack --dry-run
```

Expected contents:
- `index.js` - Main entry point
- `configs/` - All configuration files
- `custom-rules/` - All custom rules
- `LICENSE` - MIT license
- `README.md` - Usage documentation
- `CLAUDE.md` - AI assistant guidance

## Version Management

Always keep versions in sync:
- `package.json` → `version` field
- `index.js` → `plugin.meta.version` field

Use npm version command to auto-update package.json:
```bash
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0
```

Then manually update `index.js`.
