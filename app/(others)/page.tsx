import Link from "next/link";
import { ArrowRight, BookOpen, Code, Palette, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: "Minimal Design",
      description: "Clean, uncluttered interface focused on content",
    },
    {
      icon: Code,
      title: "MDX Support",
      description: "Write with Markdown and React components",
    },
    {
      icon: Palette,
      title: "Multiple Themes",
      description: "Light, dark, mono, and mono-dark themes",
    },
    {
      icon: Zap,
      title: "Fast & Modern",
      description: "Built with Next.js 15 and Tailwind CSS 4",
    },
  ];

  const quickLinks = [
    { title: "Introduction", href: "/docs/introduction" },
    { title: "Getting Started", href: "/docs/getting-started" },
    { title: "Configuration", href: "/docs/configuration" },
    { title: "Themes", href: "/docs/themes" },
    { title: "Markdown", href: "/docs/markdown" },
    { title: "Deployment", href: "/docs/deployment" },
    { title: "Project Structure", href: "/docs/project-structure" },
  ];

  return (
    <div className="cpx py-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Muni Docs
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A minimal documentation template built with Next.js 15, TypeScript,
          and Tailwind CSS 4. Perfect for creating clean, professional
          documentation sites.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-base">
            <Link href="/docs/getting-started">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/docs/introduction">Learn More</Link>
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Why Choose Muni?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">Documentation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block p-4 rounded-lg border border-dashed hover:border-solid hover:bg-accent/50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium group-hover:text-primary transition-colors">
                  {link.title}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-4 py-8 border-t border-border">
        <h2 className="text-xl font-semibold">Ready to build your docs?</h2>
        <p className="text-muted-foreground">
          Start with our getting started guide and have your documentation site
          running in minutes.
        </p>
        <Button asChild size="lg">
          <Link href="/docs/getting-started">
            Start Building
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
