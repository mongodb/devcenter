import { Author } from './author';
import { PrimaryTags } from './primary-tags';
import { OtherTags } from './other-tags';

type Image = {
    url: string;
};

export interface Article {
    __typename: 'Article';
    authors: Author[];
    content: string;
    description: string;
    slug: string;
    image?: Image;
    title: string;
    publishDate: string;
    originalPublishDate: string;
    updateDate: string;
    otherTags: OtherTags;
    primaryTags: PrimaryTags;
}
