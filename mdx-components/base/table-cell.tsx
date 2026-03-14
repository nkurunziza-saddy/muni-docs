import type { DetailedHTMLProps, TdHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function TableCell(
  props: DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableDataCellElement>,
    HTMLTableDataCellElement
  >,
) {
  return (
    <td
      {...props}
      className={cn("", props.className)}
    />
  );
}

