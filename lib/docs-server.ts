import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { type Frontmatter } from "./docs";

export async function getDocData(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "content", "pages", `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data } = matter(fileContent);
    return data as Frontmatter;
  } catch (error) {
    return null;
  }
}
