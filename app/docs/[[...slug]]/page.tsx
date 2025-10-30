import type { Metadata } from "next";
import { notFound } from "next/navigation";
import muniConfig from "@/muni.config";
import { PageActions } from "@/components/page-actions";

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

  const pageTitle = currentPage
    ? `${currentPage.title} | ${muniConfig.title}`
    : muniConfig.title;
  const pageDescription = `Documentation for ${currentPage?.title || "Muni"}`;

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
    const { default: Post, frontmatter } = await import(
      `@/content/pages/${slug}.mdx`
    ).catch(() => {
      console.error(`Failed to import ${slug}.mdx`);
      throw new Error(`Failed to load page: ${slug}`);
    });

    return (
      <div className="w-full max-w-4xl mx-auto">
        {/* Page Actions at the top */}
        <div className="mb-6 flex justify-end">
          <PageActions slug={slug} />
        </div>

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
