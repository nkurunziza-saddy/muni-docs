import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function ListItem(
  props: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>,
) {
  return (
    <li {...props} className={cn("", props.className)} />
  );
}
