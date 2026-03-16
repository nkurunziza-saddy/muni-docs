import { type DetailedHTMLProps, type HTMLAttributes, type ReactElement } from "react";
import { HighlightedCode } from "./highlighted-code";
import { extractText } from "@/lib/utils";

export function Pre({
  children,
  className,
  isTabContent = false,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  isTabContent?: boolean;
}) {
  const codeElement = (Array.isArray(children) 
    ? children.find(child => (child as any)?.type === "code" || (child as any)?.props?.children) 
    : children) as any;

  const rawCode = extractText(codeElement?.props?.children || children);
  
  const codeClassName = codeElement?.props?.className as string || "";
  const lang = codeClassName?.replace("language-", "") || (props as any)["data-lang"] || (props as any)["data-language"] || "text";
  
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
