"use server";
import fs from "fs/promises";
import path from "path";

export async function getRawContent(slug: string) {
  const rawContent = await fs.readFile(
    path.join(process.cwd(), "content", "pages", `${slug}.mdx`),
    "utf-8"
  );
  return rawContent.replace(/^---[\s\S]*?---\n/, "");
}
