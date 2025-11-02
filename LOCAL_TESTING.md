# Local Testing Guide

This guide explains how to test the `@muni-docs/core` library locally on your machine before publishing to npm.

## Prerequisites

- Node.js 18+ installed
- pnpm installed (recommended) or npm/yarn
- Git repository cloned
- All dependencies installed in the library directory

## Quick Start

### 1. Build the Library

First, ensure the library is built:

```bash
cd /path/to/muni-docs/PAXk6
pnpm install
pnpm run build:lib
```

This creates the `dist/` directory with all compiled files.

### 2. Create a Test Project

You have two options for testing:

#### Option A: Using File Reference (Recommended)

Create a test project and reference the library locally:

```bash
# Create test project directory (outside the library)
cd ..
mkdir test-muni-usage
cd test-muni-usage

# Initialize Next.js project
pnpm create next-app@latest . --typescript --tailwind --app
```

Then update `package.json` to reference the local library:

```json
{
  "dependencies": {
    "@muni-docs/core": "file:../PAXk6",
    "next": "^15.5.4",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  }
}
```

#### Option B: Using pnpm link

```bash
# In the library directory
cd /path/to/muni-docs/PAXk6
pnpm link --global

# In your test project
cd /path/to/test-project
pnpm link --global @muni-docs/core
```

**Note:** If you get an error about global bin directory, set up pnpm first:
```bash
pnpm setup
```

### 3. Set Up Test Project

Create the necessary files in your test project:

**`muni.config.ts`:**
```typescript
import type { MuniConfig } from "@muni-docs/core/config";

const muniConfig: MuniConfig = {
  title: "Test Documentation",
  navigation: [
    { title: "Home", slug: "index" },
    { title: "Test Page", slug: "test" },
  ],
};

export default muniConfig;
```

**`next.config.ts`:**
```typescript
import { createNextConfig } from "@muni-docs/core/next";
export default createNextConfig({});
```

**`mdx-components.tsx`:**
```typescript
import { useMDXComponents } from "@muni-docs/core/mdx-components";
export default useMDXComponents;
```

**`app/layout.tsx`:**
```typescript
import "@muni-docs/core/styles/globals.css";
import "@muni-docs/core/styles/mdx-components.css";
import "@muni-docs/core/styles/shiki-theme.css";
import "@muni-docs/core/styles/color-themes.css";
import "@muni-docs/core/styles/typography.css";
import "@muni-docs/core/styles/spacing.css";
import { ThemeProvider } from "@muni-docs/core/components";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 4. Install Dependencies

```bash
cd /path/to/test-project
pnpm install
```

### 5. Test Development Server

```bash
pnpm dev
```

Visit `http://localhost:3000/docs` to see your documentation.

## Testing Workflow

### Making Changes to Library

1. **Edit library code** in `PAXk6/src/`

2. **Rebuild the library:**
   ```bash
   cd PAXk6
   pnpm run build:lib
   ```

3. **Test project automatically picks up changes** (with file reference)
   - If using `pnpm link`, changes are immediate
   - Restart dev server if needed

### Testing Different Features

#### Test Components
Create MDX files with different components:

```mdx
<Callout type="info">Info callout</Callout>
<Callout type="warning">Warning callout</Callout>

\`\`\`typescript
const code = "highlighted";
\`\`\`

<Tabs>
  <TabsItem label="Tab 1">Content</TabsItem>
</Tabs>
```

#### Test Navigation
Update `muni.config.ts` to test:
- Nested navigation items
- Deep routes
- Multiple pages

#### Test Themes
Add theme toggle and test:
- Minimal theme
- Minimal dark theme
- Mono theme

### Build Testing

Test production build:

```bash
cd test-project
pnpm build
pnpm start
```

Verify:
- All pages build correctly
- No build errors
- Static files are generated
- Production bundle is optimized

## Common Issues

### Library Not Found

**Problem:** `Cannot find module '@muni-docs/core'`

**Solution:**
- Ensure library is built: `cd PAXk6 && pnpm run build:lib`
- Check `dist/` directory exists
- Verify file reference path is correct
- Run `pnpm install` in test project

### Import Errors

**Problem:** `Cannot resolve '@muni-docs/core/components'`

**Solution:**
- Check `package.json` exports are correct
- Verify the entry point exists in `dist/`
- Ensure you're using the correct import path

### Style Issues

**Problem:** Styles not applying

**Solution:**
- Import all CSS files in `app/layout.tsx`
- Check Tailwind config includes library paths
- Verify CSS files exist in `dist/styles/`

### Type Errors

**Problem:** TypeScript errors in test project

**Solution:**
- Ensure `dist/*.d.ts` files exist
- Check TypeScript version compatibility
- Verify types are exported correctly

## Automated Testing

### Quick Test Script

Create a test script to verify basic functionality:

```bash
#!/bin/bash
# test-library.sh

echo "Building library..."
cd PAXk6
pnpm run build:lib || exit 1

echo "Checking dist files..."
ls dist/index.* || exit 1

echo "Checking CSS files..."
ls dist/styles/*.css || exit 1

echo "All checks passed!"
```

### Continuous Testing

Set up a watch mode:

```bash
# Terminal 1: Watch library
cd PAXk6
pnpm run build:lib --watch

# Terminal 2: Run test project
cd test-project
pnpm dev
```

## Testing Checklist

Before considering the library ready:

- [ ] Library builds without errors
- [ ] All exports are available
- [ ] Components render correctly
- [ ] MDX processing works
- [ ] Syntax highlighting works
- [ ] Navigation works
- [ ] Themes work
- [ ] Production build succeeds
- [ ] No console errors
- [ ] TypeScript types work
- [ ] CSS files load correctly

## Best Practices

1. **Test after every significant change**
   - Don't wait until the end
   - Catch issues early

2. **Test in isolation**
   - Use a clean test project
   - Don't mix library development with testing

3. **Test production builds**
   - Development and production can differ
   - Always test the final build

4. **Document test cases**
   - Keep notes on what works
   - Document known issues

5. **Use version control**
   - Commit test project state
   - Tag working versions

## Next Steps

Once local testing passes:
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for publishing instructions
- Update version in `package.json`
- Prepare release notes

