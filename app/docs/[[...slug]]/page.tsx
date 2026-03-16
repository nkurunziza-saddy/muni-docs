import type { Metadata } from "next";
import { notFound } from "next/navigation";
import muniConfig from "@/muni.config";
import { getAllSlugs, findDocBySlug } from "@/lib/docs";
import { getDocData } from "@/lib/docs-server";
import { PageActions } from "../_components/page-actions";
import { FrontmatterMeta } from "../_components/frontmatter-meta";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({
    slug: slug === "index" ? [] : slug.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: slugArray } = await params;
  const slug = slugArray?.join("/") || "index";
  const frontmatter = await getDocData(slug);
  const doc = findDocBySlug(slug);

  const title = frontmatter?.title || doc?.title || muniConfig.title;
  const description = frontmatter?.description || muniConfig.seo?.description;

  return {
    title: `${title} | ${muniConfig.title}`,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug: slugArray } = await params;
  const slug = slugArray?.join("/") || "index";
  const frontmatter = await getDocData(slug);

  if (!frontmatter) notFound();

  try {
    const { default: Post } = await import(`@/content/pages/${slug}.mdx`);

    return (
      <div className="w-full">
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
  } catch (error) {
    notFound();
  }
}

export const dynamicParams = false;
