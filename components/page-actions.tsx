"use client";

import { ExternalLink, Github, MessageSquare, Sparkles } from "lucide-react";
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

  // Create a prompt for AI assistants
  const pageTitle =
    slug.split("/").pop()?.replace(/-/g, " ") || "documentation page";
  const prompt = `Please help me understand this ${pageTitle} documentation: ${rawUrl}`;

  const chatGptUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

  const actions = [
    {
      label: "Open in ChatGPT",
      icon: MessageSquare,
      href: chatGptUrl,
      description: "Get AI assistance with this page",
    },
    {
      label: "Open in Claude",
      icon: Sparkles,
      href: claudeUrl,
      description: "Get AI assistance with this page",
    },
    {
      label: "View Markdown",
      icon: Github,
      href: rawUrl,
      description: "View raw markdown source",
      external: true,
    },
    {
      label: "Suggest Changes",
      icon: ExternalLink,
      href: githubUrl,
      description: "Edit this page on GitHub",
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
            className={cn("text-xs min-w-0", className)}
          >
            <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
            <span className="truncate">Actions</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Page Actions</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-4 space-y-2">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.label}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  asChild
                >
                  <a
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className="flex items-start gap-3"
                  >
                    <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="text-left">
                      <div className="font-medium text-sm">{action.label}</div>
                      <div className="text-xs text-muted-foreground">
                        {action.description}
                      </div>
                    </div>
                  </a>
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
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("text-xs min-w-0", className)}
        >
          <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">Actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <DropdownMenuItem key={action.label} asChild>
              <a
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <div className="flex-1">
                  <div className="font-medium">{action.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
