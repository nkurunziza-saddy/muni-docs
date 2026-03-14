"use client";

import { RiComputerLine, RiMoonLine, RiSunLine, RiTerminalLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import * as React from "react";

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
      <Button variant="ghost" size="icon-sm">
        <RiSunLine />
        <span className="sr-only">toggle theme</span>
      </Button>
    );
  }

  const themes = [
    { id: "light", name: "light", icon: RiSunLine },
    { id: "dark", name: "dark", icon: RiMoonLine },
    { id: "mono", name: "mono", icon: RiTerminalLine },
    { id: "mono-dark", name: "mono dark", icon: RiTerminalLine },
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
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        {currentTheme === "minimal-dark" ? (
          <RiMoonLine />
        ) : currentTheme === "mono" ? (
          <RiTerminalLine />
        ) : (
          <RiSunLine />
        )}
        <span className="sr-only">toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>theme</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = currentTheme === themeOption.id;

          return (
            <DropdownMenuItem
              key={themeOption.id}
              onClick={() => setTheme(themeOption.id)}
              className="justify-between"
            >
              <span className="flex items-center gap-2">
                <Icon />
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
          className="justify-between"
        >
          <span className="flex items-center gap-2">
            <RiComputerLine />
            system
          </span>
          {theme === "system" && (
            <div className="h-1.5 w-1.5 bg-primary rounded-full" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
