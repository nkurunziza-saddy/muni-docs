import { RiCommandLine, RiFile3Line } from "@remixicon/react";
import { cn } from "@/lib/utils";

export function CodeTitle({
  children,
  className,
  language,
  ...props
}: {
  children: string;
  className?: string;
  language?: string;
}) {
  return (
    <div
      {...props}
      className={cn(
        "not-prose bg-muted/30 backdrop-blur-md",
        "flex items-center justify-between px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-mono font-bold group-[.code-group]:hidden border-b border-border/40",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 opacity-80">
        {language === "bash" ? (
          <RiCommandLine className="size-4 opacity-60" />
        ) : children.match(/\.(.*)$/) ? (
          <RiFile3Line className="size-4 opacity-60" />
        ) : null}
        <span className="text-foreground">{children.toLowerCase()}</span>
      </div>
      {language && (
        <div className="px-1.5 py-0.5 border border-border/60 bg-background/50 text-[9px] opacity-50">
          {language.toLowerCase()}
        </div>
      )}
    </div>
  );
}
