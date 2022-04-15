import { PillCategory } from '../types/pill-category';
import { Image } from './content-piece';
import { Series } from './series';

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
    series?: Series;
}
