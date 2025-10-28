"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

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
