"use server";
import fs from "node:fs/promises";
import path from "node:path";

export async function getRawContent(slug: string) {
  const rawContent = await fs.readFile(
    path.join(process.cwd(), "content", "pages", `${slug}.mdx`),
    "utf-8",
  );
  return rawContent.replace(/^---[\s\S]*?---\n/, "");
}
