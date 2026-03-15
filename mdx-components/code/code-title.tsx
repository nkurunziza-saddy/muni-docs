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
  const fileParts = children.split("/");
  const fileName = fileParts[fileParts.length - 1] || children;
  const ext = fileName.includes(".") ? fileName.split(".").pop() : undefined;
  const languageLabel = language ?? ext;

  return (
    <div
      {...props}
      className={cn(
        "not-prose bg-transparent",
        "flex items-center justify-between px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-mono font-semibold group-[.code-group]:hidden border-b border-border/30",
        className,
      )}
    >
      <div className="flex items-center gap-2.5 opacity-80">
        {language === "bash" ? (
          <RiCommandLine className="size-4 opacity-60" />
        ) : children.match(/\.(.*)$/) ? (
          <RiFile3Line className="size-4 opacity-60" />
        ) : null}
        <span className="text-foreground">{fileName.toLowerCase()}</span>
      </div>
      {languageLabel && (
        <div className="px-1.5 py-0.5 border border-border/60 bg-background/50 text-[9px] opacity-60">
          {languageLabel.toLowerCase()}
        </div>
      )}
    </div>
  );
}
