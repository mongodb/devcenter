import { Author } from './author';
import { OtherTags } from './other-tags';

type Image = {
    url: string;
    alt?: string;
};

export interface Article {
    __typename: 'Article';
    authors: Author[];
    content: string;
    description: string;
    slug: string;
    calculatedSlug: string;
    image?: Image;
    title: string;
    publishDate: string;
    originalPublishDate: string;
    updateDate: string;
    otherTags: OtherTags[];
}
