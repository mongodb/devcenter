import { PillCategory } from '../types/pill-category';
import { Thumbnail } from './thumbnail';

export interface CardContent {
    contentDate: string;
    description?: string;
    title: string;
    pillCategory: PillCategory;
    tags?: string[];
    thumbnail: Thumbnail;
    authors?: string[];
}
