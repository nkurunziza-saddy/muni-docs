import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <main className="container mx-auto flex flex-col items-center justify-center text-center px-4 py-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
          Welcome to Muni
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
          A powerful, modern documentation engine built with Next.js, MDX, and
          Tailwind CSS. Create beautiful, fast, and feature-rich documentation
          sites with ease.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg">
            <Link href="/docs">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://github.com/nkurunziza-saddy/muni-docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </div>
      </main>
      <footer className="py-6 text-sm text-muted-foreground">
        <p>Built with Muni. Powered by Next.js.</p>
      </footer>
    </div>
  );
}
