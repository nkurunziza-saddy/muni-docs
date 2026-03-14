"use client";

import { RiComputerLine, RiMoonLine, RiSunLine } from "@remixicon/react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
        <RiSunLine className="size-4" />
        <span className="sr-only">toggle theme</span>
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" />}>
        {theme === "dark" ? (
          <RiMoonLine className="size-4" />
        ) : theme === "light" ? (
          <RiSunLine className="size-4" />
        ) : (
          <RiComputerLine className="size-4" />
        )}
        <span className="sr-only">toggle theme</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-50">
            theme
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="justify-between font-mono text-xs uppercase tracking-wide"
          >
            <span className="flex items-center gap-2">
              <RiSunLine className="size-3.5" />
              light
            </span>
            {theme === "light" && (
              <div className="size-1.5 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="justify-between font-mono text-xs uppercase tracking-wide"
          >
            <span className="flex items-center gap-2">
              <RiMoonLine className="size-3.5" />
              dark
            </span>
            {theme === "dark" && (
              <div className="size-1.5 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="justify-between font-mono text-xs uppercase tracking-wide"
          >
            <span className="flex items-center gap-2">
              <RiComputerLine className="size-3.5" />
              system
            </span>
            {theme === "system" && (
              <div className="size-1.5 bg-primary rounded-full" />
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
