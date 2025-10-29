import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "../heading";

export function H2(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >,
) {
  return (
    <Heading
      {...props}
      className={cn(
        "scroll-m-20 text-3xl font-bold tracking-tight first:mt-0 ",
        props.className,
      )}
      level={2}
    />
  );
}
