import { ContentItem } from '../../interfaces/content-item';

export interface CardSectionProps {
    content: ContentItem[];
    title: string;
    direction?: 'row' | 'column';
    href?: string;
}

export interface FeaturedCardSectionProps {
    content: ContentItem[];
    title?: string;
    className?: string;
    featuredCardType?: string;
}
