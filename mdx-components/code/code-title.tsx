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
        "not-prose bg-muted/40 backdrop-blur-3xl",
        "flex items-center gap-1.5 px-1 md:px-2 py-2 text-xs font-medium group-[.code-group]:hidden border-b border-input",
        className,
      )}
    >
      {language === "bash" ? (
        <RiCommandLine className="size-3.5" />
      ) : children.match(/\.(.*)$/) ? (
        <RiFile3Line className="size-3.5" />
      ) : null}
      {children.toLowerCase()}
    </div>
  );
}
