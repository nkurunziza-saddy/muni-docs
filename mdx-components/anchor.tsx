"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnchorProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

export function Anchor({ children, href, className }: AnchorProps) {
  const pathname = usePathname();
  const classes = cn(
    "font-medium text-primary underline-offset-4 hover:underline",
    className,
  );

  if (href?.startsWith("#")) {
    return (
      <a className={classes} href={`${pathname}${href}`}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href ?? "#"} className={classes}>
      {children}
    </Link>
  );
}
