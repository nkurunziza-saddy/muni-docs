import { h } from "hastscript";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { ContainerDirective } from "mdast-util-directive";

export function remarkCodeGroup() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name !== "code-group") return;

      node.attributes = {
        ...(node.attributes ?? {}),
        class: [node.attributes?.class, "code-group"].filter(Boolean).join(" "),
      };

      const data = (node.data ??= {}) as any;
      data.hName = "CodeGroup";
      data.hProperties = h("CodeGroup", node.attributes).properties;
    });
  };
}
