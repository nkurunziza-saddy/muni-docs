import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type React from "react";
import { loadMuniConfig, loadMuniConfigAsync } from "../lib/config/loader";
import type { MuniConfig, NavigationItem } from "../lib/config/schema";
import { getAllSlugs } from "../lib/navigation/tree";
import { findPageInNav } from "../lib/navigation/finder";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

function FrontmatterMeta({
  frontmatter,
}: {
  frontmatter: Record<string, unknown>;
}) {
  const { author, date } = frontmatter || {};

  if (!author && !date) {
    return null;
  }

  const displayDate =
    date && typeof date === "string"
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  const authorText = author && typeof author === "string" ? author : null;

  return (
    <div className="text-sm text-muted-foreground space-y-1">
      {displayDate && <p>Last updated on {displayDate}</p>}
      {authorText && <p>Written by {authorText}</p>}
    </div>
  );
}

/**
 * Generate static params for all docs pages
 * Note: This is called at build time, so config may not be loaded yet
 * The consumer can pass config directly, or it will use defaults
 */
export async function generateStaticParams(config?: MuniConfig) {
  let muniConfig: MuniConfig;
  if (config) {
    muniConfig = config;
  } else {
    // Try to load config async (may fail at build time, that's OK)
    try {
      muniConfig = await loadMuniConfigAsync();
    } catch {
      muniConfig = loadMuniConfig();
    }
  }
  const allSlugs = getAllSlugs(muniConfig.navigation);

  return allSlugs.map((slug) => ({
    slug: slug === "index" ? [] : slug.split("/"),
  }));
}

/**
 * Generate metadata for docs pages
 */
export async function generateMetadata({
  params,
  config,
}: {
  params: PageProps["params"];
  config?: MuniConfig;
}): Promise<Metadata> {
  let muniConfig: MuniConfig;
  if (config) {
    muniConfig = config;
  } else {
    muniConfig = await loadMuniConfigAsync();
  }
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";

  const currentPage = findPageInNav(muniConfig.navigation, slug);

  const pageTitle = currentPage
    ? `${currentPage.title} | ${muniConfig.title}`
    : muniConfig.title;
  const pageDescription = `Documentation for ${currentPage?.title || muniConfig.title}`;

  return {
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

/**
 * Main docs page component
 * Consumer uses this in app/docs/[[...slug]]/page.tsx
 */
export default async function DocsPage({ params }: PageProps) {
  const muniConfig = await loadMuniConfigAsync();
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";

  try {
    // Dynamic import - consumer must have content/pages in their project
    // Try multiple path patterns that might work with Next.js module resolution
    let Post: React.ComponentType | undefined;
    let frontmatter: Record<string, unknown> = {};
    
    const importPaths = [
      // Relative path from app/docs (most common)
      `../../content/pages/${slug}.mdx`,
      // Root-relative (if Next.js resolves from project root)
      `content/pages/${slug}.mdx`,
      // Absolute path as fallback
      `${process.cwd()}/content/pages/${slug}.mdx`,
    ];

    let lastError: Error | undefined;
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

    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="mdx-content">
          <Post />
        </div>

        <div className="mt-12 pt-4 pb-6 border-t">
          {muniConfig.showFrontmatterMeta !== false && (
            <FrontmatterMeta frontmatter={frontmatter} />
          )}
        </div>
      </div>
    );
  } catch (_error) {
    notFound();
  }
}

export const dynamicParams = false;

