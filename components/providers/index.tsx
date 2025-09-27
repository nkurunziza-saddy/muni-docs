"use client";

import { ThemeProvider } from "@/lib/hooks/use-theme";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
