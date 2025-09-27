"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export const THEME_FAMILIES = [
  "arctic",
  "mono",
  "sage",
  "slate",
  "ocean",
  //   "vanilla",
] as const;
export type ThemeFamily = (typeof THEME_FAMILIES)[number];

export const THEMES = [
  ...THEME_FAMILIES.flatMap((f) => [`${f}-light`, `${f}-dark`]),
  "system",
  "light",
  "dark",
] as const;
export type ThemeName = (typeof THEMES)[number];

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      defaultTheme={defaultTheme}
      themes={[...THEMES]}
      {...props}
    >
      {/* <ThemeScript /> */}
      {children}
    </NextThemesProvider>
  );
}

// function ThemeScript() {
//   React.useEffect(() => {
//     const html = document.documentElement;

//     const removeAllThemeClasses = () => {
//       THEME_FAMILIES.forEach((f) => {
//         html.classList.remove(f);
//         html.classList.remove(`${f}-dark`);
//       });
//       html.classList.remove("dark");
//     };

//     const detectPreviousFamily = (): ThemeFamily => {
//       const classes = Array.from(html.classList);
//       for (const f of THEME_FAMILIES) {
//         if (classes.includes(f) || classes.includes(`${f}-dark`)) {
//           return f;
//         }
//       }
//       return "vanilla";
//     };
//     let lastTheme: string | null = null;
//     const applyThemeClass = (theme: string | null) => {
//       if (theme === lastTheme) return;
//       lastTheme = theme;
//       removeAllThemeClasses();
//       if (!theme) return;

//       if (theme === "system") {
//         const prefersDark = window.matchMedia(
//           "(prefers-color-scheme: dark)"
//         ).matches;
//         const family = detectPreviousFamily();
//         if (prefersDark) {
//           html.classList.add(family === "vanilla" ? "dark" : `${family}-dark`);
//         } else {
//           html.classList.add(family === "vanilla" ? "" : family);
//         }
//         return;
//       }

//       if (theme === "light") {
//         return;
//       }

//       if (theme === "dark") {
//         html.classList.add("dark");
//         return;
//       }

//       const [family, mode] = theme.split("-") as [
//         ThemeFamily,
//         "light" | "dark"
//       ];

//       if (!THEME_FAMILIES.includes(family)) return;

//       html.classList.add(mode === "dark" ? `${family}-dark` : family);
//     };

//     const observer = new MutationObserver(() => {
//       const theme = html.getAttribute("data-theme");
//       applyThemeClass(theme);
//     });

//     observer.observe(html, {
//       attributes: true,
//       attributeFilter: ["data-theme"],
//     });

//     applyThemeClass(html.getAttribute("data-theme"));

//     return () => observer.disconnect();
//   }, []);

//   return null;
// }
