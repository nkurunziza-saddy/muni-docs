import type { Root, Code } from "mdast";
import { visit } from "unist-util-visit";
import type { ContainerDirective } from "mdast-util-directive";

export function remarkCode() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code, _, parent: any) => {
      if (!node.lang) node.lang = "markdown";
      if (
        parent?.type === "containerDirective" &&
        (parent as ContainerDirective).name !== "steps"
      )
        return;
      const titleRegex = /(?:\((.*?)\))|(?:filename=\"(.*?)\")/;
      const match = node.meta?.match(titleRegex);

      if (match) {
        const title = match[1] || match[2];
        if (!title) return;
        node.meta = node.meta?.replace(match[0], `title="${title}"`);
      }
    });
  };
}
