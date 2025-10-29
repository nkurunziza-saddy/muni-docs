import type { ReactNode } from "react";
import { Step } from "@/components/muni-components/step";
import { Steps as Steps_ } from "@/components/muni-components/steps";

export function Steps({ children }: { children: ReactNode }) {
  if (!Array.isArray(children)) return null;
  return (
    <Steps_ className="not-prose">
      {children.map(({ props }, i) => {
        const [title, ...children] = Array.isArray(props.children)
          ? props.children
          : [props.children];
        return (
          <Step key={i} title={title} step={i + 1}>
            {children}
          </Step>
        );
      })}
    </Steps_>
  );
}
