import Link from "next/link";
import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { cn } from "@/lib/utils";

export function Autolink(
  props: Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "ref"
  >,
) {
  if (!props.href) return null;

  return (
    <Link
      {...props}
      className={cn("underline hover:text-primary", props.className)}
      href={props.href}
    />
  );
}
