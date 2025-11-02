type Theme = "light" | "dark" | "mono" | "mono-dark";
interface NavigationItem {
    title: string;
    slug: string;
    items?: NavigationItem[];
}
interface HeadingLink {
    title: string;
    href: string;
}
interface MuniConfig {
    title: string;
    version?: string;
    defaultTheme?: Theme;
    showFrontmatterMeta?: boolean;
    headingLinks?: HeadingLink[];
    navigation: NavigationItem[];
    githubRepo?: string;
}

export type { HeadingLink as H, MuniConfig as M, NavigationItem as N, Theme as T };
