import Link from "next/link";

export function PageFooter() {
  return (
    <footer className="border-t border-dashed">
      <div className="cpx container flex items-center justify-between py-5 text-xs md:text-sm">
        <p className="flex items-center gap-1 text-muted-foreground">
          <span>Built by</span>
          <Link
            aria-label="Twitter"
            className="font-medium text-foreground/90 hover:text-foreground hover:underline"
            href={`https://x.com`}
            rel="noreferrer"
            target="_blank"
          >
            Nkurunziza Saddy
          </Link>
        </p>
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} Muni
        </p>
      </div>
    </footer>
  );
}
