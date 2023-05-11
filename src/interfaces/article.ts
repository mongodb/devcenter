import {
    OtherTagConnection,
    ContentTypeConnection,
    CS_OtherTags,
} from './other-tags';
import { Author, CS_AuthorResponse } from './author';
import { SEO } from './seo';
import { ImageConnection } from './image';
import { Connection } from './connection';
import { CodeLevel } from '../types/tag-type';

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

export interface AuthorsConnection extends Connection {
    edges: { node: CS_AuthorResponse }[];
}

export interface CS_ArticleOtherTags extends CS_OtherTags {
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

export interface CS_ArticleResponse {
    calculated_slug: string;
    content: string;
    description: string;
    imageConnection: ImageConnection;
    slug: string;
    title: string;
    original_publish_date: string;
    expiry_date: string | null;
    other_tags: CS_ArticleOtherTags;
    strapi_updated_at: string;
    seo: SEO;
    authorsConnection: AuthorsConnection;
    system: { updated_at: string };
}
