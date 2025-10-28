# Muni

A minimal, fast documentation template built with Next.js and Tailwind CSS.

## Philosophy

Muni is designed around the principle of **less is more**. Every component, every line of code, every design decision is made with simplicity and performance in mind.

### Key Principles

- **Minimal**: Clean, uncluttered interface with generous whitespace
- **Fast**: Optimized for speed with static generation and minimal JavaScript
- **Customizable**: Simple configuration through `muni.config.ts`
- **Professional**: Small, tight typography and spacing for a modern look
- **Static**: No animations or shifting layouts - everything feels stable

## Features

- **3 Clean Themes**: Minimal, Minimal Dark, and Mono
- **Fixed-Width Content**: Consistent, centered layout that doesn't shift
- **Small Typography**: Professional 11-13px base text with tight spacing
- **MDX Support**: Write documentation in Markdown with React components
- **Search**: Built-in search functionality
- **Table of Contents**: Auto-generated from headings
- **Mobile Responsive**: Clean sidebar on mobile devices
- **SEO Optimized**: Proper meta tags and structured data

## Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/nkurunziza-saddy/muni-docs
   cd muni-docs
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Configuration

Muni is highly customizable through the `muni.config.ts` file:

```typescript
const muniConfig: MuniConfig = {
  title: "Your Docs",
  version: "1.0.0",
  defaultTheme: "minimal",
  showFrontmatterMeta: true,
  headingLinks: [
    { title: "GitHub", href: "https://github.com/your-org/your-repo" },
  ],
  navigation: [
    { title: "Introduction", slug: "index" },
    { title: "Getting Started", slug: "getting-started" },
  ],
  githubRepo: "https://github.com/your-org/your-repo",
};
```

## Themes

Muni comes with three carefully crafted themes:

- **Minimal**: Clean white background with subtle grays
- **Minimal Dark**: Deep blacks with minimal contrast
- **Mono**: Monospace typography for technical documentation

## Writing Content

Create new documentation pages in the `content/pages/` directory as `.mdx` files. Use standard Markdown syntax with support for React components.

## Deployment

Deploy to Vercel, Netlify, or any static hosting platform:

```bash
pnpm build
pnpm start
```

## Design System

Muni follows a strict minimal design system:

- **Typography**: 11-13px base text with tight line heights
- **Spacing**: Consistent, tight spacing throughout
- **Colors**: Subtle, high-contrast color palettes
- **Components**: Small, clean UI components
- **Layout**: Fixed-width, centered content

## Project Structure

```
muni-docs/
├── app/                    # Next.js app directory
├── components/            # React components
├── content/              # MDX content
├── styles/              # CSS files
├── muni.config.ts       # Configuration
└── package.json
```

## Documentation

- [Getting Started](/getting-started) - Installation and setup
- [Configuration](/configuration) - Complete config reference
- [Themes](/themes) - Theme system and customization
- [Markdown](/markdown) - MDX features and syntax
- [Deployment](/deployment) - Deploy to various platforms
- [Project Structure](/project-structure) - File organization

## Tech Stack

- **Next.js 15** - React framework with App Router
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety and better DX
- **MDX** - Markdown with React components
- **Shiki** - Syntax highlighting
- **Lucide React** - Icon library

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this template for your own projects.

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Vocs](https://vocs.dev/) - Inspiration for the design

---

_Built with Next.js, Tailwind CSS, and a focus on simplicity._
