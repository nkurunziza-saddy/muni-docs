"use client";

import { RiChat1Line, RiExternalLinkLine, RiGithubLine, RiSparkling2Line } from "@remixicon/react";
import { useIsMobile } from "@/lib/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface PageActionsProps {
  slug: string;
  className?: string;
}

export function PageActions({ slug, className }: PageActionsProps) {
  const isMobile = useIsMobile();
  const githubUrl = `https://github.com/nkurunziza-saddy/muni-docs/blob/main/content/pages/${slug}.mdx`;
  const rawUrl = `https://raw.githubusercontent.com/nkurunziza-saddy/muni-docs/main/content/pages/${slug}.mdx`;

  // create a prompt for ai assistants
  const pageTitle =
    slug.split("/").pop()?.replace(/-/g, " ") || "documentation page";
  const prompt = `please help me understand this ${pageTitle} documentation: ${rawUrl}`;

  const chatGptUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

  const actions = [
    {
      label: "open in chatgpt",
      icon: RiChat1Line,
      href: chatGptUrl,
      description: "get ai assistance with this page",
    },
    {
      label: "open in claude",
      icon: RiSparkling2Line,
      href: claudeUrl,
      description: "get ai assistance with this page",
    },
    {
      label: "view markdown",
      icon: RiGithubLine,
      href: rawUrl,
      description: "view raw markdown source",
      external: true,
    },
    {
      label: "suggest changes",
      icon: RiExternalLinkLine,
      href: githubUrl,
      description: "edit this page on github",
      external: true,
    },
  ];

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn("text-[10px] font-mono uppercase tracking-widest min-w-0 border-dashed", className)}
          >
            <RiExternalLinkLine className="me-2" />
            <span className="truncate">actions</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>page actions</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 space-y-2">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  render={
                    <a
                      href={action.href}
                      target={action.external ? "_blank" : undefined}
                      rel={action.external ? "noopener noreferrer" : undefined}
                    />
                  }
                >
                  <Icon className="mt-0.5" />
                  <div className="text-left ms-3">
                    <div className="font-medium text-sm">{action.label}</div>
                    <div className="text-xs text-muted-foreground">
                      {action.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className={cn("text-[10px] font-mono uppercase tracking-widest min-w-0 border-dashed", className)}
          />
        }
      >
        <RiExternalLinkLine className="me-2" />
        <span className="truncate">actions</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem
              key={action.label}
              render={
                <a
                  href={action.href}
                  target={action.external ? "_blank" : undefined}
                  rel={action.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-2"
                />
              }
            >
              <Icon />
              <div className="flex-1">
                <div className="font-medium">{action.label}</div>
                <div className="text-xs text-muted-foreground">
                  {action.description}
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
