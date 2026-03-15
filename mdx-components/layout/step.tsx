import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { H2, H3, H4, H5, H6 } from "@/mdx-components/base";

export type StepProps = {
  children: ReactNode;
  className?: string;
  title?: ReactNode | string;
  titleLevel?: 2 | 3 | 4 | 5 | 6;
};

export function Step({
  children,
  className,
  title,
  titleLevel = 3,
}: StepProps) {
  const HeadingComponent = {
    2: H2,
    3: H3,
    4: H4,
    5: H5,
    6: H6,
  }[titleLevel];

  return (
    <div className={cn("relative [counter-increment:step]", className)}>
      <div 
        className={cn(
          "absolute -left-[41px] top-0 flex size-5 items-center justify-center rounded-full bg-background border border-border shadow-sm text-[10px] font-bold font-mono",
          "before:content-[counter(step)]"
        )} 
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-primary/60">
            step
          </span>
          {title && (
            <div>
              {typeof title === "string" ? (
                <HeadingComponent className="!m-0 !text-xl !font-bold">
                  {title}
                </HeadingComponent>
              ) : (
                title
              )}
            </div>
          )}
        </div>
        <div className="prose-container">
          {children}
        </div>
      </div>
    </div>
  );
}
