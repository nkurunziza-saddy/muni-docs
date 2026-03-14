import Link from "next/link";
import { RiArrowRightLine, RiBookOpenLine, RiCodeLine, RiPaletteLine, RiFlashlightLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";

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
    <div className="cpx py-12 space-y-20">
      {/* hero section */}
      <div className="text-center space-y-8 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight lowercase">
          muni docs
        </h1>
        <p className="text-lg text-muted-foreground">
          a minimal documentation template built with next.js 15, typescript,
          and tailwind css 4. perfect for creating clean, professional
          documentation sites.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            render={<Link href="/docs/getting-started" />}
            size="lg"
          >
            get started
            <RiArrowRightLine className="ms-2" />
          </Button>
          <Button
            render={<Link href="/docs/introduction" />}
            variant="outline"
            size="lg"
          >
            learn more
          </Button>
        </div>
      </div>

      {/* features section */}
      <div className="space-y-12">
        <h2 className="text-2xl font-semibold text-center lowercase">why choose muni?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-muted/50 text-foreground">
                  <Icon className="size-6" />
                </div>
                <div className="space-y-2">
                    <h3 className="font-semibold text-sm uppercase tracking-widest opacity-80">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                    {feature.description}
                    </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* quick links section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-center lowercase">documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-4 border border-dashed hover:border-solid hover:bg-muted/30 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm group-hover:text-primary transition-colors lowercase">
                  {link.title}
                </span>
                <RiArrowRightLine className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* cta section */}
      <div className="text-center space-y-6 py-12 border-t border-border border-dashed">
        <h2 className="text-xl font-semibold lowercase">ready to build your docs?</h2>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          start with our getting started guide and have your documentation site
          running in minutes.
        </p>
        <Button render={<Link href="/docs/getting-started" />} size="lg">
          start building
          <RiArrowRightLine className="ms-2" />
        </Button>
      </div>
    </div>
  );
}
