import { notFound } from "next/navigation";
import type { Metadata } from "next";
import muniConfig from "@/muni.config";

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

function FrontmatterMeta({ frontmatter }: { frontmatter: any }) {
  const { author, date } = frontmatter;

  if (!author && !date) {
    return null;
  }

  const displayDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="mt-12 pt-4 border-t text-sm text-muted-foreground space-y-1">
      {displayDate && <p>Last updated on {displayDate}</p>}
      {author && <p>Written by {author}</p>}
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

  return {
    title: currentPage
      ? `${currentPage.title} - ${muniConfig.title}`
      : muniConfig.title,
    description: `Documentation for ${currentPage?.title || "Muni"}`,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.join("/") || "index";

  try {
    const { default: Post, frontmatter } = await import(
      `@/content/pages/${slug}.mdx`
    );

    return (
      <div className="container mx-auto max-w-4xl">
        <div className="mdx-content">
          <Post />
        </div>

        {muniConfig.showFrontmatterMeta !== false && (
          <FrontmatterMeta frontmatter={frontmatter} />
        )}
      </div>
    );
  } catch (error) {
    notFound();
  }
}

export const dynamicParams = false;
