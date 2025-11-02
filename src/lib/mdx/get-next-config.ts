import path from "node:path";
import rehypeShiki from "@shikijs/rehype";
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRemoveNotationEscape,
} from "@shikijs/transformers";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/**
 * Get Next.js MDX configuration with all plugins
 * Consumer uses this in their next.config.ts with createMDX()
 */
export function getNextMDXConfig(): any {
  return {
    options: {
      remarkPlugins: [
        remarkGfm,
        remarkDirective,
        remarkFrontmatter,
        remarkMdxFrontmatter,
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            content: () => [
              {
                type: "element",
                tagName: "div",
                properties: { "data-autolink-icon": true },
                children: [],
              },
            ],
          },
        ],
        [
          rehypeShiki,
          {
            themes: {
              dark: "vitesse-dark",
              light: "vitesse-light",
            },
            defaultColor: "light",
            transformers: [
              transformerRemoveNotationEscape(),
              transformerNotationDiff({ matchAlgorithm: "v3" }),
              transformerNotationFocus({ matchAlgorithm: "v3" }),
              transformerNotationHighlight({ matchAlgorithm: "v3" }),
              transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
              transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
            ].filter(Boolean),
          },
        ],
      ],
    },
  };
}

