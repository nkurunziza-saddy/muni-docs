import type React from "react";
import { SidebarLeft } from "@/components/navigation-components/sidebar-left";
import { DocsPagination } from "@/components/navigation-components/docs-pagination";
import { TableOfContents } from "@/components/navigation-components/table-of-contents";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DocsHeader } from "@/components/navigation-components/docs-header";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="grid md:grid-cols-[18rem_1fr]">
        <aside className="hidden bg-sidebar backdrop-blur-sm md:block h-screen sticky top-0">
          <div className="flex justify-end h-full">
            <div className="w-64 bg-sidebar backdrop-blur-sm border-r">
              <SidebarLeft />
            </div>
          </div>
        </aside>

        <div>
          <DocsHeader />
          <main className="relative py-8 px-6">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1fr_256px]">
              <div className="min-w-0">
                {children}
                <DocsPagination />
              </div>
              <div className="hidden lg:block">
                <div className="sticky top-24 space-y-4">
                  <TableOfContents />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
