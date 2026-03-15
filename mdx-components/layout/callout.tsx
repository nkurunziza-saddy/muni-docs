import {
  RiCheckboxCircleLine,
  RiInformationLine,
  RiLightbulbLine,
  RiErrorWarningLine,
  RiAlertLine,
} from "@remixicon/react";
import type { ReactNode } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const alertConfig = {
  note: {
    variant: "note",
    icon: RiInformationLine,
    title: "note",
    color: "text-muted-foreground",
    bg: "bg-muted/30 dark:bg-muted/20",
    border: "border-muted-foreground/20"
  },
  info: {
    variant: "info",
    icon: RiInformationLine,
    title: "info",
    color: "text-primary",
    bg: "bg-primary/10 dark:bg-primary/15",
    border: "border-primary/20"
  },
  warning: {
    variant: "warning",
    icon: RiAlertLine,
    title: "warning",
    color: "text-warning",
    bg: "bg-warning/10 dark:bg-warning/15",
    border: "border-warning/20"
  },
  danger: {
    variant: "destructive",
    icon: RiErrorWarningLine,
    title: "danger",
    color: "text-destructive",
    bg: "bg-destructive/10 dark:bg-destructive/15",
    border: "border-destructive/20"
  },
  tip: {
    variant: "tip",
    icon: RiLightbulbLine,
    title: "tip",
    color: "text-primary",
    bg: "bg-primary/15 dark:bg-primary/20",
    border: "border-primary/30"
  },
  success: {
    variant: "success",
    icon: RiCheckboxCircleLine,
    title: "success",
    color: "text-success",
    bg: "bg-success/10 dark:bg-success/15",
    border: "border-success/20"
  },
} as const;

export type CalloutProps = {
  children: ReactNode;
  type: keyof typeof alertConfig;
  title?: string;
  className?: string;
};

export function Callout({ children, type, title, className }: CalloutProps) {
  const config = alertConfig[type] || alertConfig.note;
  const Icon = config.icon;

  return (
    <div className={cn("my-8 group/callout", className)}>
      <Alert
        variant={config.variant}
        className={cn(
          "rounded-xl border shadow-none px-5 py-4 transition-all duration-300",
          config.bg,
          config.border
        )}
      >
        <div className="flex flex-col gap-2.5 w-full">
          <div className="flex items-center gap-2.5">
            <div className={cn("p-1 rounded-md bg-background border border-border/50 shadow-sm", config.color)}>
              <Icon className="size-3.5" />
            </div>
            <span className={cn("text-[10px] font-mono font-bold uppercase tracking-[0.25em]", config.color)}>
              {(title ?? config.title).toLowerCase()}
            </span>
          </div>
          <AlertDescription className="text-[14px] leading-relaxed text-foreground/90 prose-p:my-0 prose-a:font-bold">
            {children}
          </AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
