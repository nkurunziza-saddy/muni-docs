import type { DetailedHTMLProps, ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function TableHeader(
  props: DetailedHTMLProps<
    ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >,
) {
  return (
    <th
      {...props}
      className={cn("", props.className)}
    />
  );
}

