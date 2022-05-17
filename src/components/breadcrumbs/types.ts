export interface Crumb {
    text: string;
    url?: string;
}

export interface BreadcrumbsProps {
    className?: string;
    crumbs: Crumb[];
}
