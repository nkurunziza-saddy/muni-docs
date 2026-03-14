import {
  RiCheckboxCircleLine,
  RiInformationLine,
  RiLightbulbLine,
  RiErrorWarningLine,
} from "@remixicon/react";
import type { ReactNode } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

const alertConfig = {
  note: {
    variant: "note",
    icon: RiInformationLine,
    title: "note",
  },
  info: {
    variant: "info",
    icon: RiInformationLine,
    title: "info",
  },
  warning: {
    variant: "warning",
    icon: RiErrorWarningLine,
    title: "warning",
  },
  danger: {
    variant: "destructive",
    icon: RiErrorWarningLine,
    title: "danger",
  },
  tip: {
    variant: "tip",
    icon: RiLightbulbLine,
    title: "tip",
  },
  success: {
    variant: "success",
    icon: RiCheckboxCircleLine,
    title: "success",
  },
} as const;

export type CalloutProps = {
  children: ReactNode;
  type: keyof typeof alertConfig;
  title?: string;
  className?: string;
};

export function Callout({ children, type, title, className }: CalloutProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <Alert
      variant={config.variant}
      className={cn("not-prose my-6 rounded-lg border px-4 py-3", className)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <Icon className="size-4 opacity-70" />
          <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {(title ?? config.title).toLowerCase()}
          </span>
        </div>
        <AlertDescription className="no-mdx-block text-[15px] leading-relaxed">
          {children}
        </AlertDescription>
      </div>
    </Alert>
  );
}
