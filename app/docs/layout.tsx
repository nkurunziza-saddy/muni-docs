import type React from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/navigation-components/sidebar-left";
import { ThemeToggle } from "@/components/theme-toggle";
import { DocsPagination } from "@/components/navigation-components/docs-pagination";
import { TableOfContents } from "@/components/navigation-components/table-of-contents";
import { SearchComp } from "@/components/search";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarLeft />
      <SidebarInset className="flex flex-col">
        <header className="bg-background/80 backdrop-blur-md sticky top-0 flex h-16 border-b border-border/40 z-50 shrink-0 items-center gap-2 px-6">
          <SearchComp />
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-2 py-1 bg-muted/50 rounded-md">
              <span className="text-xs font-mono text-muted-foreground">v</span>
              <span className="text-xs font-mono font-semibold">4.0.0</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="flex flex-1">
          <main className="flex-1 px-4 py-8">
            <div className="container mx-auto max-w-4xl">
              {children}
              <DocsPagination />
            </div>
          </main>

          <aside className="hidden xl:block w-64 shrink-0">
            <div className="sticky top-20 p-4">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
