import type { BlockquoteHTMLAttributes, DetailedHTMLProps } from "react";
import { cn } from "@/lib/utils";

export function Blockquote(
  props: DetailedHTMLProps<
    BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  >,
) {
  return (
    <blockquote
      {...props}
      className={cn("", props.className)}
    >
      {props.children}
    </blockquote>
  );
}
