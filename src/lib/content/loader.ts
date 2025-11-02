"use server";
import fs from "node:fs/promises";
import path from "node:path";

/**
 * Get raw content from an MDX file
 * @param slug - The slug of the page (e.g., "getting-started" or "guide/intro")
 * @param contentDir - The content directory (defaults to "content/pages")
 */
export async function getDocsContent(
  slug: string,
  contentDir: string = "content/pages",
): Promise<string> {
  try {
    const filePath = path.join(process.cwd(), contentDir, `${slug}.mdx`);
    const rawContent = await fs.readFile(filePath, "utf-8");
    
    // Remove frontmatter for raw content
    return rawContent.replace(/^---[\s\S]*?---\n/, "");
  } catch (error) {
    throw new Error(`Failed to load content for slug: ${slug}`);
  }
}

/**
 * Load an MDX page dynamically using Next.js import
 * Note: This is legacy - consumers should use DocsPage component directly
 * @param slug - The slug of the page
 * @param contentDir - The content directory path from project root
 */
export async function loadMDXPage(
  slug: string,
  contentDir: string = "content/pages",
) {
  try {
    const modulePath = `${process.cwd()}/${contentDir}/${slug}.mdx`;
    const module = await import(modulePath);
    return {
      default: module.default,
      frontmatter: module.frontmatter || {},
    };
  } catch (error) {
    throw new Error(`Failed to import MDX page: ${slug}`);
  }
}

