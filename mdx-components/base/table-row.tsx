import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function TableRow(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >,
) {
  return (
    <tr
      {...props}
      className={cn("even:bg-muted m-0 border-t p-0", props.className)}
    />
  );
}
