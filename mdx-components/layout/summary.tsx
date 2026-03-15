import { RiArrowRightSLine } from "@remixicon/react";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Summary({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) {
  return (
    <summary 
      {...props} 
      className={cn(
        "flex items-center gap-3 px-5 py-4 cursor-pointer list-none select-none hover:bg-muted/20 transition-colors",
        "font-medium text-foreground",
        className
      )}
    >
      <RiArrowRightSLine className="size-4 text-muted-foreground group-open:rotate-90 transition-transform duration-300" />
      <span className="flex-1 text-[15px]">{children}</span>
    </summary>
  );
}
