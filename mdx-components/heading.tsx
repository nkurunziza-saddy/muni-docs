import { RiLinksLine } from "@remixicon/react";
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
        "group flex items-center gap-3 scroll-m-32",
        props.className,
      )}
    >
      <span className="font-mono text-[10px] font-bold text-primary opacity-0 -ml-6 transition-all group-hover:opacity-30 group-hover:ml-0 hidden md:inline">
        {Array(level).fill('#').join('')}
      </span>
      <span className="flex-1">{props.children}</span>
      {props.id && (
        <a 
          href={`#${props.id}`} 
          className="opacity-0 group-hover:opacity-20 hover:!opacity-100 transition-opacity"
          aria-label="Link to section"
        >
          <RiLinksLine className="size-4" />
        </a>
      )}
    </Component>
  );
}
