import fs from "node:fs";
import path from "node:path";

export async function initCommand() {
  console.log("Initializing nkurunziza-docs...\n");

  const cwd = process.cwd();

  // Check if Next.js project
  const packageJsonPath = path.join(cwd, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    console.error("Error: No package.json found. Are you in a Next.js project?");
    process.exit(1);
  }

  // Create content directory
  const contentDir = path.join(cwd, "content", "pages");
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    console.log("✓ Created content/pages directory");
  } else {
    console.log("✓ content/pages directory already exists");
  }

  // Create docs page route
  const docsPageDir = path.join(cwd, "app", "docs", "[[...slug]]");
  const docsPageFile = path.join(docsPageDir, "page.tsx");

  if (!fs.existsSync(docsPageFile)) {
    fs.mkdirSync(docsPageDir, { recursive: true });

    const pageContent = `import { 
  DocsPage, 
  generateDocsStaticParams,
  generateDocsMetadata,
} from "nkurunziza-docs/components";

export const generateStaticParams = generateDocsStaticParams;
export const generateMetadata = generateDocsMetadata;

export default DocsPage;
`;

    fs.writeFileSync(docsPageFile, pageContent);
    console.log("✓ Created app/docs/[[...slug]]/page.tsx");
  } else {
    console.log("✓ app/docs/[[...slug]]/page.tsx already exists");
  }

  // Create sample muni.config.ts
  const configPath = path.join(cwd, "muni.config.ts");
  if (!fs.existsSync(configPath)) {
    const configContent = `import type { MuniConfig } from "nkurunziza-docs";

const config: MuniConfig = {
  title: "My Documentation",
  version: "1.0.0",
  defaultTheme: "light",
  showFrontmatterMeta: true,
  navigation: [
    {
      title: "Introduction",
      slug: "index",
    },
  ],
};

export default config;
`;

    fs.writeFileSync(configPath, configContent);
    console.log("✓ Created muni.config.ts");
  } else {
    console.log("✓ muni.config.ts already exists");
  }

  // Create sample MDX file
  const sampleMdxPath = path.join(contentDir, "index.mdx");
  if (!fs.existsSync(sampleMdxPath)) {
    const mdxContent = `---
title: "Welcome"
description: "Getting started with nkurunziza-docs"
---

# Welcome to Your Docs

This is your first documentation page!

## Getting Started

Edit this file in \`content/pages/index.mdx\` to customize your documentation.
`;

    fs.writeFileSync(sampleMdxPath, mdxContent);
    console.log("✓ Created content/pages/index.mdx");
  }

  console.log("\n✅ Initialization complete!");
  console.log("\nNext steps:");
  console.log("1. Add MDX files to content/pages/");
  console.log("2. Update muni.config.ts with your navigation");
  console.log("3. Run: npx nkurunziza-docs generate-search");
  console.log("4. Start your dev server: npm run dev");
}

