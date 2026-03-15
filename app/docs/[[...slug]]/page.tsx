import type { Metadata } from "next";
import { notFound } from "next/navigation";
import muniConfig from "@/muni.config";
import { PageActions } from "@/components/page-actions";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

interface NavigationItem {
  title: string;
  slug: string;
  items?: NavigationItem[];
}

function getAllSlugs(items: NavigationItem[]): string[] {
  const slugs: string[] = [];

  for (const item of items) {
    slugs.push(item.slug);
    if (item.items) {
      slugs.push(...getAllSlugs(item.items));
    }
  }

  return slugs;
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
    date && (typeof date === "string" || date instanceof Date)
      ? new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null;

  const authorText = author && typeof author === "string" ? author.toLowerCase() : null;

  return (
    <div className="text-[11px] font-mono text-muted-foreground space-y-1 uppercase tracking-widest opacity-70">
      {displayDate && <p>last updated on {displayDate.toLowerCase()}</p>}
      {authorText && <p>written by {authorText}</p>}
    </div>
  );
}

export function generateStaticParams() {
  const allSlugs = getAllSlugs(muniConfig.navigation);

  return allSlugs.map((slug) => ({
    slug: slug === "index" ? [] : slug.split("/"),
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";

  // Try to get frontmatter for better metadata
  let frontmatter: any = {};
  try {
    const filePath = path.join(process.cwd(), "content", "pages", `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const parsed = matter(fileContent);
    frontmatter = parsed.data;
  } catch (e) {
    // ignore
  }

  const findPage = (
    items: NavigationItem[],
    targetSlug: string
  ): NavigationItem | null => {
    for (const item of items) {
      if (item.slug === targetSlug) return item;
      if (item.items) {
        const found = findPage(item.items, targetSlug);
        if (found) return found;
      }
    }
    return null;
  };

  const currentPage = findPage(muniConfig.navigation, slug);

  const pageTitle = frontmatter.title || (currentPage
    ? `${currentPage.title} | ${muniConfig.title}`
    : muniConfig.title);
  const pageDescription = frontmatter.description || `Documentation for ${currentPage?.title || "Muni"}`;

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

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";

  try {
    // 1. Get frontmatter manually using gray-matter
    const filePath = path.join(process.cwd(), "content", "pages", `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const { data: frontmatter } = matter(fileContent);

    // 2. Import the MDX component
    // Dynamic imports work with @next/mdx
    const { default: Post } = await import(
      `@/content/pages/${slug}.mdx`
    ).catch((err) => {
      console.error(`Failed to import ${slug}.mdx`, err);
      throw new Error(`Failed to load page: ${slug}`);
    });

    return (
      <div className="w-full">
        {/* page actions at the top */}
        <div className="mb-10 flex justify-end">
          <PageActions slug={slug} />
        </div>

        <div className="mdx-content prose dark:prose-invert">
          <Post />
        </div>

        <div className="mt-20 pt-6 border-t border-border/10 border-dashed">
          {muniConfig.showFrontmatterMeta !== false && (
            <div className="flex flex-col gap-2 px-4">
                <FrontmatterMeta frontmatter={frontmatter} />
            </div>
          )}
        </div>
      </div>
    );
  } catch (_error) {
    notFound();
  }
}

export const dynamicParams = false;
