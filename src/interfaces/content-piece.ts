import { PillCategory } from '../types/pill-category';
export interface Image {
    alt: string;
    url: string;
}

export interface Tags {
    l1Product: string;
    l2Product: string[];
    technology: string[];
    programmingLanguage: string[];
    authorType: string;
    contentType: PillCategory;
}

export interface ContentPiece {
    authors?: string[];
    contentDate: string;
    description: string;
    image?: Image;
    slug: string;
    tags: Tags;
    title: string;
}

export interface ContentSeries {
    title: string;
    content: ContentPiece[];
}
