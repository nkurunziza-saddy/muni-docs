import path from "node:path";
import createMDX from "@next/mdx";
import rehypeShiki from "@shikijs/rehype";
// Shiki transformers
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRemoveNotationEscape,
} from "@shikijs/transformers";
import type { NextConfig } from "next";
//@ts-expect-error
import withPWA from "next-pwa";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

// Essential rehype plugins
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
// Essential remark plugins
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { rehypeShikiDisplayNotation } from "./lib/plugins/rehype/display-shiki-notation";
import { rehypeInlineShiki } from "./lib/plugins/rehype/inline-shiki";
import { rehypePreLineNumbers } from "./lib/plugins/rehype/rehype-pre-line-numbers";
import { remarkCode } from "./lib/plugins/remark/code";
import { remarkSubheading } from "./lib/plugins/remark/subheading";
import { transformerNotationInclude } from "./lib/plugins/transformers/transformer-include";
import { transformerLineNumbers } from "./lib/plugins/transformers/transformer-line-numbers";
import { transformerTagline } from "./lib/plugins/transformers/transformer-tagline";
import { transformerTitle } from "./lib/plugins/transformers/transformer-title";

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Other Next.js config options
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkDirective,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      // Custom
      remarkCode,
      remarkSubheading,
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
            // Custom
            transformerNotationInclude({
              rootDir: path.resolve(
                __dirname,
                process.env.MUNI_DOCS_ROOT || ".",
              ),
            }),
            transformerLineNumbers(),
            transformerTitle(),
            transformerTagline(),
          ].filter(Boolean),
        },
      ],
      [
        rehypeInlineShiki,
        {
          themes: {
            dark: "vitesse-dark",
            light: "vitesse-light",
          },
          defaultColor: "light",
        },
      ],
      rehypeShikiDisplayNotation,
      rehypePreLineNumbers,
    ],
  },
});

export default pwaConfig(withMDX(nextConfig)) as NextConfig;
