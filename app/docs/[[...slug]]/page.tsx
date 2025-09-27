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

  console.log("Loading MDX for slug:", slug);

  try {
    const { default: Post } = await import(`@/content/pages/${slug}.mdx`);

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="prose prose-neutral prose-headings:mt-8 prose-headings:font-semibold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg">
          <Post />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to load MDX file:", error);
    notFound();
  }
}

export const dynamicParams = false;
