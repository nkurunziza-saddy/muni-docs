import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Header(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
) {
  return (
    <header
      {...props}
      className={cn("border-b border-b-input/85 pb-4", props.className)}
    />
  );
}
