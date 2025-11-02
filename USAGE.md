# User Guide: Getting Started with @muni-docs/core

This guide will walk you through setting up and using the `@muni-docs/core` library to create your own documentation site.

## Prerequisites

- Node.js 18+ 
- pnpm (recommended), npm, or yarn
- Basic knowledge of Next.js and React

## Step 1: Installation

### Install the library

```bash
pnpm add @muni-docs/core
```

### Install peer dependencies

The library requires Next.js and React. Install them if not already present:

```bash
pnpm add next react react-dom
```

### Install recommended dependencies

For the best experience, also install:

```bash
pnpm add -D @next/mdx @mdx-js/loader @mdx-js/react tailwindcss
```

## Step 2: Project Setup

### Create your project structure

```
my-docs/
├── app/
│   ├── docs/
│   │   └── [[...slug]]/
│   │       └── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── content/
│   └── pages/
│       ├── index.mdx
│       └── getting-started.mdx
├── muni.config.ts
├── next.config.ts
├── mdx-components.tsx
└── package.json
```

## Step 3: Configuration

### 1. Create `muni.config.ts`

Create a configuration file in your project root:

```typescript
import type { MuniConfig } from "@muni-docs/core/config";

const muniConfig: MuniConfig = {
  title: "My Documentation",
  version: "1.0.0",
  defaultTheme: "minimal",
  showFrontmatterMeta: true,
  headingLinks: [
    { title: "GitHub", href: "https://github.com/your-org/your-repo" },
    { title: "Twitter", href: "https://twitter.com/your-handle" },
  ],
  navigation: [
    { title: "Introduction", slug: "index" },
    { title: "Getting Started", slug: "getting-started" },
    { title: "API Reference", slug: "api-reference" },
    {
      title: "Guides",
      slug: "guides",
      items: [
        { title: "Installation", slug: "guides/installation" },
        { title: "Configuration", slug: "guides/configuration" },
      ],
    },
  ],
  githubRepo: "https://github.com/your-org/your-repo",
};

export default muniConfig;
```

**Configuration Options:**

- `title`: Your documentation title
- `version`: Documentation version
- `defaultTheme`: "minimal" | "minimal-dark" | "mono"
- `showFrontmatterMeta`: Show author/date from frontmatter
- `headingLinks`: Links to show in header
- `navigation`: Navigation structure (supports nested items)
- `githubRepo`: GitHub repository URL

### 2. Create `next.config.ts`

Set up Next.js with MDX support:

```typescript
import { createNextConfig } from "@muni-docs/core/next";
import type { NextConfig } from "next";

const nextConfig = createNextConfig({
  enablePWA: false, // Set to true to enable PWA features
  shikiThemes: {
    dark: "vitesse-dark",
    light: "vitesse-light",
  },
  // Optional: Additional Next.js config
  nextConfig: {
    // Your custom Next.js options here
  },
});

export default nextConfig;
```

### 3. Create `mdx-components.tsx`

This file registers MDX components for your project:

```typescript
import { useMDXComponents } from "@muni-docs/core/mdx-components";

export default useMDXComponents;
```

### 4. Set up Tailwind CSS

Create `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./node_modules/@muni-docs/core/dist/**/*.{js,mjs}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 5. Import styles in `app/layout.tsx`

```typescript
import type { Metadata } from "next";
import "@muni-docs/core/styles/globals.css";
import "@muni-docs/core/styles/mdx-components.css";
import "@muni-docs/core/styles/shiki-theme.css";
import "@muni-docs/core/styles/color-themes.css";
import "@muni-docs/core/styles/typography.css";
import "@muni-docs/core/styles/spacing.css";
// Your custom styles
import "./globals.css";
```

## Step 4: Create Layout Components

### Root Layout (`app/layout.tsx`)

```typescript
import type { Metadata } from "next";
import { ThemeProvider } from "@muni-docs/core/components";
import "@muni-docs/core/styles/globals.css";
// ... other style imports

export const metadata: Metadata = {
  title: "My Documentation",
  description: "Documentation for my project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="minimal"
          themes={["minimal", "minimal-dark", "mono"]}
          storageKey="docs-theme"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Docs Layout (`app/docs/layout.tsx`)

```typescript
import {
  DocsHeader,
  DocsSidebar,
  DocsPagination,
  TableOfContents,
  MobileTableOfContents,
} from "@muni-docs/core/components";
import { SidebarInset, SidebarProvider } from "@muni-docs/core/components/ui/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <DocsSidebar />
        <SidebarInset className="flex flex-col min-w-0">
          <DocsHeader />
          <div className="flex flex-1 min-w-0">
            <main className="flex-1 px-4 py-4 md:px-8 md:py-8 lg:px-12">
              <div className="xl:hidden mb-6">
                <MobileTableOfContents />
              </div>
              <div className="w-full">{children}</div>
              <div className="border-t border-border pt-6">
                <DocsPagination />
              </div>
            </main>
            <TableOfContents />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
```

## Step 5: Create Documentation Pages

### Page Component (`app/docs/[[...slug]]/page.tsx`)

```typescript
import { notFound } from "next/navigation";
import { PageActions } from "@muni-docs/core/components";
import { generateStaticParams, generatePageMetadata } from "@muni-docs/core/next";
import muniConfig from "@/muni.config";

export { generateStaticParams };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";
  return generatePageMetadata(slug, muniConfig);
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";

  try {
    const { default: Post, frontmatter } = await import(
      `@/content/pages/${slug}.mdx`
    );

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6 flex justify-end">
          <PageActions slug={slug} />
        </div>
        <div className="mdx-content">
          <Post />
        </div>
        {muniConfig.showFrontmatterMeta !== false && frontmatter && (
          <div className="mt-12 pt-4 pb-6 border-t">
            {(frontmatter.author || frontmatter.date) && (
              <div className="text-sm text-muted-foreground space-y-1">
                {frontmatter.date && (
                  <p>
                    Last updated on{" "}
                    {new Date(frontmatter.date as string).toLocaleDateString()}
                  </p>
                )}
                {frontmatter.author && (
                  <p>Written by {frontmatter.author}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  } catch {
    notFound();
  }
}

export const dynamicParams = false;
```

## Step 6: Create Content

### Create MDX files in `content/pages/`

**`content/pages/index.mdx`:**

```mdx
---
title: Introduction
---

# Welcome to My Documentation

This is the introduction page.

## Getting Started

Get started by reading the [Getting Started guide](/docs/getting-started).
```

**`content/pages/getting-started.mdx`:**

```mdx
---
title: Getting Started
date: 2024-01-15
author: Your Name
---

# Getting Started

This guide will help you get started.

## Installation

<Steps>
  <Step title="Install the package" step={1}>
    Run `npm install my-package`
  </Step>
  <Step title="Configure" step={2}>
    Add configuration to your project
  </Step>
  <Step title="Start using" step={3}>
    Import and use the components
  </Step>
</Steps>
```

## Step 7: Available Components

### Layout Components

```tsx
import {
  Callout,
  InfoBox,
  Aside,
  Details,
  Summary,
  Section,
  Header,
} from "@muni-docs/core/mdx-components";
```

**Usage in MDX:**

```mdx
<Callout type="info">
  This is an info callout
</Callout>

<InfoBox title="Tip">
  This is a tip box
</InfoBox>

<Aside>
  This is an aside note
</Aside>
```

### Code Components

```mdx
\`\`\`typescript title="example.ts"
const hello = "world";
\`\`\`

<CodeBlock language="typescript">
  const example = "code";
</CodeBlock>
```

### Interactive Components

```mdx
<Tabs>
  <TabsItem label="Tab 1">
    Content for tab 1
  </TabsItem>
  <TabsItem label="Tab 2">
    Content for tab 2
  </TabsItem>
</Tabs>

<CodeGroup>
  <CodePreviewBlock language="js" title="JavaScript">
    console.log("Hello");
  </CodePreviewBlock>
  <CodePreviewBlock language="ts" title="TypeScript">
    console.log("Hello");
  </CodePreviewBlock>
</CodeGroup>
```

## Step 8: Search Functionality

### Generate search index

Create a script `scripts/generate-search.ts`:

```typescript
import { generateSearchData } from "@muni-docs/core";

generateSearchData();
```

Or use the provided utility:

```typescript
import { generateSearchData } from "@muni-docs/core/scripts/generate-search-data";

generateSearchData();
```

### Use search component

```tsx
import { SearchComponent } from "@muni-docs/core/components";

// In your layout or header
<SearchComponent />
```

The search component reads from `public/search-data.json`, which should be generated during build.

### Add to package.json

```json
{
  "scripts": {
    "generate-search": "tsx scripts/generate-search.ts",
    "build": "pnpm run generate-search && next build"
  }
}
```

## Step 9: Customization

### Custom Themes

The library comes with three themes:
- `minimal` - Clean white background
- `minimal-dark` - Dark theme
- `mono` - Monospace typography

You can extend themes by adding custom CSS variables in your `globals.css`.

### Custom Components

You can extend MDX components by modifying `mdx-components.tsx`:

```typescript
import { useMDXComponents } from "@muni-docs/core/mdx-components";
import type { MDXComponents } from "mdx/types";

const components = useMDXComponents();

// Add your custom components
components.MyCustomComponent = ({ children }) => (
  <div className="custom">{children}</div>
);

export default components;
```

### Custom Styles

Add your styles in `app/globals.css`:

```css
@layer components {
  .custom-class {
    /* Your styles */
  }
}
```

## Step 10: Building and Deployment

### Development

```bash
pnpm dev
```

### Build

```bash
# Generate search index
pnpm run generate-search

# Build the site
pnpm run build
```

### Deploy

Deploy to Vercel, Netlify, or any static hosting:

```bash
pnpm run build
pnpm start
```

## Troubleshooting

### MDX files not loading

- Check `next.config.ts` includes MDX in `pageExtensions`
- Verify file paths match slugs in `muni.config.ts`
- Ensure `mdx-components.tsx` exists

### Styles not applying

- Verify all CSS imports in `app/layout.tsx`
- Check Tailwind content paths include library files
- Ensure Tailwind is configured correctly

### Components not found

- Check imports use correct paths from `@muni-docs/core`
- Verify components are exported (check library docs)
- Rebuild: `pnpm run build`

### Search not working

- Generate search data: `pnpm run generate-search`
- Check `public/search-data.json` exists
- Verify search component is imported correctly

### TypeScript errors

- Install types: `pnpm add -D @types/react @types/node`
- Check `tsconfig.json` includes library paths
- Restart TypeScript server in your editor

## Next Steps

- Explore all available components in the library
- Customize the theme to match your brand
- Add more documentation pages
- Set up CI/CD for automatic deployments
- Add analytics and tracking

For more information, check the library's main README or open an issue on GitHub.

