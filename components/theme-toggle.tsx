"use client";

import * as React from "react";
import {
  MoonIcon,
  SunIcon,
  MonitorIcon,
  CircleIcon,
  TerminalIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <SunIcon className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const themes = [
    { id: "light", name: "Light", icon: SunIcon },
    { id: "dark", name: "Dark", icon: MoonIcon },
    { id: "mono", name: "Mono", icon: TerminalIcon },
    { id: "mono-dark", name: "Mono Dark", icon: TerminalIcon },
  ];

  const getCurrentTheme = () => {
    if (theme === "system") {
      return typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme || "light";
  };

  const currentTheme = getCurrentTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {currentTheme === "minimal-dark" ? (
            <MoonIcon className="h-4 w-4" />
          ) : currentTheme === "mono" ? (
            <TerminalIcon className="h-4 w-4" />
          ) : (
            <SunIcon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs font-medium">
          Theme
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = currentTheme === themeOption.id;

          return (
            <DropdownMenuItem
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className="text-xs justify-between"
            >
              <span className="flex items-center gap-2">
                <Icon className="h-3.5 w-3.5" />
                {themeOption.name}
              </span>
              {isActive && (
                <div className="h-1.5 w-1.5 bg-primary rounded-full" />
              )}
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="text-xs justify-between"
        >
          <span className="flex items-center gap-2">
            <MonitorIcon className="h-3.5 w-3.5" />
            System
          </span>
          {theme === "system" && (
            <div className="h-1.5 w-1.5 bg-primary rounded-full" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
