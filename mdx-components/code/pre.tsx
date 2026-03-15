import { type DetailedHTMLProps, type HTMLAttributes, type ReactElement } from "react";
import { HighlightedCode } from "./highlighted-code";

export function Pre({
  children,
  className,
  isTabContent = false,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  isTabContent?: boolean;
}) {
  // 1. Extract the code element
  const codeElement = (Array.isArray(children) 
    ? children.find(child => (child as any)?.type === "code" || (child as any)?.props?.children) 
    : children) as any;

  // 2. Extract raw code
  const extractText = (node: any): string => {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node.props?.children) return extractText(node.props.children);
    return "";
  };

  const rawCode = extractText(codeElement?.props?.children || children);
  
  // 3. Extract metadata
  const codeClassName = codeElement?.props?.className as string || "";
  const lang = codeClassName?.replace("language-", "") || (props as any)["data-lang"] || (props as any)["data-language"] || "text";
  
  // MDX passes the "meta" string (like "{1,3-5} showLineNumbers") as props to the code/pre element
  const meta = (codeElement?.props as any)?.["data-meta"] || (props as any)?.["data-meta"] || "";
  const title = (props as any)["data-title"] || codeElement?.props?.["data-title"] || "";

  return (
    <HighlightedCode
      {...props}
      className={className}
      lang={lang}
      title={title}
      code={rawCode}
      meta={meta}
      isTabContent={isTabContent}
    />
  );
}
