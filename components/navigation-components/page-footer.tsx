import Link from "next/link";

export function PageFooter() {
  return (
    <footer className="border-t border-dashed">
      <div className="container flex items-center justify-between py-6 text-xs md:text-sm px-4 md:px-6 lg:px-8">
        <p className="flex items-center gap-1 text-muted-foreground">
          <span>built by</span>
          <Link
            aria-label="twitter"
            className="font-medium text-foreground/90 hover:text-foreground hover:underline"
            href={`https://x.com`}
            rel="noreferrer"
            target="_blank"
          >
            nkurunziza saddy
          </Link>
        </p>
        <p className="text-muted-foreground uppercase tracking-widest text-[10px] font-mono opacity-70">
          &copy; {new Date().getFullYear()} muni
        </p>
      </div>
    </footer>
  );
}
