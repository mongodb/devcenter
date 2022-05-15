import { PillCategory } from '../types/pill-category';
import { Series } from './series';
import { Tag } from './tag';
import { Image } from './image';
import { Author } from './author';
import { PrimaryTag } from './primary-tag';
import { CollectionType } from '../types/collection-type';

export interface ContentItem {
    collectionType?: CollectionType;
    authors?: Author[];
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
    primaryTag?: PrimaryTag;
}
