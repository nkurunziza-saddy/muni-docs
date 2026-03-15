import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Section(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>,
) {
  const classes = "border-t border-border mt-14 pt-6";

  // Footnotes in MDX are typically rendered as a <section data-footnotes>
  return (
    <section 
      {...props} 
      className={`${props.className || ""} ${"data-footnotes" in props ? classes : ""}`} 
    />
  );
}
