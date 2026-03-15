"use client";
import { type ReactNode } from "react";
import { CopyButton } from "@/components/ui/copy-button";
import { useCopyCode } from "@/lib/hooks/use-copy-code";
import { IsInCodeBlockContext, useIsTabContent } from "@/lib/hooks/use-in-code";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { CodeTitle } from "./code-title";

interface PreClientProps {
  children: ReactNode;
  className?: string;
  isTabContent?: boolean;
  "data-lang"?: string;
  "data-language"?: string;
  "data-title"?: string;
  rawCode: string;
  shikiAttrs?: {
    pre: Record<string, string>;
    code: Record<string, string>;
  };
}

export function PreClient({
  children,
  className,
  isTabContent: isTabContentProp = false,
  rawCode,
  shikiAttrs,
  ...props
}: PreClientProps) {
  const { copied, copy, ref } = useCopyCode();
  const isTabContentContext = useIsTabContent();
  const isTabContent = isTabContentProp || isTabContentContext;

  const lang = props["data-lang"] || props["data-language"] || shikiAttrs?.code?.["data-language"];
  const title = props["data-title"] || shikiAttrs?.pre?.["data-title"];

  const wrap = (content: ReactNode) => {
    return (
      <CodeBlock
        className={cn(
          isTabContent
            ? ""
            : "border border-border/30 rounded-xl overflow-hidden shadow-none bg-[#121212] dark:bg-[#121212]"
        )}
      >
        {!isTabContent && (
          title ? (
            <CodeTitle language={lang}>
              {title}
            </CodeTitle>
          ) : (
            <div className="flex items-center justify-between px-6 py-2 border-b border-border/30 bg-muted/10">
              <div className="flex items-center gap-2 text-[#888]">
                <div className="flex gap-1.5 mr-2">
                  <div className="size-2 rounded-full bg-[#333]" />
                  <div className="size-2 rounded-full bg-[#333]" />
                  <div className="size-2 rounded-full bg-[#333]" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono opacity-50 font-bold">terminal</span>
              </div>
              {lang && (
                <span className="text-[10px] uppercase tracking-[0.2em] font-mono opacity-50 font-bold text-[#888]">
                  {lang}
                </span>
              )}
            </div>
          )
        )}
        <div className="group/code-wrapper relative">{content}</div>
      </CodeBlock>
    );
  };

  // Convert style string to object for React
  const parseStyle = (styleStr?: string) => {
    if (!styleStr) return {};
    const style: Record<string, string> = {};
    styleStr.split(';').forEach(pair => {
      const [key, value] = pair.split(':').map(s => s.trim());
      if (key && value) {
        style[key] = value;
      }
    });
    return style;
  };

  const preStyle = parseStyle(shikiAttrs?.pre?.style);
  const { className: shikiClassName, ...otherPreAttrs } = shikiAttrs?.pre || {};

  return (
    <IsInCodeBlockContext.Provider value={true}>
      {wrap(
        <pre
          {...otherPreAttrs}
          ref={ref}
          style={{ ...preStyle, backgroundColor: 'transparent' }}
          className={cn(
            className, 
            shikiClassName,
            "overflow-auto custom-scrollbar m-0 group/pre relative p-3 lg:p-4 !bg-transparent"
          )}
          data-raw={rawCode}
        >
          <CopyButton copied={copied} copy={copy} className="top-3 end-4 group-hover/pre:opacity-100" />
          {children}
        </pre>
      )}
    </IsInCodeBlockContext.Provider>
  );
}
