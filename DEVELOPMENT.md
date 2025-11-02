# Development Guide

This guide explains how to work with the `@muni-docs/core` library from a development perspective.

## Project Structure

```
muni-docs/
├── src/                    # Library source code
│   ├── components/        # React components
│   │   ├── ui/           # Base UI components
│   │   ├── navigation-components/  # Navigation components
│   │   ├── muni-components/       # Custom Muni components
│   │   └── providers/    # React providers
│   ├── mdx-components/   # MDX component overrides
│   ├── lib/              # Utilities, hooks, plugins
│   │   ├── actions/     # Action functions
│   │   ├── hooks/       # React hooks
│   │   ├── plugins/     # MDX plugins (rehype/remark)
│   │   ├── schemas/     # Zod schemas
│   │   └── utils.ts     # Utility functions
│   ├── config/           # Configuration types and defaults
│   ├── styles/           # CSS files
│   ├── scripts/          # Build scripts (e.g., search generation)
│   ├── next/             # Next.js integration helpers
│   └── index.ts          # Main export file
├── app/                   # Next.js app (for development/testing)
├── content/               # Example content (for dev/testing)
├── dist/                  # Built library output (generated)
├── tsup.config.ts         # Build configuration
├── package.json           # Package configuration
└── tsconfig.json          # TypeScript configuration
```

## Development Workflow

### 1. Making Changes to the Library

#### Adding a New Component

1. Create the component in `src/components/` (or appropriate subdirectory):

   ```typescript
   // src/components/ui/new-component.tsx
   import { cn } from "../../lib/utils";

   export function NewComponent({ className }: { className?: string }) {
     return <div className={cn("base-styles", className)}>...</div>;
   }
   ```

2. Export it from `src/components/index.ts`:

   ```typescript
   export * from "./ui/new-component";
   ```

3. Optionally add it to `src/index.ts` if you want it in the main export

#### Adding a New Utility Function

1. Create or update a file in `src/lib/`:

   ```typescript
   // src/lib/my-utility.ts
   export function myUtility() {
     // implementation
   }
   ```

2. Export it from `src/index.ts`:
   ```typescript
   export * from "./lib/my-utility";
   ```

#### Adding a New MDX Component

1. Create the component in `src/mdx-components/`:

   ```typescript
   // src/mdx-components/custom-component.tsx
   export function CustomComponent() {
     return <div>...</div>;
   }
   ```

2. Register it in `src/mdx-components/index.tsx`:
   ```typescript
   const mdxComponents: MDXComponents = {
     // ... existing components
     CustomComponent: (props) => (
       <MDXErrorBoundary>
         <CustomComponent {...props} />
       </MDXErrorBoundary>
     ),
   };
   ```

#### Adding a New Plugin

1. Create the plugin in `src/lib/plugins/`:

   ```typescript
   // src/lib/plugins/rehype/my-plugin.ts
   import type { Plugin } from "unified";

   export function rehypeMyPlugin(): Plugin {
     return (tree) => {
       // transform tree
     };
   }
   ```

2. Export it from `src/index.ts`:

   ```typescript
   export * from "./lib/plugins/rehype/my-plugin";
   ```

3. If it should be used in Next.js config, add it to `src/next/create-next-config.ts`

### 2. Testing Changes

#### Local Development

1. **Build the library**:

   ```bash
   pnpm run build:lib
   ```

   This creates the `dist/` directory with all built files.

2. **Test with the app** (if using the app directory for testing):
   - The `app/` directory can import from `src/` directly during development
   - Or use `pnpm link` to test as a package

#### Using pnpm link (Recommended)

1. **Link the library locally**:

   ```bash
   # In the library directory
   pnpm link --global
   ```

2. **In a test project**:

   ```bash
   # In your test project directory
   pnpm link --global @muni-docs/core
   ```

3. **Rebuild after changes**:
   ```bash
   pnpm run build:lib
   ```
   The linked package will use the updated `dist/` files.

### 3. Updating Dependencies

#### Adding a New Dependency

1. **Add to dependencies** (for runtime deps):

   ```bash
   pnpm add <package-name>
   ```

2. **Add to devDependencies** (for dev/build tools):

   ```bash
   pnpm add -D <package-name>
   ```

3. **If it's a peer dependency** (React, Next.js, etc.):
   - Don't add it to dependencies
   - Document it in `package.json` `peerDependencies`
   - Update README.md to mention it

#### Updating Existing Dependencies

```bash
pnpm update <package-name>
# or update all
pnpm update
```

### 4. Build Configuration

#### tsup.config.ts

The build configuration in `tsup.config.ts` defines:

- **Entry points**: Multiple entry points for different parts of the library
- **Output formats**: Both ESM (`.mjs`) and CJS (`.js`)
- **Type definitions**: Generates `.d.ts` files
- **External dependencies**: Packages that won't be bundled

Key configuration:

```typescript
export default defineConfig([
  {
    entry: ["src/index.ts"], // Main entry
    format: ["cjs", "esm"], // Both formats
    dts: true, // Generate types
    external: ["react", "next"], // Don't bundle these
    outDir: "dist",
  },
  // ... more entries
]);
```

#### Package.json Exports

The `exports` field in `package.json` defines how the package can be imported:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./components": { ... },
    "./styles/*": "./dist/styles/*.css"
  }
}
```

When adding new entry points:

1. Add entry in `tsup.config.ts`
2. Add export in `package.json`

### 5. CSS Files

CSS files are in `src/styles/` and must be copied to `dist/styles/` during build.

The build script includes:

```json
"copy:css": "mkdir -p dist/styles && cp -r src/styles/*.css dist/styles/"
```

When adding new CSS files:

1. Add to `src/styles/`
2. They'll be automatically copied during `build:lib`

### 6. Import Paths

**Important**: All imports in `src/` must use **relative paths**, not `@/` aliases.

- ✅ `import { cn } from "../lib/utils"`
- ❌ `import { cn } from "@/lib/utils"`

This is because:

- The library needs to work when installed as a package
- Absolute path aliases won't resolve in the built package

### 7. TypeScript Configuration

The `tsconfig.json` is used for:

- Development (editor support, type checking)
- Building (tsup uses it for type generation)

Key settings:

- `moduleResolution: "bundler"` - For modern bundlers
- `noEmit: true` - We use tsup to emit
- `paths: { "@/*": ["./*"] }` - Only for app/ directory, not src/

### 8. Versioning and Publishing

#### Version Bump

```bash
# Patch version (bug fixes)
pnpm version patch

# Minor version (new features)
pnpm version minor

# Major version (breaking changes)
pnpm version major
```

#### Pre-publish Checklist

1. ✅ All tests pass
2. ✅ Build succeeds: `pnpm run build:lib`
3. ✅ No TypeScript errors
4. ✅ README.md is updated
5. ✅ CHANGELOG.md updated (if maintained)
6. ✅ Version bumped in package.json

#### Publishing

```bash
# Build first
pnpm run build:lib

# Publish to npm
pnpm publish

# Or publish with specific tag
pnpm publish --tag beta
```

The `prepublishOnly` script in package.json will automatically run `build:lib` before publishing.

### 9. Common Tasks

#### Adding a New Export

1. Add the file to `src/`
2. Export from `src/index.ts`:
   ```typescript
   export * from "./new-file";
   ```
3. Rebuild: `pnpm run build:lib`

#### Updating Next.js Integration

Files in `src/next/` provide helpers for Next.js integration:

- `create-next-config.ts` - Generates Next.js config
- `utils.ts` - Utility functions for pages

To update:

1. Modify files in `src/next/`
2. Rebuild: `pnpm run build:lib`
3. Users will get updates when they update the package

#### Fixing Import Errors

If you see import resolution errors during build:

1. Check the import path is relative
2. Verify the file exists
3. Check `external` list in `tsup.config.ts` - don't bundle peer deps
4. Rebuild: `pnpm run build:lib`

#### Debugging Build Issues

1. **Check for TypeScript errors**:

   ```bash
   pnpm tsc --noEmit
   ```

2. **Check for linting errors**:

   ```bash
   pnpm run lint
   ```

3. **Clean build**:

   ```bash
   rm -rf dist
   pnpm run build:lib
   ```

4. **Check build output**:
   ```bash
   ls -la dist/
   ```

### 10. Development Scripts

```bash
# Build the library
pnpm run build:lib

# Build and copy CSS
pnpm run copy:css

# Development server (for testing app/)
pnpm run dev

# Build the app (for testing)
pnpm run build:app

# Lint code
pnpm run lint

# Format code
pnpm run format
```

### 11. File Organization Best Practices

- **Components**: Group by functionality (`ui/`, `navigation-components/`, etc.)
- **Utilities**: Keep in `lib/` with descriptive names
- **Types**: Export from config or alongside implementation
- **Styles**: One file per concern (globals, mdx-components, themes, etc.)

### 12. Testing Strategy

While there's no formal test suite yet, testing approaches:

1. **Manual testing** with the `app/` directory
2. **Link testing** with a real project using `pnpm link`
3. **Build verification**: Ensure `build:lib` succeeds without errors

Future: Consider adding:

- Unit tests (Vitest)
- Component tests (React Testing Library)
- Integration tests with a test Next.js app

## Troubleshooting

### Build fails with "Could not resolve"

- Check import paths are relative
- Verify file exists
- Check `external` list in tsup config

### TypeScript errors in dist/

- Clean and rebuild: `rm -rf dist && pnpm run build:lib`
- Check `tsconfig.json` settings
- Verify all types are properly exported

### CSS files not found

- Run `pnpm run copy:css` manually
- Check `src/styles/` directory exists
- Verify build script includes CSS copy step

### Exports not working

- Verify export in `package.json` `exports` field
- Check entry point exists in `tsup.config.ts`
- Ensure file is exported from `src/index.ts`

## Contributing

When contributing:

1. Make changes in `src/`
2. Test locally with `build:lib`
3. Update documentation if needed
4. Submit PR with clear description
5. Ensure all checks pass before merging
