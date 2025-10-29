import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { CodeGroup } from "../interactive/code-group";
import { Subtitle } from "../subtitle";
import { Steps } from "./steps";

export function Div(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
  if (props.className === "code-group")
    return <CodeGroup {...(props as any)} />;
  if ("data-steps" in props) return <Steps {...(props as any)} />;
  if (props.role === "doc-subtitle") return <Subtitle {...(props as any)} />;
  return <div {...props} />;
}
