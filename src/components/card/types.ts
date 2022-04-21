import { PillCategory } from '../../types/pill-category';
import { Tags } from '../../interfaces/content-piece';

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
    tags?: Tags;
    thumbnail?: Thumbnail;
    variant: CardVariant;
    slug: string;
}
