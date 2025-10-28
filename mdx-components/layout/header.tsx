import { cn } from "@/lib/utils";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Header(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return (
    <header
      {...props}
      className={cn("border-b border-b-input/85 pb-4", props.className)}
    />
  );
}
