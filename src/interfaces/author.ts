import { OtherTags } from './other-tags';

export type Image = {
    url: string;
};

type ArticlesByAuthor = {
    name: string;
    calculated_slug: string;
    description: string;
    otherTags: OtherTags[];
};

export interface Author {
    name: string;
    url?: string;
    bio?: string;
    image?: Image;
    location?: string;
    title?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    articles?: ArticlesByAuthor[];
    calculated_slug: string;
}
