import { ThemeUICSSObject } from 'theme-ui';
import { ContentItem } from '../../interfaces/content-item';

export interface CardSectionProps {
    content: ContentItem[];
    title: string;
    direction?: 'row' | 'column';
    href?: string;
    extraStyles?: ThemeUICSSObject;
}

export interface FeaturedCardSectionProps {
    content: ContentItem[];
    title?: string;
    className?: string;
    featuredCardType?: 'middle' | 'large';
}
