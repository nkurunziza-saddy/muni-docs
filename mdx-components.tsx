import { useMDXComponents as useMDXComponents_ } from "@/mdx-components/index";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...useMDXComponents_(),
  };
}
