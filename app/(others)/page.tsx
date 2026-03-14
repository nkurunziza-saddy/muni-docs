import Link from "next/link";
import { RiArrowRightLine, RiBookOpenLine, RiCodeLine, RiPaletteLine, RiFlashlightLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Home() {
  const features = [
    {
      icon: RiBookOpenLine,
      title: "minimal design",
      description: "clean, uncluttered interface focused on content",
    },
    {
      icon: RiCodeLine,
      title: "mdx support",
      description: "write with markdown and react components",
    },
    {
      icon: RiPaletteLine,
      title: "multiple themes",
      description: "light, dark, mono, and mono-dark themes",
    },
    {
      icon: RiFlashlightLine,
      title: "fast & modern",
      description: "built with next.js 15 and tailwind css 4",
    },
  ];

  const quickLinks = [
    { title: "introduction", href: "/docs/introduction" },
    { title: "getting started", href: "/docs/getting-started" },
    { title: "configuration", href: "/docs/configuration" },
    { title: "themes", href: "/docs/themes" },
    { title: "markdown", href: "/docs/markdown" },
    { title: "deployment", href: "/docs/deployment" },
    { title: "project structure", href: "/docs/project-structure" },
  ];

  return (
    <div className="container py-24 space-y-48">
      {/* hero section */}
      <div className="relative flex flex-col items-start space-y-12 max-w-5xl">
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="size-2.5 bg-primary" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">industrial documentation engine</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] lowercase">
              muni<span className="text-primary">.</span>docs
            </h1>
        </div>
        
        <p className="text-2xl md:text-3xl text-muted-foreground/80 leading-tight tracking-tight max-w-3xl lowercase">
          a high-performance, minimal documentation template engineered with next.js 15 and tailwind css 4.
        </p>

        <div className="flex flex-wrap gap-6 pt-4">
          <Button
            render={<Link href="/docs/getting-started" />}
            size="lg"
            className="h-16 px-10 text-[11px] font-mono uppercase tracking-[0.2em] font-bold border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all"
          >
            get started
            <RiArrowRightLine className="ms-3 size-5" />
          </Button>
          <Button
            render={<Link href="/docs/introduction" />}
            variant="outline"
            size="lg"
            className="h-16 px-10 text-[11px] font-mono uppercase tracking-[0.2em] font-bold border-2 border-border hover:border-foreground transition-all"
          >
            learn more
          </Button>
        </div>
      </div>

      {/* features section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-border/10">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className={cn(
                "p-10 space-y-8 border-b border-border/10 md:border-r last:border-r-0",
                i === 3 && "lg:border-r-0"
              )}>
                <div className="flex items-center justify-between">
                    <Icon className="size-6 opacity-30 text-primary" />
                    <span className="text-[11px] font-mono opacity-20 font-bold">0{i + 1}</span>
                </div>
                <div className="space-y-3">
                    <h3 className="font-bold text-[12px] font-mono uppercase tracking-[0.25em]">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed lowercase opacity-70">
                    {feature.description}
                    </p>
                </div>
              </div>
            );
          })}
      </div>

      {/* quick links section */}
      <div className="space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/10 pb-12">
            <h2 className="text-4xl font-bold tracking-tighter lowercase">documentation index</h2>
            <p className="text-[15px] font-mono text-muted-foreground/60 max-w-xs lowercase tracking-tight">quick access to the core modules and guides.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/10 border border-border/10">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-background p-10 hover:bg-muted/30 transition-all group flex flex-col justify-between h-56 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-1 h-0 bg-primary/40 transition-all duration-500 group-hover:h-full" />
              <span className="text-[11px] font-mono opacity-20 font-bold uppercase tracking-[0.3em]">module</span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl lowercase group-hover:text-primary transition-colors">
                  {link.title}
                </span>
                <RiArrowRightLine className="size-6 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-2 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* cta section */}
      <div className="flex flex-col items-center text-center space-y-12 py-48 border-t border-border/10 border-dashed relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 bg-primary rotate-45" />
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter lowercase max-w-3xl leading-[0.95]">ready to build your engine?</h2>
        <Button 
            render={<Link href="/docs/getting-started" />} 
            size="lg"
            className="h-20 px-16 text-[12px] font-mono uppercase tracking-[0.3em] font-bold border-2 border-foreground bg-foreground text-background hover:bg-background hover:text-foreground transition-all"
        >
          start building
          <RiArrowRightLine className="ms-4 size-6" />
        </Button>
      </div>
    </div>
  );
}
