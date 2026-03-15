import { useMDXComponents as useMDXComponentsInternal } from "@/mdx-components/index";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...useMDXComponentsInternal(),
  };
}
