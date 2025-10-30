import type React from "react";
import { DocsHeader } from "@/components/navigation-components/docs-header";
import { DocsPagination } from "@/components/navigation-components/docs-pagination";
import { DocsSidebar } from "@/components/navigation-components/docs-sidebar";
import { MobileTableOfContents } from "@/components/navigation-components/mobile-tocs";
import { TableOfContents } from "@/components/navigation-components/tocs";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full overflow-x-hidden">
        <DocsSidebar />

        <SidebarInset className="flex flex-col min-w-0">
          <DocsHeader />

          <div className="flex flex-1 min-w-0">
            <main className="flex-1 px-4 py-4 md:px-8 md:py-8 lg:px-12 min-w-0 overflow-x-hidden">
              <div className="xl:hidden mb-6">
                <MobileTableOfContents />
              </div>

              <div className="w-full min-w-0 overflow-x-hidden">{children}</div>
              <div className="border-t border-border pt-6">
                <DocsPagination />
              </div>
            </main>

            <TableOfContents />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
