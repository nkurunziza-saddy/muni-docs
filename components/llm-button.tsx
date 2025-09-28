"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { getRawContent } from "@/lib/actions/get-raw-content";
import muniConfig from "../muni.config";

interface NavigationItem {
  title: string;
  slug: string;
  items?: NavigationItem[];
}

const allNavItems: NavigationItem[] = [];
const flattenNav = (items: NavigationItem[]) => {
  for (const item of items) {
    allNavItems.push(item);
    if (item.items) {
      flattenNav(item.items);
    }
  }
};
flattenNav(muniConfig.navigation);

const getSlugFromPath = (path: string): string => {
  const pathSegment = path.replace(/^\/docs\/?/, "");
  if (pathSegment === "") return "index";

  let found = allNavItems.find((item) => item.slug === pathSegment);
  if (found) return found.slug;

  found = allNavItems.find((item) => item.slug === pathSegment + "/index");
  if (found) return found.slug;

  return pathSegment;
};

export function LLMButton() {
  const path = usePathname();
  const [rawContent, setRawContent] = useState<string>("");

  const loadAndSetRawContent = async () => {
    if (path) {
      const slug = getSlugFromPath(path);
      const res = await getRawContent(slug);
      setRawContent(res);
      return res;
    }
    return "";
  };

  const copyToClipboard = async () => {
    let contentToCopy = rawContent;
    if (!contentToCopy) {
      contentToCopy = await loadAndSetRawContent();
    }
    if (contentToCopy) {
      navigator.clipboard.writeText(contentToCopy);
    }
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const fSlug = path === "index" ? "" : path;

  const encodedPrompt = encodeURIComponent(
    `Read from this URL: ${siteUrl}/docs/${fSlug} and explain it to me.`
  );

  const openInChatGPT = () => {
    const url = `https://chat.openai.com/?prompt=${encodedPrompt}`;
    window.open(url, "_blank");
  };

  const openInClaude = () => {
    const url = `https://claude.ai/new?q=${encodedPrompt}`;
    window.open(url, "_blank");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"sm"}
          className="bg-muted/50 rounded dark:bg-muted/50 flex items-center gap-2"
        >
          Markdown
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={copyToClipboard}>Copy page</DropdownMenuItem>
        <DropdownMenuItem onClick={openInChatGPT}>
          Open in ChatGPT
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openInClaude}>
          Open in Claude AI
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
