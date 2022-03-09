export interface TertiaryNavItem {
    title: string;
    url: string;
}

export interface TertiaryNavProps {
    topic: string;
    items: TertiaryNavItem[];
}
