import fs from "node:fs";
import path from "node:path";

/**
 * Get all MDX file paths from a directory recursively
 */
export function getAllMDXFiles(dir: string): string[] {
  const files: string[] = [];

  function traverse(currentDir: string) {
    if (!fs.existsSync(currentDir)) {
      return;
    }

    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith(".mdx")) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

/**
 * Get all document paths from content directory
 * @param contentDir - The content directory (defaults to "content/pages")
 * @returns Array of slugs
 */
export function getAllDocsPaths(contentDir: string = "content/pages"): string[] {
  const fullPath = path.join(process.cwd(), contentDir);
  const files = getAllMDXFiles(fullPath);

  return files.map((file) => {
    const relativePath = path.relative(fullPath, file);
    return relativePath
      .replace(/\.mdx$/, "")
      .replace(/\/index$/, "")
      .replace(/\\/g, "/");
  });
}

/**
 * Convert file paths to Next.js static params format
 */
export function pathsToParams(paths: string[]): Array<{ slug: string[] }> {
  return paths.map((path) => ({
    slug: path === "index" || path === "" ? [] : path.split("/"),
  }));
}

