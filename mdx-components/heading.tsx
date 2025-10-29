import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Heading({
  level,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> & {
  level: 1 | 2 | 3 | 4 | 5 | 6;
}) {
  const Component = `h${level}` as any;
  return (
    <Component
      {...props}
      id={props.id}
      className={cn(
        "relative items-center font-semibold text-foreground gap-[0.25em] leading-[1.5em]",
        props.className,
      )}
    >
      {props.children}
    </Component>
  );
}
