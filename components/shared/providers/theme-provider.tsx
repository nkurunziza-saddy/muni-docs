"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import muniConfig from "@/muni.config";

export const THEMES = [
  "light",
  "dark",
  "system",
] as const;
export type ThemeName = (typeof THEMES)[number];

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      defaultTheme={muniConfig.defaultTheme || "system"}
      attribute="class"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
