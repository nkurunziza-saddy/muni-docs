import * as React from "react";
import { cn } from "@/lib/utils";
import { Progress as ProgressPrimitive } from "@base-ui-components/react/progress";

function ProgressLabel({
  className,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Label>) {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      {...props}
    />
  );
}

function ProgressValue({
  className,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Value>) {
  return (
    <ProgressPrimitive.Value
      className={cn("col-start-2 text-right text-sm", className)}
      {...props}
    />
  );
}

function ProgressIndicator({
  className,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Indicator>) {
  return (
    <ProgressPrimitive.Indicator
      className={cn(
        "block h-full transition-all bg-accent-foreground duration-500 ease-in-out",
        className
      )}
      {...props}
    />
  );
}

function ProgressTrack({
  className,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Track>) {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "col-span-full h-1 w-full overflow-hidden rounded bg-muted",
        className
      )}
      {...props}
    />
  );
}

function Progress({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      className={cn("grid w-48 grid-cols-2 gap-y-2", className)}
      {...props}
    >
      {children}
      <ProgressValue />
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
}

export { ProgressLabel, Progress };

// usage
{
  /* <Progress>
      <ProgressLabel>
        Export data
      </ProgressLabel>
      </Progress>

       */
}
