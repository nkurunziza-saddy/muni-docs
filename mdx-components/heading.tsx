import { RiLinksLine } from "@remixicon/react";
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { cn, slugify } from "@/lib/utils";

export function Heading({
  level,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  const Component = `h${level}` as any;
  
  // Extract text content for ID generation and subtitle parsing
  const extractText = (node: any): string => {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node.props?.children) return extractText(node.props.children);
    return "";
  };

  const childrenText = extractText(props.children);
  
  // HACK: Hide frontmatter if it's being rendered as a heading by mdxRs
  if (
    (childrenText.includes("title:") && childrenText.includes("description:")) ||
    childrenText.startsWith("---") ||
    (childrenText.includes("author:") && childrenText.includes("date:"))
  ) {
    return null;
  }

  // Handle [Subtitle] pattern for H1
  let children: ReactNode = props.children;
  let subtitle: string | null = null;

  if (level === 1 && typeof childrenText === "string") {
    const subtitleRegex = / \[(.*)\]$/;
    const match = childrenText.match(subtitleRegex);
    if (match) {
      subtitle = match[1];
      // We don't easily want to mutate children if it's a complex React tree, 
      // but if it's just text we can.
      if (typeof props.children === 'string') {
        children = props.children.replace(match[0], '');
      }
    }
  }
      
  const id = props.id || slugify(childrenText.replace(/ \[(.*)\]$/, ''));

  const heading = (
    <Component
      {...props}
      id={id}
      className={cn(
        "group flex items-center gap-2 scroll-m-32",
        level === 1 ? "text-3xl font-bold mb-4" : "",
        props.className,
      )}
    >
      <span className="flex-1">{children}</span>
      {id && level !== 1 && (
        <a 
          href={`#${id}`} 
          className="opacity-0 group-hover:opacity-20 hover:!opacity-100 transition-opacity"
          aria-label="Link to section"
        >
          <RiLinksLine className="size-4" />
        </a>
      )}
    </Component>
  );

  if (level === 1 && subtitle) {
    return (
      <header className="mb-10">
        {heading}
        <div role="doc-subtitle" className="text-lg text-muted-foreground mt-2">
          {subtitle.toLowerCase()}
        </div>
      </header>
    );
  }

  return heading;
}
