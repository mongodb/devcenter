import { PillCategory } from '../types/pill-category';
import { Image } from './content-piece';

export interface ContentItem {
    authors?: string[];
    category: PillCategory;
    contentDate: string;
    updateDate?: string;
    description?: string;
    content?: string;
    image?: Image;
    slug: string;
    tags: string[];
    title: string;
    podcastFileUrl?: string;
    videoId?: string;
}
