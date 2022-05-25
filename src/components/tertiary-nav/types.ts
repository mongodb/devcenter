export interface TertiaryNavItem {
    title: string;
    url: string;
    icon?: JSX.Element;
}

export interface TertiaryNavProps {
    topic: string;
    items: TertiaryNavItem[];
}
