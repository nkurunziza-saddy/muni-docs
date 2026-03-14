import type React from "react";
import { DocsHeader } from "@/components/navigation-components/docs-header";
import { DocsPagination } from "@/components/navigation-components/docs-pagination";
import { DocsSidebar } from "@/components/navigation-components/docs-sidebar";
import { MobileTableOfContents } from "@/components/navigation-components/mobile-tocs";
import { TableOfContents } from "@/components/navigation-components/tocs";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import muniConfig from "@/muni.config";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <DocsSidebar />

        <SidebarInset className="flex flex-col min-w-0 bg-background transition-colors duration-500">
          <DocsHeader />

          <div className="flex flex-1 min-w-0 justify-center">
            <div className="flex-1 max-w-4xl px-4 py-10 md:px-8 md:py-12 lg:px-12 min-w-0">
              {muniConfig.features?.toc !== false && (
                <div className="xl:hidden mb-8">
                  <MobileTableOfContents />
                </div>
              )}

              <div className="w-full min-w-0">{children}</div>

              <div className="mt-16 pt-8 border-t border-border/10 border-dashed">
                <DocsPagination />
              </div>
            </div>

            <TableOfContents />
          </div>

        </SidebarInset>

      </div>
    </SidebarProvider>
  );
}
