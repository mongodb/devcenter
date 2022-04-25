import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';

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
    tags?: Tag[];
    thumbnail?: Thumbnail;
    variant: CardVariant;
    slug: string;
}
