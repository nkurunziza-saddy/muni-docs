"use client";
import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
import { CopyButton } from "@/components/muni-components/copy-button";
import { useCopyCode } from "@/lib/hooks/use-copy-code";
import { IsInCodeBlockContext } from "@/lib/hooks/use-in-code";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { CodeTitle } from "./code-title";

export function Pre({
  children,
  className,
  isTabContent = false,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  "data-lang"?: string;
  "data-title"?: string;
  isTabContent?: boolean;
}) {
  const { copied, copy, ref } = useCopyCode();

  const recurseChildren = useCallback(
    (children: ReactElement<any>): ReactNode => {
      if (!children) return children;
      if (typeof children !== "object") return children;
      if ("props" in children)
        return {
          ...children,
          props: {
            ...children.props,
            children: Array.isArray(children.props.children)
              ? children.props.children.map(recurseChildren)
              : recurseChildren(children.props.children),
          },
        };
      return children;
    },
    []
  );

  const children_ = useMemo(
    () => recurseChildren(children as ReactElement),
    [children, recurseChildren]
  );

  const wrap = (children: React.ReactNode) => {
    if (className?.includes("shiki")) {
      return (
        <CodeBlock
          className={cn(
            isTabContent
              ? ""
              : "border border-border/30 rounded-xl overflow-hidden shadow-none bg-muted/10"
          )}
        >
          {!isTabContent && (
            props["data-title"] ? (
              <CodeTitle language={props["data-lang"]}>
                {props["data-title"]}
              </CodeTitle>
            ) : (
              <div className="flex items-center justify-between px-6 py-2 border-b border-border/30 bg-muted/10">
                <div className="flex items-center gap-2">
                  <div className="size-1.5 bg-border/60 rounded-full" />
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono opacity-50 font-bold">terminal</span>
                </div>
                {props["data-lang"] && (
                  <span className="text-[10px] uppercase tracking-[0.2em] font-mono opacity-50 font-bold">
                    {props["data-lang"]}
                  </span>
                )}
              </div>
            )
          )}
          <div className="group/code-wrapper relative">{children}</div>
        </CodeBlock>
      );
    }
    return children;
  };


  return (
    <IsInCodeBlockContext.Provider value={true}>
      {wrap(
        <pre
          ref={ref}
          {...props}
          className={cn(className, "overflow-auto custom-scrollbar m-0 group/pre relative")}
        >
          <CopyButton copied={copied} copy={copy} className="top-3 end-4 group-hover/pre:opacity-100" />
          {children_}
        </pre>
      )}
    </IsInCodeBlockContext.Provider>
  );
}
