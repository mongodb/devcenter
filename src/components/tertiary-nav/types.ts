export interface TertiaryNavItem {
    title: string;
    url: string;
    icon?: JSX.Element;
    target?: string;
}

export interface TertiaryNavProps {
    topic: string;
    items: TertiaryNavItem[];
}
