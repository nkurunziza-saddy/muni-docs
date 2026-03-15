"use client";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { useIsInCodeBlock } from "@/lib/hooks/use-in-code";
import { cn } from "@/lib/utils";

export function Code(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const isInCodeBlock = useIsInCodeBlock();
  
  // For code blocks, we just render the children as they are already processed by Shiki
  if (isInCodeBlock) {
    return <code {...props}>{props.children}</code>;
  }

  // Inline code styling
  return (
    <code
      {...props}
      className={cn(
        "font-mono text-[0.9em] bg-muted relative rounded px-[0.3rem] py-[0.15rem] border border-border/40",
        props.className
      )}
    >
      {props.children}
    </code>
  );
}
