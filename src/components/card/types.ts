import { PillCategory } from '../../types/pill-category';
import { Tag } from '../../interfaces/tag';
import { Author } from '../../interfaces/author';
import { Image } from '../../interfaces/image';

export type CardVariant = 'small' | 'medium' | 'large' | 'list' | 'related';

export interface CardProps {
    authors?: Author[];
    contentDate: string;
    className?: string;
    description?: string;
    title: string;
    pillCategory: PillCategory;
    tags?: Tag[];
    thumbnail?: Image;
    variant: CardVariant;
    slug: string;
    hideTagsOnMobile?: boolean;
}
