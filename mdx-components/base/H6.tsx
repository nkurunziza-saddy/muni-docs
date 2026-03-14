import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "../heading";

export function H6(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >,
) {
  return (
    <Heading
      {...props}
      className={cn(
        "",
        props.className,
      )}
      level={6}
    />
  );
}

