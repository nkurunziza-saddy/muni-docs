# nkurunziza-docs

A powerful, customizable documentation framework for Next.js 15+ with MDX support, built-in search, and beautiful UI components.

## Features

- 🚀 **Next.js 15+ Ready** - Built for the App Router with React Server Components
- 📝 **MDX Support** - Write your docs in MDX with frontmatter
- 🎨 **Multiple Themes** - light, dark, mono, mono-dark themes out of the box
- 🔍 **Built-in Search** - Generate searchable content indexes
- 🧩 **UI Components** - Beautiful, accessible components powered by Radix UI
- ⚡ **CLI Tool** - Quick setup and search generation commands
- 🎯 **TypeScript** - Full type safety and IntelliSense support
- 📦 **Zero Config** - Works with sensible defaults, customize when needed

## Installation

```bash
npm install nkurunziza-docs
# or
pnpm add nkurunziza-docs
# or
yarn add nkurunziza-docs
```

### Peer Dependencies

Make sure you have these installed:

```bash
npm install react@19 react-dom@19 next@15 next-themes@0.4 @mdx-js/react@3
```

## Quick Start

### 1. Initialize Your Project

```bash
npx nkurunziza-docs init
```

This command will:

- Create `content/pages/` directory
- Generate `app/docs/[[...slug]]/page.tsx` route
- Create `muni.config.ts` with defaults
- Add a sample `content/pages/index.mdx` file

### 2. Configure Next.js for MDX

Update your `next.config.ts`:

```typescript
import { getNextMDXConfig } from "nkurunziza-docs";
import createMDX from "@next/mdx";

const withMDX = createMDX(getNextMDXConfig());

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // your other config...
};

export default withMDX(nextConfig);
```

### 3. Configure MDX Components

Create `mdx-components.tsx` in your project root:

```tsx
"use client";

import type { MDXComponents } from "mdx/types";
import { useMDXComponents as getDocsMDXComponents } from "nkurunziza-docs/client";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...getDocsMDXComponents(components),
    ...components,
  };
}
```

### 4. Import Styles

In your root layout (`app/layout.tsx`):

```tsx
import "nkurunziza-docs/styles/mdx-components.css";
```

### 5. Create Your Config

Edit `muni.config.ts`:

```typescript
import type { MuniConfig } from "nkurunziza-docs";

const config: MuniConfig = {
  title: "My Documentation",
  version: "1.0.0",
  defaultTheme: "light", // "light" | "dark" | "mono" | "mono-dark"
  showFrontmatterMeta: true,
  navigation: [
    {
      title: "Getting Started",
      slug: "index",
    },
    {
      title: "Guides",
      slug: "guides",
      items: [
        { title: "Installation", slug: "guides/installation" },
        { title: "Configuration", slug: "guides/configuration" },
      ],
    },
  ],
  githubRepo: "https://github.com/username/repo",
};

export default config;
```

### 6. Write Your Docs

Create MDX files in `content/pages/`:

```mdx
---
title: "Getting Started"
description: "Learn how to get started"
author: "Your Name"
date: "2024-10-31"
---

# Getting Started

Welcome to the documentation!

## Features

This framework includes:

- MDX support
- Syntax highlighting
- And much more!
```

### 7. Generate Search Data

```bash
npx nkurunziza-docs generate-search
```

### 8. Run Your Dev Server

```bash
npm run dev
```

Visit `http://localhost:3000/docs` to see your documentation!

## CLI Commands

### `npx nkurunziza-docs init`

Initialize the docs framework in your Next.js project.

### `npx nkurunziza-docs generate-search`

Generate search data from your MDX files.

**Options:**

- `-c, --content-dir <path>` - Content directory (default: "content/pages")
- `-o, --output <path>` - Output path (default: "public/search-data.json")
- `-b, --base-url <path>` - Base URL for docs (default: "/docs")

Example:

```bash
npx nkurunziza-docs generate-search -c docs/content -o public/search.json -b /documentation
```

## API Reference

### Components

#### `DocsPage`

The main docs page component that renders MDX content.

```tsx
import {
  DocsPage,
  generateDocsStaticParams,
  generateDocsMetadata,
} from "nkurunziza-docs/components";

export const generateStaticParams = generateDocsStaticParams;
export const generateMetadata = generateDocsMetadata;

export default DocsPage;
```

#### UI Components

All components are exported from the main package:

```tsx
import {
  Button,
  Alert,
  Badge,
  Tabs,
  Steps,
  Step,
  // ... and more
} from "nkurunziza-docs";
```

### Configuration

#### `loadMuniConfig()`

Load the muni.config.ts from the consumer's project.

```typescript
import { loadMuniConfig } from "nkurunziza-docs";

const config = loadMuniConfig();
```

#### `getDefaultConfig()`

Get the default configuration object.

```typescript
import { getDefaultConfig } from "nkurunziza-docs";

const defaults = getDefaultConfig();
```

### Navigation

#### `buildNavigationTree(config)`

Build a navigation tree from the config.

```typescript
import { buildNavigationTree } from "nkurunziza-docs";

const tree = buildNavigationTree(config);
```

#### `getPrevNextLinks(slug, config)`

Get previous and next navigation links for a page.

```typescript
import { getPrevNextLinks } from "nkurunziza-docs";

const { prev, next } = getPrevNextLinks("guides/installation", config);
```

### Content Loading

#### `getDocsContent(slug, contentDir?)`

Get raw MDX content for a slug.

```typescript
import { getDocsContent } from "nkurunziza-docs";

const content = await getDocsContent("guides/installation");
```

#### `getAllDocsPaths(contentDir?)`

Get all document paths from the content directory.

```typescript
import { getAllDocsPaths } from "nkurunziza-docs";

const paths = getAllDocsPaths();
// ["index", "guides/installation", "guides/configuration"]
```

### Search

#### `generateSearchData(options)`

Programmatically generate search data.

```typescript
import { generateSearchData } from "nkurunziza-docs";

generateSearchData({
  contentDir: "content/pages",
  outputPath: "public/search-data.json",
  baseUrl: "/docs",
});
```

## Advanced Usage

### Custom Docs Page

You can customize the docs page component:

```tsx
import {
  loadMuniConfig,
  generateDocsStaticParams,
  generateDocsMetadata,
  DocsPage,
} from "nkurunziza-docs/components";

const config = loadMuniConfig();

export const generateStaticParams = () => generateDocsStaticParams(config);
export const generateMetadata = ({ params }: any) =>
  generateDocsMetadata({ params, config });

export default async function CustomDocsPage({ params }: any) {
  // Your custom implementation
  // Or use the default DocsPage component
  return <DocsPage params={params} />;
}
```

### Using Components in Your MDX

Components are automatically available in MDX files:

```mdx
# My Page

<Alert variant="info">This is an informational alert!</Alert>

<Steps>
  <Step title="Step 1">First, do this...</Step>
  <Step title="Step 2">Then, do that...</Step>
</Steps>
```

## TypeScript Types

All types are exported:

```typescript
import type {
  MuniConfig,
  NavigationItem,
  Theme,
  SearchItem,
  SearchGeneratorOptions,
  PrevNextLinks,
} from "nkurunziza-docs";
```

## License

MIT

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Support

For issues and questions, please open an issue on GitHub.
