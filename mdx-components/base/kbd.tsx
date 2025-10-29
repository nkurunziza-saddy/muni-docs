import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Kbd(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
) {
  return (
    <kbd
      {...props}
      className={cn(
        "px-[0.3rem] py-[0.2rem] text-xs font-sans bg-muted border rounded-md",
        props.className,
      )}
    />
  );
}
