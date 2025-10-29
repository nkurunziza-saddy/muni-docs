import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

interface SearchItem {
  id: string;
  title: string;
  content: string;
  url: string;
  category?: string;
  tags?: string[];
  parentPage?: string;
  sectionType?: "page" | "h2" | "h3" | "h4";
}

// Convert heading text to URL-safe slug
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
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
      const pageTitle = frontmatter.title || "Untitled";

      const cleanContent = content
        .replace(/^---[\s\S]*?---/, "") // Remove frontmatter
        .replace(/```[\s\S]*?```/g, "") // Remove code blocks
        .replace(/`[^`]*`/g, "") // Remove inline code
        .replace(/^#{1,6}\s+/gm, "") // Remove heading markers (improved regex)
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Convert links to text (fixed regex)
        .replace(/\*\*([^*]*)\*\*/g, "$1") // Remove bold markers
        .replace(/\*([^*]*)\*/g, "$1") // Remove italic markers
        .replace(/\n+/g, " ") // Replace newlines with spaces
        .replace(/\s+/g, " ") // Replace multiple spaces with single space
        .trim();

      // Add page-level search item
      searchData.push({
        id: slug || "index",
        title: pageTitle,
        content: cleanContent,
        url,
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        sectionType: "page",
      });

      // Extract headings and create section-level search items
      const headingRegex = /^(#{2,4})\s+(.+)$/gm;
      let match: RegExpExecArray | null;
      const headings: Array<{ level: string; text: string; position: number }> =
        [];

      match = headingRegex.exec(content);
      while (match !== null) {
        const level = match[1];
        const text = match[2].trim();
        const position = match.index;

        headings.push({
          level,
          text,
          position,
        });
      }

      // Create section-level search items
      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const nextHeading = headings[i + 1];

        // Extract content between this heading and the next
        const startPos =
          heading.position + heading.level.length + heading.text.length + 1;
        const endPos = nextHeading ? nextHeading.position : content.length;
        const sectionContent = content
          .slice(startPos, endPos)
          .replace(/^---[\s\S]*?---/, "") // Remove frontmatter
          .replace(/```[\s\S]*?```/g, "") // Remove code blocks
          .replace(/`[^`]*`/g, "") // Remove inline code
          .replace(/^#{1,6}\s+/gm, "") // Remove heading markers (improved regex)
          .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // Convert links to text (fixed regex)
          .replace(/\*\*([^*]*)\*\*/g, "$1") // Remove bold markers
          .replace(/\*([^*]*)\*/g, "$1") // Remove italic markers
          .replace(/\n+/g, " ") // Replace newlines with spaces
          .replace(/\s+/g, " ") // Replace multiple spaces with single space
          .trim()
          .slice(0, 120); // Limit to ~120 chars

        const headingSlug = slugify(heading.text);
        const sectionId = `${slug || "index"}/${headingSlug}`;
        const sectionUrl = `${url}#${headingSlug}`;
        const sectionType =
          heading.level.length === 2
            ? "h2"
            : heading.level.length === 3
            ? "h3"
            : "h4";

        searchData.push({
          id: sectionId,
          title: heading.text,
          content: sectionContent,
          url: sectionUrl,
          category: frontmatter.category,
          tags: frontmatter.tags || [],
          parentPage: pageTitle,
          sectionType: sectionType as "h2" | "h3" | "h4",
        });
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error);
    }
  }

  const publicDir = path.dirname(outputPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(searchData, null, 2));
}

if (require.main === module) {
  generateSearchData();
}

export { generateSearchData };
