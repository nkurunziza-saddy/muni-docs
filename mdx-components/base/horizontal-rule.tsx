import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function HorizontalRule(
  props: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>,
) {
  return (
    <hr {...props} className={cn(`border-t border-border`, props.className)} />
  );
}
