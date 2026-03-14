import type { Metadata } from "next";
import "../styles/globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteUrl),
  description: "A minimal documentation app",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon-192.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Muni Docs",
    description: "A minimal documentation app",
    url: siteUrl,
    siteName: "Muni Docs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muni Docs",
    description: "A minimal documentation app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("font-sans", geist.variable)}
    >
      <body className={` antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["light", "dark", "mono", "mono-dark"]}
          storageKey="muni-docs-theme"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
