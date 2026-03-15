"use client";

import type { ReactNode } from "react";
import { CopyButton } from "@/components/muni-components/copy-button";
import { useCopyCode } from "@/lib/hooks/use-copy-code";
import { cn } from "@/lib/utils";

export function Command({
  children,
  label = "command",
  className,
}: {
  children: ReactNode;
  label?: string;
  className?: string;
}) {
  const { copied, copy, ref } = useCopyCode();

  // Extract raw text for copy button if children is a React tree
  const extractText = (node: any): string => {
    if (!node) return "";
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (node.props?.children) return extractText(node.props.children);
    return "";
  };

  const rawCode = extractText(children);

  return (
    <div
      className={cn(
        "mdx-command not-prose group/pre relative flex flex-col border border-border/30 rounded-xl overflow-hidden bg-[#121212] my-6",
        className,
      )}
    >
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-2">
            <div className="size-2 rounded-full bg-white/10" />
            <div className="size-2 rounded-full bg-white/10" />
            <div className="size-2 rounded-full bg-white/10" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-mono opacity-40 font-bold text-white">
            {label.toLowerCase()}
          </span>
        </div>
      </div>

      <div className="relative group/code-wrapper">
        <pre
          ref={ref}
          className="mdx-command__pre p-4 lg:p-5  m-0 overflow-auto custom-scrollbar !bg-transparent"
          data-raw={rawCode}
        >
          <code className="mdx-command__code font-mono text-sm text-white/90 whitespace-pre">
            {children}
          </code>
        </pre>
        <CopyButton
          copied={copied}
          copy={copy}
          className="top-3 end-4 opacity-0 group-hover/code-wrapper:opacity-100 transition-opacity"
        />
      </div>
    </div>
  );
}
