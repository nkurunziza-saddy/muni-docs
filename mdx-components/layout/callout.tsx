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
    <Alert variant={config.variant} className={cn("not-prose my-8 rounded-none border-l-4", className)}>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex items-center gap-2 mb-1">
            <Icon className="size-3.5 opacity-80" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] opacity-80">{(title ?? config.title).toLowerCase()}</span>
        </div>
        <AlertDescription className="no-mdx-block text-sm leading-relaxed">{children}</AlertDescription>
      </div>
    </Alert>
  );
}
