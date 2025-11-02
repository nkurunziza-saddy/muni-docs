// Docs Page Component and related exports (Server Components)
// Import this in your app/docs/[[...slug]]/page.tsx
export {
  default as DocsPage,
  generateStaticParams as generateDocsStaticParams,
  generateMetadata as generateDocsMetadata,
  dynamicParams,
} from "./app/docs-page";

