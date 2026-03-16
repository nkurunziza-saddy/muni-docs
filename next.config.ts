import createMDX from "@next/mdx";
import type { NextConfig } from "next";
//@ts-expect-error
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  experimental: {
    // Rust-based MDX compiler is stable and fast with Turbopack
    mdxRs: true,
  },
  turbopack: {
    resolveExtensions: [".json", ".ts", ".tsx", ".js", ".jsx", ".md", ".mdx"],
  },
  reactCompiler: true,
};

const withMDX = createMDX({});

export default withPWA(withMDX(nextConfig)) as NextConfig;
