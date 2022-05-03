import { PillCategory } from '../types/pill-category';
import { Series } from './series';
import { Tag } from './tag';
import { Image } from './image';

export interface ContentItem {
    authors?: string[];
    category: PillCategory;
    contentDate: string;
    updateDate?: string;
    description?: string;
    content?: string;
    image?: Image;
    slug: string;
    tags: Tag[];
    title: string;
    podcastFileUrl?: string;
    videoId?: string;
    series?: Series;
    featured: boolean;
}
