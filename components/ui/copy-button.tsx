import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyButton({
  copy,
  copied,
  className,
}: {
  copy: () => void;
  copied: boolean;
  className?: string;
}) {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      data-copied={copied}
      onClick={copy}
      type="button"
      className={cn("absolute top-1 end-1 opacity-0 group-hover/pre:opacity-100 transition-all active:scale-95", className)}
    >
      {copied ? (
        <RiCheckLine className="text-primary" />
      ) : (
        <RiFileCopyLine className="text-muted-foreground hover:text-foreground transition-colors" />
      )}
      <span className="sr-only">copy code</span>
    </Button>
  );
}
