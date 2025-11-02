#!/usr/bin/env node

import { Command } from "commander";
import { initCommand } from "./commands/init";
import { generateSearchCommand } from "./commands/generate-search";

const program = new Command("nkurunziza-docs");

program
  .version("0.1.0")
  .description("CLI tool for @nkurunziza/docs framework");

program
  .command("init")
  .description("Initialize @nkurunziza/docs in your Next.js project")
  .action(initCommand);

program
  .command("generate-search")
  .description("Generate search data from MDX files")
  .option("-c, --content-dir <path>", "Content directory", "content/pages")
  .option("-o, --output <path>", "Output path", "public/search-data.json")
  .option("-b, --base-url <path>", "Base URL for docs", "/docs")
  .action(generateSearchCommand);

program.parse(process.argv);

