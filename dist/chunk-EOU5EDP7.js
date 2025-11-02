import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// src/lib/search/generator.ts
function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/--+/g, "-").trim();
}
function getAllMDXFiles(dir) {
  const files = [];
  function traverse(currentDir) {
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
function generateSearchData(options = {}) {
  const contentDir = path.join(
    process.cwd(),
    options.contentDir || "content/pages"
  );
  const outputPath = path.join(
    process.cwd(),
    options.outputPath || "public/search-data.json"
  );
  const baseUrl = options.baseUrl || "/docs";
  if (!fs.existsSync(contentDir)) {
    console.warn(`Content directory not found: ${contentDir}`);
    return;
  }
  const mdxFiles = getAllMDXFiles(contentDir);
  const searchData = [];
  for (const filePath of mdxFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data: frontmatter, content } = matter(fileContent);
      const relativePath = path.relative(contentDir, filePath);
      const slug = relativePath.replace(/\.mdx$/, "").replace(/\/index$/, "").replace(/\\/g, "/");
      const url = `${baseUrl}${slug ? `/${slug}` : ""}`;
      const pageTitle = frontmatter.title || "Untitled";
      const cleanContent = content.replace(/^---[\s\S]*?---/, "").replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "").replace(/^#{1,6}\s+/gm, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\*\*([^*]*)\*\*/g, "$1").replace(/\*([^*]*)\*/g, "$1").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
      searchData.push({
        id: slug || "index",
        title: pageTitle,
        content: cleanContent,
        url,
        category: frontmatter.category,
        tags: frontmatter.tags || [],
        sectionType: "page"
      });
      const headingRegex = /^(#{2,4})\s+(.+)$/gm;
      let match;
      const headings = [];
      match = headingRegex.exec(content);
      while (match !== null) {
        const level = match[1];
        const text = match[2].trim();
        const position = match.index;
        headings.push({
          level,
          text,
          position
        });
        match = headingRegex.exec(content);
      }
      for (let i = 0; i < headings.length; i++) {
        const heading = headings[i];
        const nextHeading = headings[i + 1];
        const startPos = heading.position + heading.level.length + heading.text.length + 1;
        const endPos = nextHeading ? nextHeading.position : content.length;
        const sectionContent = content.slice(startPos, endPos).replace(/^---[\s\S]*?---/, "").replace(/```[\s\S]*?```/g, "").replace(/`[^`]*`/g, "").replace(/^#{1,6}\s+/gm, "").replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/\*\*([^*]*)\*\*/g, "$1").replace(/\*([^*]*)\*/g, "$1").replace(/\n+/g, " ").replace(/\s+/g, " ").trim().slice(0, 120);
        const headingSlug = slugify(heading.text);
        const sectionId = `${slug || "index"}/${headingSlug}`;
        const sectionUrl = `${url}#${headingSlug}`;
        const sectionType = heading.level.length === 2 ? "h2" : heading.level.length === 3 ? "h3" : "h4";
        searchData.push({
          id: sectionId,
          title: heading.text,
          content: sectionContent,
          url: sectionUrl,
          category: frontmatter.category,
          tags: frontmatter.tags || [],
          parentPage: pageTitle,
          sectionType
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
  console.log(`Search data generated: ${outputPath}`);
  console.log(`Total items: ${searchData.length}`);
}

export { generateSearchData };
//# sourceMappingURL=chunk-EOU5EDP7.js.map
//# sourceMappingURL=chunk-EOU5EDP7.js.map