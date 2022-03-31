import { PillCategory } from '../types/pill-category';
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
    tags: string[];
    title: string;
}

export interface ContentSeries {
    title: string;
    content: ContentPiece[];
}
