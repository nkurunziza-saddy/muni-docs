"use client";

import type { ReactElement } from "react";
import {
  IsInCodeBlockContext,
  IsTabContentContext,
} from "@/lib/hooks/use-in-code";
import { cn } from "@/lib/utils";
import {
  Tabs as TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export interface CodePreviewBlockProps {
  children: ReactElement<{ className?: string; children?: ReactElement }>[];
  className?: string;
  "aria-label"?: string;
}

export function CodePreviewBlock({
  children,
  className,
  "aria-label": ariaLabel = "Code preview",
}: CodePreviewBlockProps) {
  if (!Array.isArray(children)) return null;

  const previewChild = children[0];
  const codeChild = children[1];

  return (
    <TabsRoot
      className={cn(
        "not-prose w-full my-8 border border-border/30 rounded-xl overflow-hidden bg-background shadow-none",
        className,
      )}
      defaultValue="preview"
    >
      <TabsList
        variant="line"
        className="bg-muted/10 border-b border-border/30 flex px-2 h-11 gap-0"
        aria-label={ariaLabel}
      >
        <TabsTrigger
          value="preview"
          className={cn(
            "h-full px-4 py-0 rounded-none border-0",
            "text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-all",
            "data-active:bg-muted/20 data-active:text-primary",
            "after:bottom-0 after:h-0.5 after:bg-primary",
          )}
        >
          Preview
        </TabsTrigger>
        <TabsTrigger
          value="code"
          className={cn(
            "h-full px-4 py-0 rounded-none border-0",
            "text-[11px] font-mono font-bold uppercase tracking-[0.2em] transition-all",
            "data-active:bg-muted/20 data-active:text-primary",
            "after:bottom-0 after:h-0.5 after:bg-primary",
          )}
        >
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="preview"
        className="p-8 focus:outline-none bg-background flex justify-center border-b border-border/5"
      >
        <div className="w-full max-w-full overflow-auto">{previewChild}</div>
      </TabsContent>
      <TabsContent
        value="code"
        className="focus:outline-none !m-0 bg-[#121212] flex flex-col min-h-0"
      >
        <IsInCodeBlockContext.Provider value={true}>
          <IsTabContentContext.Provider value={true}>
            <div className="flex-1 flex flex-col min-h-0">{codeChild}</div>
          </IsTabContentContext.Provider>
        </IsInCodeBlockContext.Provider>
      </TabsContent>
    </TabsRoot>
  );
}
