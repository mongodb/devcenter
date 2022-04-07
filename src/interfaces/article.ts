import { Author } from './author';
import { SEO } from './seo';

export interface Article {
    __typename: 'Article';
    description: string;
    content: string;
    name: string;
    slug: string;
    publishDate: string;
    updatedDate: string;
    authors: Author[];
    seo: SEO;
}
