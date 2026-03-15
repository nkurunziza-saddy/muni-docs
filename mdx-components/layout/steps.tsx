import { type ReactNode, Children, isValidElement } from "react";
import { cn } from "@/lib/utils";

export interface StepsProps {
  children: ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  const childrenArray = Children.toArray(children).filter(isValidElement);

  return (
    <div
      className={cn(
        "steps-container relative my-12 ml-4 border-l border-border/50 pl-8 space-y-12 [counter-reset:step]",
        className
      )}
    >
      {childrenArray.map((child: any, i) => {
        // MDX passes children as props to the Step component
        // We want to pass the index + 1 as the step number if needed, 
        // but our Step component now uses CSS counters.
        return child;
      })}
    </div>
  );
}
