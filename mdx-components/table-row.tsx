import { cn } from "@/lib/utils";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function TableRow(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >
) {
  return (
    <tr
      {...props}
      className={cn("even:bg-muted m-0 border-t p-0", props.className)}
    />
  );
}
