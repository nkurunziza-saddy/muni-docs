import { RiCheckLine, RiFileCopyLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";

export function CopyButton({
  copy,
  copied,
}: {
  copy: () => void;
  copied: boolean;
}) {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      data-copied={copied}
      onClick={copy}
      type="button"
      className="absolute top-1 end-1 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      {copied ? (
        <RiCheckLine className="text-success-foreground" />
      ) : (
        <RiFileCopyLine className="text-muted-foreground" />
      )}
      <span className="sr-only">copy code</span>
    </Button>
  );
}
