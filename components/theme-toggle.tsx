"use client";

import * as React from "react";
import {
  MoonIcon,
  SunIcon,
  MonitorIcon,
  PaletteIcon,
  TerminalIcon,
  LeafIcon,
  MinusIcon,
  WavesIcon,
  SnowflakeIcon,
  CircleIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { THEME_FAMILIES } from "./providers/theme-provider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const getCurrentThemeInfo = () => {
    const currentTheme = theme as string;
    const isSystem = currentTheme === "system";

    const systemPrefersDark =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : false;

    const isDark = isSystem
      ? systemPrefersDark
      : currentTheme === "dark" || currentTheme.endsWith("-dark");

    const themeFamily = isSystem
      ? typeof window !== "undefined"
        ? Array.from(document.documentElement.classList)
            .find((c) =>
              THEME_FAMILIES.some((f) => c === f || c === `${f}-dark`)
            )
            ?.replace(/-dark$/, "") ?? "vanilla"
        : "vanilla"
      : currentTheme === "dark" || currentTheme === "light"
      ? "vanilla"
      : currentTheme.replace(/-light$/, "").replace(/-dark$/, "");

    return { isDark, themeFamily, currentTheme, isSystem };
  };

  const { isDark, themeFamily, isSystem, currentTheme } = getCurrentThemeInfo();

  const themeOptions = [
    {
      id: "vanilla",
      name: "Vanilla",
      icon: CircleIcon,
      description: "Just monochramatic",
    },
    {
      id: "arctic",
      name: "Arctic Professional",
      icon: SnowflakeIcon,
      description: "Clean blue accents",
    },
    {
      id: "mono",
      name: "Monospace Technical",
      icon: TerminalIcon,
      description: "Terminal inspired",
    },
    {
      id: "sage",
      name: "Sage Corporate",
      icon: LeafIcon,
      description: "Professional green",
    },
    {
      id: "slate",
      name: "Slate Minimal",
      icon: MinusIcon,
      description: "Ultra clean",
    },
    {
      id: "ocean",
      name: "Ocean Depth",
      icon: WavesIcon,
      description: "Deep blue tones",
    },
  ];

  const setThemeFamily = (family: string) => {
    const mode = isDark ? "dark" : "light";
    const toSet = family === "vanilla" ? mode : `${family}-${mode}`;
    setTheme(toSet);
  };

  const setMode = (mode: "light" | "dark" | "system") => {
    if (mode === "system") {
      setTheme("system");
      return;
    }
    const isVanilla = themeFamily === "vanilla";
    const toSet = isVanilla ? mode : `${themeFamily}-${mode}`;
    setTheme(toSet);
  };

  const isModeActive = (mode: "light" | "dark" | "system") => {
    if (mode === "system") return currentTheme === "system";
    if (themeFamily === "vanilla" && mode === "light")
      return currentTheme === "light";
    if (themeFamily === "vanilla" && mode === "dark")
      return currentTheme === "dark";
    if (currentTheme === "system") {
      if (typeof window === "undefined") return false;

      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return (mode === "dark") === prefersDark;
    }
    return currentTheme.endsWith(`-${mode}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <PaletteIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-medium">
          Theme Settings
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setMode("light")}
          className="justify-between"
        >
          <span className="flex items-center gap-2">
            <SunIcon className="h-4 w-4" />
            Light
          </span>
          {isModeActive("light") && (
            <div className="h-2 w-2 bg-primary rounded-full" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setMode("dark")}
          className="justify-between"
        >
          <span className="flex items-center gap-2">
            <MoonIcon className="h-4 w-4" />
            Dark
          </span>
          {isModeActive("dark") && (
            <div className="h-2 w-2 bg-primary rounded-full" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setMode("system")}
          className="justify-between"
        >
          <span className="flex items-center gap-2">
            <MonitorIcon className="h-4 w-4" />
            System
          </span>
          {isModeActive("system") && (
            <div className="h-2 w-2 bg-primary rounded-full" />
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <PaletteIcon className="h-4 w-4 mr-2" />
            Change Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="w-64">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = themeFamily === option.id;
              return (
                <DropdownMenuItem
                  key={option.id}
                  onClick={() => setThemeFamily(option.id as any)}
                  className="justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="font-medium">{option.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0" />
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
          Current:{" "}
          {themeOptions.find((t) => t.id === themeFamily)?.name ?? "Vanilla"}
          {currentTheme === "system"
            ? " (System)"
            : isDark
            ? " (Dark)"
            : " (Light)"}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
