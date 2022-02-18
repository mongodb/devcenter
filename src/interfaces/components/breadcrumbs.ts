export interface Crumb {
    text: string;
    url?: string;
}

export interface BreadcrumbsProps {
    crumbs: Crumb[];
}
