# Deployment Guide: Publishing to npm Registry

This guide explains how to publish the `@muni-docs/core` library to the npm registry.

## Prerequisites

### 1. npm Account

- Create an account at [npmjs.com](https://www.npmjs.com/)
- Verify your email address
- Set up two-factor authentication (recommended)

### 2. npm CLI Authentication

Login to npm:

```bash
npm login
```

Enter your:
- Uspace name (or email)
- Password
- Email (for two-factor auth code if enabled)

Verify login:

```bash
npm whoami
```

### 3. Package Name Check

Ensure your package name is available:

```bash
npm view @muni-docs/core
```

If the package exists, you'll need to:
- Use a different name, or
- Be added as a collaborator to the existing package

## Pre-Publication Checklist

### ✅ Code Quality

- [ ] All code is reviewed
- [ ] No TypeScript errors: `pnpm run lint`
- [ ] No console errors or warnings
- [ ] All imports use relative paths (no `@/` aliases)

### ✅ Build Verification

```bash
# Clean previous build
rm -rf dist

# Build library
pnpm run build:lib

# Verify build output
ls dist/
ls dist/styles/
ls dist/components/
ls dist/mdx-components/
ls dist/config/
ls dist/next/
```

Check that:
- [ ] All entry points built successfully
- [ ] TypeScript declarations (`.d.ts`) exist
- [ ] CSS files are copied to `dist/styles/`
- [ ] Source maps are generated

### ✅ Package Configuration

Verify `package.json`:

```json
{
  "name": "@muni-docs/core",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": { ... },
  "files": ["dist", "README.md"],
  "peerDependencies": {
    "next": "^15.5.0",
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  }
}
```

Check:
- [ ] Package name is correct
- [ ] Version follows semantic versioning
- [ ] Main entry points are correct
- [ ] Exports are properly configured
- [ ] Files array includes only what should be published
- [ ] Peer dependencies are correct

### ✅ Documentation

- [ ] `README.md` is complete and accurate
- [ ] Installation instructions are clear
- [ ] Usage examples work
- [ ] All API exports are documented

### ✅ Testing

- [ ] Library tested locally (see [LOCAL_TESTING.md](./LOCAL_TESTING.md))
- [ ] Test project works with the built library
- [ ] All components render correctly
- [ ] Production build succeeds

## Versioning

### Semantic Versioning

Follow [semver](https://semver.org/):

- **MAJOR** (x.0.0): Breaking changes
- **MINOR** (0.x.0): New features, backwards compatible
- **PATCH** (0.0.x): Bug fixes, backwards compatible

### Update Version

**Option 1: Manual**
```bash
# Edit package.json
# Change "version": "0.1.0" to "0.1.1"
```

**Option 2: npm version**
```bash
# Patch version (0.1.0 → 0.1.1)
npm version patch

# Minor version (0.1.0 → 0.2.0)
npm version minor

# Major version (0.1.0 → 1.0.0)
npm version major
```

This automatically:
- Updates `package.json`
- Creates a git commit
- Creates a git tag

## Publishing Process

### Step 1: Final Build

```bash
# Ensure you're on the latest code
git pull

# Clean build
rm -rf dist
pnpm run build:lib

# Verify build
ls -la dist/
```

### Step 2: Verify Package Contents

Check what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included in the package.

### Step 3: Test Package Locally (Optional)

Create a test package and verify:

```bash
# Create tarball
npm pack

# This creates: muni-docs-core-0.1.0.tgz

# In a test project, install it
cd ../test-project
pnpm add ../PAXk6/muni-docs-core-0.1.0.tgz

# Test that it works
pnpm dev
```

### Step 4: Publish to npm

#### Dry Run (Recommended First)

```bash
npm publish --dry-run
```

This shows what would be published without actually publishing.

#### Publish

**Public package:**
```bash
npm publish --access public
```

The `--access public` flag is required for scoped packages (`@muni-docs/core`).

**Private package:**
```bash
npm publish
```

(Requires npm Pro or Organization account)

### Step 5: Verify Publication

Check npm registry:

```bash
npm view @muni-docs/core
```

Or visit: `https://www.npmjs.com/package/@muni-docs/core`

### Step 6: Create Git Tag (if not done automatically)

```bash
# If npm version wasn't used, create tag manually
git tag v0.1.0
git push --tags
```

## Post-Publication

### 1. Update Repository

```bash
git add .
git commit -m "chore: publish v0.1.0"
git push
```

### 2. Create Release Notes

On GitHub:
- Go to Releases
- Click "Draft a new release"
- Tag: `v0.1.0`
- Title: `v0.1.0`
- Add changelog and breaking changes

### 3. Announce (Optional)

- Update documentation
- Post in relevant communities
- Update any related projects

## Publishing Updates

### Patch Release (Bug Fixes)

```bash
# 1. Fix the bug
# 2. Update version
npm version patch

# 3. Build
pnpm run build:lib

# 4. Publish
npm publish --access public

# 5. Push changes
git push --tags
```

### Minor Release (New Features)

```bash
# 1. Add new feature
# 2. Update version
npm version minor

# 3. Update changelog/README
# 4. Build
pnpm run build:lib

# 5. Publish
npm publish --access public

# 6. Push changes
git push --tags
```

### Major Release (Breaking Changes)

```bash
# 1. Make breaking changes
# 2. Update version
npm version major

# 3. Update migration guide
# 4. Update README with breaking changes
# 5. Build
pnpm run build:lib

# 6. Publish
npm publish --access public

# 7. Push changes
git push --tags
```

## Troubleshooting

### "Package name already exists"

**Problem:** Another package with the same name exists

**Solutions:**
- Choose a different name
- Request access to existing package
- Use unscoped name (not recommended)

### "You do not have permission"

**Problem:** Not authorized to publish to the scope

**Solutions:**
- Check you're logged in: `npm whoami`
- Verify you're the owner of the scope
- Request access from scope owner

### "Package version already exists"

**Problem:** Version `0.1.0` already published

**Solutions:**
- Bump version: `npm version patch`
- Or unpublish (within 72 hours):
  ```bash
  npm unpublish @muni-docs/core@0.1.0
  ```

### Build Fails

**Problem:** `pnpm run build:lib` fails

**Solutions:**
- Check for TypeScript errors
- Verify all dependencies installed
- Check tsup configuration
- Review error messages

### Missing Files

**Problem:** Published package missing files

**Solutions:**
- Check `files` array in `package.json`
- Verify files exist in `dist/`
- Run `npm pack --dry-run` to preview

### Type Errors for Users

**Problem:** Users get TypeScript errors

**Solutions:**
- Verify `.d.ts` files are in `dist/`
- Check `types` field in `package.json`
- Ensure exports include types
- Test types locally before publishing

## Automation

### GitHub Actions (Optional)

Create `.github/workflows/publish.yml`:

```yaml
name: Publish to npm

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      - run: pnpm install
      - run: pnpm run build:lib
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## Best Practices

1. **Always test locally first**
   - Don't publish untested code
   - Use test projects to verify

2. **Follow semantic versioning**
   - Breaking changes = major version
   - New features = minor version
   - Bug fixes = patch version

3. **Update documentation**
   - Keep README current
   - Document breaking changes
   - Provide migration guides

4. **Tag releases in Git**
   - Makes it easy to track versions
   - Enables rollback if needed

5. **Use pre-release versions for testing**
   ```bash
   npm version 0.2.0-beta.1
   npm publish --access public --tag beta
   ```
   Users install with: `npm install @muni-docs/core@beta`

6. **Don't unpublish unless necessary**
   - Unpublishing can break user projects
   - Only within 72 hours of publishing
   - Better to publish a fix

## Security

- **Don't commit `.npmrc`** with tokens
- **Use environment variables** for CI/CD
- **Enable 2FA** on npm account
- **Review dependencies** regularly
- **Use `npm audit`** before publishing

## Additional Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Scoped Packages](https://docs.npmjs.com/cli/v8/using-npm/scope)

## Checklist Summary

Before every publish:

- [ ] Code reviewed and tested
- [ ] Build succeeds
- [ ] Version updated
- [ ] README updated
- [ ] Exports verified
- [ ] Type definitions present
- [ ] CSS files included
- [ ] Dry run successful
- [ ] Git tags created
- [ ] Ready to publish

Good luck with your publication! 🚀

