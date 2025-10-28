import Link from "next/link";

export default function Home() {
  return (
    <div className="cpx grid grid-cols-2 gap-4 py-5 lg:grid-cols-4">
      {[
        "Introduction",
        "Getting Started",
        "Configuration",
        "Themes",
        "Markdown",
        "Deployment",
        "Project Structure",
      ].map((page) => (
        <PagesCard key={page} string={page} />
      ))}
      <div className="flex aspect-video flex-col items-center justify-center rounded-md border border-dashed p-2">
        <p className="font-heading font-semibold text-muted-foreground text-sm md:text-lg">
          Coming Soon
        </p>
      </div>
    </div>
  );
}

function PagesCard({ string }: { string: string }) {
  return (
    <Link
      className="relative flex aspect-video flex-col items-center justify-center rounded-md border border-dashed bg-card p-2 shadow hover:bg-accent dark:bg-card/50 dark:hover:bg-accent/50"
      href={`/${string}`}
    >
      <p className="font-heading font-semibold text-sm md:text-lg">{string}</p>
      <p className="text-muted-foreground text-xs">{string} block</p>
    </Link>
  );
}
