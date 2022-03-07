import { PillCategory } from '../../types/pill-category';
import { Thumbnail } from '../../interfaces/thumbnail';

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
