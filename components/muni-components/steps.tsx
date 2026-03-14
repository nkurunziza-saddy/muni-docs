import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type StepsProps = {
  children: ReactNode;
  className?: string;
};

export function Steps({ children, className }: StepsProps) {
  return (
    <div
      className={cn("space-y-8", className)}
    >
      {children}
    </div>
  );
}
