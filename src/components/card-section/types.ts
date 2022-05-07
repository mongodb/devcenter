import { ContentItem } from '../../interfaces/content-item';

export interface CardSectionProps {
    content: ContentItem[];
    title: string;
    direction?: 'row' | 'column';
}

export interface FeaturedCardSectionProps {
    content: ContentItem[];
}
