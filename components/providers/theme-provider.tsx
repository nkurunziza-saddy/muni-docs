"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

export const THEMES = [
  "minimal",
  "minimal-dark",
  "mono",
  "mono-dark",
  "system",
] as const;
export type ThemeName = (typeof THEMES)[number];

export function ThemeProvider({
  children,
  defaultTheme = "minimal",
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      themes={[...THEMES]}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
