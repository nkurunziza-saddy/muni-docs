#!/usr/bin/env node
import { generateSearchData } from './chunk-EOU5EDP7.js';
import './chunk-AGBISES3.js';
import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

async function initCommand() {
  console.log("Initializing nkurunziza-docs...\n");
  const cwd = process.cwd();
  const packageJsonPath = path.join(cwd, "package.json");
  if (!fs.existsSync(packageJsonPath)) {
    console.error("Error: No package.json found. Are you in a Next.js project?");
    process.exit(1);
  }
  const contentDir = path.join(cwd, "content", "pages");
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
    console.log("\u2713 Created content/pages directory");
  } else {
    console.log("\u2713 content/pages directory already exists");
  }
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
    console.log("\u2713 Created app/docs/[[...slug]]/page.tsx");
  } else {
    console.log("\u2713 app/docs/[[...slug]]/page.tsx already exists");
  }
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
    console.log("\u2713 Created muni.config.ts");
  } else {
    console.log("\u2713 muni.config.ts already exists");
  }
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
    console.log("\u2713 Created content/pages/index.mdx");
  }
  console.log("\n\u2705 Initialization complete!");
  console.log("\nNext steps:");
  console.log("1. Add MDX files to content/pages/");
  console.log("2. Update muni.config.ts with your navigation");
  console.log("3. Run: npx nkurunziza-docs generate-search");
  console.log("4. Start your dev server: npm run dev");
}

// src/cli/commands/generate-search.ts
async function generateSearchCommand(options) {
  console.log("Generating search data...\n");
  try {
    generateSearchData({
      contentDir: options.contentDir,
      outputPath: options.output,
      baseUrl: options.baseUrl
    });
    console.log("\n\u2705 Search data generated successfully!");
  } catch (error) {
    console.error("\u274C Error generating search data:", error);
    process.exit(1);
  }
}

// src/cli/index.ts
var program = new Command("nkurunziza-docs");
program.version("0.1.0").description("CLI tool for @nkurunziza/docs framework");
program.command("init").description("Initialize @nkurunziza/docs in your Next.js project").action(initCommand);
program.command("generate-search").description("Generate search data from MDX files").option("-c, --content-dir <path>", "Content directory", "content/pages").option("-o, --output <path>", "Output path", "public/search-data.json").option("-b, --base-url <path>", "Base URL for docs", "/docs").action(generateSearchCommand);
program.parse(process.argv);
//# sourceMappingURL=cli.js.map
//# sourceMappingURL=cli.js.map