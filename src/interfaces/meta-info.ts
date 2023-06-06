import { CTA } from '../components/hero/types';
import { TagType } from '../types/tag-type';
export interface MetaInfo {
    category: TagType;
    tagName: string;
    description: string;
    slug: string;
    ctas: CTA[];
    topics?: MetaInfo[];
    documentationLink: string;
}

// STRAPI

interface L1Props2 {
    name?: string;
}

interface L1Props {
    l_1_product?: L1Props2;
}

export interface MetaInfoResponse {
    __typename: TagType;
    name: string;
    description?: string;
    slug: string;
    l1_product?: L1Props;
    primary_cta?: string;
    secondary_cta?: string;
    documentation_link?: string;
}

// CONTENTSTACK

export type ContentTypeUID =
    | 'l1_products'
    | 'l2_products'
    | 'programming_languages'
    | 'technologies'
    | 'levels'
    | 'author_types'
    | 'spoken_languages'
    | 'content_types'
    | 'code_levels'
    | 'event_types'
    | 'event_attendances'
    | 'industry_events'
    | 'article_series'
    | 'podcast_series'
    | 'video_series'
    | 'featured_content'
    | 'featured_content_for_topic'
    | 'podcasts'
    | 'videos';

export const contentTypeUIDtoTagType = new Map<ContentTypeUID, TagType>([
    ['l1_products', 'L1Product'],
    ['l2_products', 'L2Product'],
    ['programming_languages', 'ProgrammingLanguage'],
    ['technologies', 'Technology'],
    ['levels', 'ExpertiseLevel'],
    ['author_types', 'AuthorType'],
    ['spoken_languages', 'SpokenLanguage'],
    ['content_types', 'ContentType'],
    ['code_levels', 'CodeLevel'],
    ['event_types', 'EventType'],
    ['event_attendances', 'EventAttendance'],
]);

interface L1ProductsConnection {
    edges: { node: { title: string } }[];
}

export interface CS_MetaInfoResponse {
    title: string;
    description?: string;
    slug: string;
    l1_productsConnection?: L1ProductsConnection;
    primary_cta?: string;
    secondary_cta?: string;
    documentation_link?: string;
    system: {
        content_type_uid: ContentTypeUID;
    };
}
