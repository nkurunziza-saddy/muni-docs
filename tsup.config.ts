import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    components: "src/components.ts",
    client: "src/client.ts",
    cli: "src/cli/index.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  platform: "node",
  external: [
    "react",
    "react-dom",
    "next",
    "next/link",
    "next/navigation",
    "next-themes",
    "@mdx-js/react",
    "commander",
    "gray-matter",
    "yaml",
    "fs",
    "path",
    "process",
    "node:fs",
    "node:path",
    "node:fs/promises",
    "node:process",
  ],
  tsconfig: "tsconfig.lib.json",
  noExternal: [],
  esbuildOptions(options, context) {
    if (context.format === "esm") {
      // Add shebang for CLI
      if (options.entryNames === "[dir]/[name]" || context.entry === "src/cli/index.ts") {
        options.banner = {
          js: "#!/usr/bin/env node",
        };
      }
      // Inject Node.js globals for bundled dependencies
      options.define = {
        ...options.define,
        "process.env": "process.env",
      };
      // Make sure process is available
      options.inject = options.inject || [];
    }
  },
  onSuccess: "chmod +x dist/cli.js || true",
});

