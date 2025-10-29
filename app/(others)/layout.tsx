import { PageFooter } from "@/components/navigation-components/page-footer";
import { PageHeader } from "@/components/navigation-components/page-header";
import { BorderSeparator } from "@/components/ui/shared";
import { cn } from "@/lib/utils";

export default function OthersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
      <PageHeader />
      <main
        className={cn(
          "container relative grow",
          "before:-inset-y-20 before:-left-px before:absolute before:z-1 before:border-border before:border-dashed xl:before:border-l",
          "after:-inset-y-20 after:-right-px after:absolute after:z-1 after:border-border after:border-dashed xl:after:border-r"
        )}
      >
        <div className="min-h-screen">
          <div className="cpx space-y-2 py-5">
            <h1 className="font-bold font-heading text-4xl">
              Muni Documentations
            </h1>
            <p className="text-muted-foreground text-sm">
              Build your minimalistic, simple docs
            </p>
          </div>
          <BorderSeparator />
          {children}
        </div>
      </main>
      <PageFooter />
    </div>
  );
}
