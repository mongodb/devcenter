import { OtherTags } from './other-tags';

export type Image = {
    url: string;
};

export type ArticlesByAuthor = {
    name: string;
    calculated_slug: string;
    description: string;
    otherTags: OtherTags[];
};

export interface Author {
    name: string;
    bio?: string;
    image?: Image;
    location?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    articles?: ArticlesByAuthor[];
    calculated_slug: string;
}
