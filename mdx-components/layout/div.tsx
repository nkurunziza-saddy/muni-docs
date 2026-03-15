import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Steps } from "./steps";

export function Div(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
  if ("data-steps" in props) return <Steps {...(props as any)} />;
  if (props.role === "doc-subtitle") {
    return (
      <div {...props} className="text-lg text-muted-foreground mt-2">
        {props.children}
      </div>
    );
  }
  return <div {...props} />;
}
