import { h } from "hastscript";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { ContainerDirective } from "mdast-util-directive";

export function remarkSpace() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name !== "space") return;

      node.attributes = {
        ...(node.attributes ?? {}),
        class: [node.attributes?.class, "space"].filter(Boolean).join(" "),
      };

      const data = (node.data ??= {}) as any;
      data.hName = "Space";
      data.hProperties = h("Space", node.attributes).properties;
    });
  };
}
