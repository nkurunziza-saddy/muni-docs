import type { DetailedHTMLProps, DetailsHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Details({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  DetailsHTMLAttributes<HTMLDetailsElement>,
  HTMLDetailsElement
>) {
  return (
    <details 
      {...props} 
      className={cn(
        "group my-6 border border-border/30 rounded-xl overflow-hidden bg-muted/5 transition-all duration-300 open:bg-muted/10",
        className
      )}
    >
      {children}
    </details>
  );
}
