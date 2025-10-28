import type { ReactNode } from "react";
import { Callout, type CalloutProps } from "./callout";

export type InfoBoxProps = {
  children: ReactNode;
  type: CalloutProps["type"];
  title?: string;
  className?: string;
};

export function InfoBox({ children, type, title, className }: InfoBoxProps) {
  return (
    <Callout type={type} title={title} className={className}>
      {children}
    </Callout>
  );
}
