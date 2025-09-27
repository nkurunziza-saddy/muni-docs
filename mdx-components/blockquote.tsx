import { cn } from "@/lib/utils";
import type { BlockquoteHTMLAttributes, DetailedHTMLProps } from "react";

export function Blockquote(
  props: DetailedHTMLProps<
    BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  >
) {
  return (
    <blockquote
      {...props}
      className={cn("border-l-2 pl-6 italic", props.className)}
    >
      {props.children}
    </blockquote>
  );
}
