import fs from "fs";
import path from "path";
import matter from "gray-matter";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
  category?: string;
  tags?: string[];
}

function getAllMDXFiles(dir: string): string[] {
  const files: string[] = [];

  function traverse(currentDir: string) {
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

function generateSearchData() {
  const contentDir = path.join(process.cwd(), "content/pages");
  const outputPath = path.join(process.cwd(), "public/search-data.json");

  if (!fs.existsSync(contentDir)) {
    console.log("Content directory not found, skipping search data generation");
    return;
  }

  const mdxFiles = getAllMDXFiles(contentDir);
  const searchData: SearchItem[] = [];

  for (const filePath of mdxFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data: frontmatter, content } = matter(fileContent);

      const relativePath = path.relative(contentDir, filePath);
      const slug = relativePath
        .replace(/\.mdx$/, "")
        .replace(/\/index$/, "")
        .replace(/\\/g, "/");

      const url = `/docs${slug ? `/${slug}` : ""}`;

      const cleanContent = content
        .replace(/^---[\s\S]*?---/, "") // Remove frontmatter
        .replace(/```[\s\S]*?```/g, "") // Remove code blocks
        .replace(/`[^`]*`/g, "") // Remove inline code
        .replace(/#{1,6}\s/g, "") // Remove heading markers
        .replace(/\[([^\]]*)\]$$[^)]*$$/g, "$1") // Convert links to text
        .replace(/\*\*([^*]*)\*\*/g, "$1") // Remove bold markers
        .replace(/\*([^*]*)\*/g, "$1") // Remove italic markers
        .replace(/\n+/g, " ") // Replace newlines with spaces
        .trim();

      searchData.push({
        id: slug || "index",
        title: frontmatter.title || "Untitled",
        content: cleanContent,
        url,
        category: frontmatter.category,
        tags: frontmatter.tags || [],
      });
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(searchData, null, 2));
  console.log(`Generated search data for ${searchData.length} pages`);
}

if (require.main === module) {
  generateSearchData();
}

export { generateSearchData };
