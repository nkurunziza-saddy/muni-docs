import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Paragraph(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >,
) {
  // Extract text content
  const extractText = (node: any): string => {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node.props?.children) return extractText(node.props.children);
    return "";
  };

  const childrenText = extractText(props.children);

  // HACK: Hide frontmatter if it's being rendered as a paragraph
  if (
    (childrenText.includes("title:") && childrenText.includes("description:")) ||
    childrenText.startsWith("---") ||
    (childrenText.includes("author:") && childrenText.includes("date:"))
  ) {
    return null;
  }

  return (
    <p
      {...props}
      className={cn("", props.className)}
    />
  );
}
