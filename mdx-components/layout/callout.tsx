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
    <Alert variant={config.variant} className={cn("not-prose my-4", className)}>
      <Icon />
      <AlertTitle>{(title ?? config.title).toLowerCase()}</AlertTitle>
      <AlertDescription className="no-mdx-block">{children}</AlertDescription>
    </Alert>
  );
}
