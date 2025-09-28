import { DocsHeader } from "@/components/navigation-components/docs-header";

export default function OthersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={` `}>
      <DocsHeader />
      {children}
    </div>
  );
}
