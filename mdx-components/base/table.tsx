import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Table(
  props: DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>,
) {
  return (
    <div className={cn("overflow-x-auto", props.className)}>
      <table {...props} className="w-full" />
    </div>
  );
}
