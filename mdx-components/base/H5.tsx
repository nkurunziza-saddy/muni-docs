import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "../heading";

export function H5(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >,
) {
  return (
    <Heading
      {...props}
      className={cn(
        "scroll-m-20 text-lg font-medium tracking-tight",
        props.className,
      )}
      level={5}
    />
  );
}
