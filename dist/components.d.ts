import { Metadata } from 'next';
import React from 'react';
import { M as MuniConfig } from './schema-BvqUSQr0.js';

interface PageProps {
    params: Promise<{
        slug?: string[];
    }>;
}
/**
 * Generate static params for all docs pages
 * Note: This is called at build time, so config may not be loaded yet
 * The consumer can pass config directly, or it will use defaults
 */
declare function generateStaticParams(config?: MuniConfig): Promise<{
    slug: string[];
}[]>;
/**
 * Generate metadata for docs pages
 */
declare function generateMetadata({ params, config, }: {
    params: PageProps["params"];
    config?: MuniConfig;
}): Promise<Metadata>;
/**
 * Main docs page component
 * Consumer uses this in app/docs/[[...slug]]/page.tsx
 */
declare function DocsPage({ params }: PageProps): Promise<React.JSX.Element>;
declare const dynamicParams = false;

export { DocsPage, dynamicParams, generateMetadata as generateDocsMetadata, generateStaticParams as generateDocsStaticParams };
