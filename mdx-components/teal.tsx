import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function LeadParagraph(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >,
) {
  return (
    <p
      {...props}
      className={cn("text-muted-foreground text-xl", props.className)}
    />
  );
}
