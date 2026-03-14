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
      className={cn("", props.className)}
    />
  );
}
