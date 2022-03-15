import { PillCategory } from '../../types/pill-category';

export interface Thumbnail {
    url: string;
    alt?: string;
}

export type CardVariant = 'small' | 'medium' | 'large' | 'list' | 'related';

export interface CardProps {
    authors?: string[];
    contentDate: string;
    className?: string;
    description?: string;
    title: string;
    pillCategory: PillCategory;
    tags?: string[];
    thumbnail?: Thumbnail;
    variant: CardVariant;
}
