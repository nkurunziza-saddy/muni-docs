import path from "node:path";
import createMDX from "@next/mdx";
import rehypeShiki from "@shikijs/rehype";
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
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import { rehypeShikiDisplayNotation } from "../lib/plugins/rehype/display-shiki-notation";
import { rehypeInlineShiki } from "../lib/plugins/rehype/inline-shiki";
import { rehypePreLineNumbers } from "../lib/plugins/rehype/rehype-pre-line-numbers";
import { remarkCode } from "../lib/plugins/remark/code";
import { remarkSubheading } from "../lib/plugins/remark/subheading";
import { transformerNotationInclude } from "../lib/plugins/transformers/transformer-include";
import { transformerLineNumbers } from "../lib/plugins/transformers/transformer-line-numbers";
import { transformerTagline } from "../lib/plugins/transformers/transformer-tagline";
import { transformerTitle } from "../lib/plugins/transformers/transformer-title";

export interface CreateNextConfigOptions {
  /**
   * Root directory of the docs project
   * @default process.cwd()
   */
  rootDir?: string;
  /**
   * Enable PWA support
   * @default false
   */
  enablePWA?: boolean;
  /**
   * Shiki theme configuration
   */
  shikiThemes?: {
    dark: string;
    light: string;
  };
  /**
   * Additional Next.js config options
   */
  nextConfig?: Omit<NextConfig, "pageExtensions">;
}

export function createNextConfig(
  options: CreateNextConfigOptions = {}
): NextConfig {
  const {
    rootDir = process.cwd(),
    enablePWA = false,
    shikiThemes = {
      dark: "vitesse-dark",
      light: "vitesse-light",
    },
    nextConfig = {},
  } = options;

  const baseNextConfig: NextConfig = {
    pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
    ...nextConfig,
  };

  const withMDX = createMDX({
    options: {
      remarkPlugins: [
        remarkGfm,
        remarkDirective,
        remarkFrontmatter,
        remarkMdxFrontmatter,
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
            themes: shikiThemes,
            defaultColor: "light",
            transformers: [
              transformerRemoveNotationEscape(),
              transformerNotationDiff({ matchAlgorithm: "v3" }),
              transformerNotationFocus({ matchAlgorithm: "v3" }),
              transformerNotationHighlight({ matchAlgorithm: "v3" }),
              transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
              transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
              transformerNotationInclude({
                rootDir: path.resolve(rootDir),
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
            themes: shikiThemes,
            defaultColor: "light",
          },
        ],
        rehypeShikiDisplayNotation,
        rehypePreLineNumbers,
      ],
    },
  });

  if (enablePWA) {
    const pwaConfig = withPWA({
      dest: "public",
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === "development",
    });
    return pwaConfig(withMDX(baseNextConfig)) as NextConfig;
  }

  return withMDX(baseNextConfig) as NextConfig;
}

