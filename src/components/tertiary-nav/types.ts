import { TargetType } from '@mdb/flora';
export interface TertiaryNavItem {
    title: string;
    url: string;
    icon?: JSX.Element;
    target?: TargetType;
}

export interface TertiaryNavProps {
    topic: string;
    items: TertiaryNavItem[];
}
