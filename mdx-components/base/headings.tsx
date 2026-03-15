import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "../heading";

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const H1 = (props: HeadingProps) => <Heading {...props} level={1} className={cn("", props.className)} />;
export const H2 = (props: HeadingProps) => <Heading {...props} level={2} className={cn("", props.className)} />;
export const H3 = (props: HeadingProps) => <Heading {...props} level={3} className={cn("", props.className)} />;
export const H4 = (props: HeadingProps) => <Heading {...props} level={4} className={cn("", props.className)} />;
export const H5 = (props: HeadingProps) => <Heading {...props} level={5} className={cn("", props.className)} />;
export const H6 = (props: HeadingProps) => <Heading {...props} level={6} className={cn("", props.className)} />;
