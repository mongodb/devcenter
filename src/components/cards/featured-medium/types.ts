import { PillCategory } from '../../../types/pill-category';
import { Thumbnail } from '../../../interfaces/thumbnail';

export interface FeaturedMediumCardProps {
    contentDate: string;
    className?: string;
    description?: string;
    title: string;
    pillCategory: PillCategory;
    tags?: string[];
    thumbnail?: Thumbnail;
}
