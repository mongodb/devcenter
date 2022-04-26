import { PillCategory } from '../types/pill-category';
import { Tag } from './tag';
export interface Image {
    alt: string;
    url: string;
}

export interface ContentPiece {
    authors?: string[];
    category: PillCategory;
    contentDate: string;
    description: string;
    featured: boolean;
    image?: Image;
    slug: string;
    tags: Tag[];
    title: string;
}

export interface ContentSeries {
    title: string;
    content: ContentPiece[];
}
