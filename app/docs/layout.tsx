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
      <div className="min-h-screen bg-background flex w-full">
        <DocsSidebar />

        <SidebarInset className="flex flex-col">
          <DocsHeader />

          <div className="flex flex-1">
            <main className="flex-1 px-6 py-6 md:px-8 md:py-8 lg:px-12">
              <div className="xl:hidden mb-6">
                <MobileTableOfContents />
              </div>

              <div className="">{children}</div>
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
