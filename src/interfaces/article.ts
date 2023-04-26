import { PillCategory } from '../types/pill-category';
import { CodeLevel } from '../types/tag-type';
import { Author, CS_AuthorResponse } from './author';
import { SEO } from './seo';

import { OtherTags } from './other-tags';

// STRAPI

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
    seo: SEO;
}

// CONTENTSTACK

interface ImageConnection {
    edges: { node: { url: string; description?: string } }[];
}

interface OtherTagConnection {
    edges: { node: { title: string; calculated_slug: string } }[];
}

interface ContentTypeConnection {
    edges: { node: { title: PillCategory; calculated_slug: string } }[];
}

interface AuthorsConnection {
    edges: { node: CS_AuthorResponse }[];
}

export interface CS_OtherTags {
    author_typeConnection: OtherTagConnection;
    content_typeConnection: ContentTypeConnection;
    expertise_levelConnection: OtherTagConnection;
    l1_productConnection: OtherTagConnection;
    l2_productConnection: OtherTagConnection;
    programming_languagesConnection: OtherTagConnection;
    spoken_languageConnection: OtherTagConnection;
    technologiesConnection: OtherTagConnection;
    code_type?: CodeLevel;
    github_url?: string;
    livesite_url?: string;
    // TODO: What is nullable from the API?
}

export interface CS_ArticleRepsonse {
    calculated_slug: string;
    content: string;
    description: string;
    imageConnection: ImageConnection;
    slug: string;
    title: string;
    original_publish_date: string;
    expiry_date: string | null;
    other_tags: CS_OtherTags;
    strapi_updated_at: string;
    seo: SEO;
    authorsConnection: AuthorsConnection;
    system: { updated_at: string };
}
