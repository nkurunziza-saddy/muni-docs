import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type UnorderedListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

type OrderedListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>;

type ListProps = (UnorderedListProps | OrderedListProps) & {
  ordered?: boolean;
};

export function List({ ordered = false, ...props }: ListProps) {
  if (ordered) {
    const { className, ...rest } = props as OrderedListProps;
    return (
      <ol
        {...rest}
        className={cn("", className)}
      />
    );
  } else {
    const { className, ...rest } = props as UnorderedListProps;
    return (
      <ul
        {...rest}
        className={cn("", className)}
      />
    );
  }
}
