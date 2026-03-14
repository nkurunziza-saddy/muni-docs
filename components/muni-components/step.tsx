import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { H2, H3, H4, H5, H6 } from "@/mdx-components/base";

export type StepProps = {
  children: ReactNode;
  className?: string;
  title: ReactNode | string;
  titleLevel?: 2 | 3 | 4 | 5 | 6;
  step: number;
};

export function Step({
  children,
  className,
  title,
  titleLevel = 2,
  step,
}: StepProps) {
  const HeadingComponent = {
    2: H2,
    3: H3,
    4: H4,
    5: H5,
    6: H6,
  }[titleLevel];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        step {step.toString().padStart(2, "0")}
      </div>
      <div>
        {typeof title === "string" ? (
          <HeadingComponent className="!mt-0 !mb-2">{title}</HeadingComponent>
        ) : (
          title
        )}
      </div>
      <div className="prose dark:prose-invert">{children}</div>
    </div>
  );
}
