import { PageFooter } from "@/components/shared/navigation/page-footer";
import { PageHeader } from "@/components/shared/navigation/page-header";
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
          "container relative grow px-4 md:px-6 lg:px-8",
          "before:-inset-y-20 before:-left-px before:absolute before:z-1 before:border-border before:border-dashed xl:before:border-l",
          "after:-inset-y-20 after:-right-px after:absolute after:z-1 after:border-border after:border-dashed xl:after:border-r"
        )}
      >
        <div className="min-h-screen">
          <div className="space-y-2 py-8">
            <h1 className="font-mono font-bold text-4xl lowercase tracking-tighter">
              muni documentations
            </h1>
            <p className="font-mono text-muted-foreground text-xs uppercase tracking-widest opacity-60">
              build your minimalistic, simple docs
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
