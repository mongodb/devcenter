import { PillCategory } from '../../../types/pill-category';
import { Thumbnail } from '../../../interfaces/thumbnail';

export interface FeaturedCardProps {
    authors?: string[];
    contentDate: string;
    className?: string;
    description?: string;
    title: string;
    pillCategory: PillCategory;
    tags?: string[];
    thumbnail: Thumbnail;
}
