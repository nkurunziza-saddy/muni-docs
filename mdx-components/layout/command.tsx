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

  return (
    <div className={cn("mdx-command not-prose group/pre relative", className)}>
      <div className="mdx-command__label">{label.toLowerCase()}</div>
      <pre ref={ref} className="mdx-command__pre">
        <code className="mdx-command__code">{children}</code>
      </pre>
      <CopyButton copied={copied} copy={copy} className="top-2 end-2 opacity-70 group-hover/pre:opacity-100" />
    </div>
  );
}
