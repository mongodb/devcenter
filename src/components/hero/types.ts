export interface Crumb {
    text: string;
    url?: string;
}

export interface BreadcrumbsProps {
    crumbs: Crumb[];
}

export interface CTA {
    text: string;
    url: string;
}
export interface HeroProps {
    crumbs: Crumb[];
    name: string;
    description: string;
    ctas: CTA[];
}
