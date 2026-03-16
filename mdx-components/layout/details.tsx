import React, { type DetailedHTMLProps, type DetailsHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Summary } from "./summary";

export function Details({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  DetailsHTMLAttributes<HTMLDetailsElement>,
  HTMLDetailsElement
>) {
  const childrenArray = React.Children.toArray(children);
  
  // Find the summary component
  const summary = childrenArray.find(
    (child) => 
      React.isValidElement(child) && 
      (child.type === Summary || 
       (child.type as any)?.name === "Summary" || 
       (child.type as any) === "summary")
  );
  
  // Get everything else as content
  const content = childrenArray.filter((child) => child !== summary);

  return (
    <details 
      {...props} 
      className={cn(
        "group my-6 border border-border/30 rounded-xl overflow-hidden bg-muted/5 transition-all duration-300 open:bg-muted/10",
        className
      )}
    >
      {summary}
      <div className="px-6 pb-6 mdx-details-content">
        {content}
      </div>
    </details>
  );
}
