import { loadMuniConfigAsync, loadMuniConfig, getAllSlugs, findPageInNav } from './chunk-2GNXCEVV.js';
import './chunk-AGBISES3.js';
import { notFound } from 'next/navigation';

function FrontmatterMeta({
  frontmatter
}) {
  const { author, date } = frontmatter || {};
  if (!author && !date) {
    return null;
  }
  const displayDate = date && typeof date === "string" ? new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }) : null;
  const authorText = author && typeof author === "string" ? author : null;
  return /* @__PURE__ */ React.createElement("div", { className: "text-sm text-muted-foreground space-y-1" }, displayDate && /* @__PURE__ */ React.createElement("p", null, "Last updated on ", displayDate), authorText && /* @__PURE__ */ React.createElement("p", null, "Written by ", authorText));
}
async function generateStaticParams(config) {
  let muniConfig;
  if (config) {
    muniConfig = config;
  } else {
    try {
      muniConfig = await loadMuniConfigAsync();
    } catch (e) {
      muniConfig = loadMuniConfig();
    }
  }
  const allSlugs = getAllSlugs(muniConfig.navigation);
  return allSlugs.map((slug) => ({
    slug: slug === "index" ? [] : slug.split("/")
  }));
}
async function generateMetadata({
  params,
  config
}) {
  var _a;
  let muniConfig;
  if (config) {
    muniConfig = config;
  } else {
    muniConfig = await loadMuniConfigAsync();
  }
  const resolvedParams = await params;
  const slug = ((_a = resolvedParams.slug) == null ? void 0 : _a.join("/")) || "index";
  const currentPage = findPageInNav(muniConfig.navigation, slug);
  const pageTitle = currentPage ? `${currentPage.title} | ${muniConfig.title}` : muniConfig.title;
  const pageDescription = `Documentation for ${(currentPage == null ? void 0 : currentPage.title) || muniConfig.title}`;
  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription
    }
  };
}
async function DocsPage({ params }) {
  var _a;
  const muniConfig = await loadMuniConfigAsync();
  const resolvedParams = await params;
  const slug = ((_a = resolvedParams.slug) == null ? void 0 : _a.join("/")) || "index";
  try {
    let Post;
    let frontmatter = {};
    const importPaths = [
      // Relative path from app/docs (most common)
      `../../content/pages/${slug}.mdx`,
      // Root-relative (if Next.js resolves from project root)
      `content/pages/${slug}.mdx`,
      // Absolute path as fallback
      `${process.cwd()}/content/pages/${slug}.mdx`
    ];
    let lastError;
    let found = false;
    for (const importPath of importPaths) {
      try {
        const module = await import(importPath);
        Post = module.default;
        frontmatter = module.frontmatter || {};
        found = true;
        break;
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        continue;
      }
    }
    if (!found || !Post) {
      throw lastError || new Error(`Failed to load page: ${slug}`);
    }
    return /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-4xl mx-auto" }, /* @__PURE__ */ React.createElement("div", { className: "mdx-content" }, /* @__PURE__ */ React.createElement(Post, null)), /* @__PURE__ */ React.createElement("div", { className: "mt-12 pt-4 pb-6 border-t" }, muniConfig.showFrontmatterMeta !== false && /* @__PURE__ */ React.createElement(FrontmatterMeta, { frontmatter })));
  } catch (_error) {
    notFound();
  }
}
var dynamicParams = false;

export { DocsPage, dynamicParams, generateMetadata as generateDocsMetadata, generateStaticParams as generateDocsStaticParams };
//# sourceMappingURL=components.js.map
//# sourceMappingURL=components.js.map