import { type Frontmatter } from "@/lib/docs";

export function FrontmatterMeta({ frontmatter }: { frontmatter: Frontmatter }) {
  const { author, date } = frontmatter;
  if (!author && !date) return null;

  const displayDate = date ? new Date(date).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  }).toLowerCase() : null;

  return (
    <div className="text-[11px] font-mono text-muted-foreground space-y-1 uppercase tracking-widest opacity-70">
      {displayDate && <p>last updated on {displayDate}</p>}
      {author && <p>written by {author.toLowerCase()}</p>}
    </div>
  );
}
