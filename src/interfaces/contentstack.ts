import { GenericTagTypeResponse } from './tag-type-response';
import { CodeLevel } from '../types/tag-type';

export interface CSNode<T> {
    node: T;
}

export interface CSEdges<T> {
    edges: CSNode<T>[];
}

export interface CSImage {
    url: string;
}

export interface CSMetaInfoResponse {
    name: string;
    description?: string;
    slug: string;
    l1_product?: CSEdges<{ name?: string }>;
    primary_cta?: string;
    secondary_cta?: string;
    documentation_link?: string;
}

export interface CSSEO {
    canonical_url?: string;
    meta_description?: string;
    og_description?: string;
    og_image?: CSEdges<CSImage>;
    og_title?: string;
    og_type?: string;
    og_url?: string;
    twitter_card?: string;
    twitter_creator?: string;
    twitter_description?: string;
    twitter_image?: CSEdges<CSImage>;
    twitter_site?: string;
    twitter_title?: string;
}

export interface CSOtherTags {
    technology?: CSEdges<GenericTagTypeResponse>;
    authorType?: CSEdges<GenericTagTypeResponse>;
    l1Product?: CSEdges<GenericTagTypeResponse>;
    l2Product?: CSEdges<GenericTagTypeResponse>;
    spokenLanguage?: CSEdges<GenericTagTypeResponse>;
    expertiseLevel?: CSEdges<GenericTagTypeResponse>;
    programmingLanguage?: CSEdges<GenericTagTypeResponse>;
    codeType?: CodeLevel;
    githubUrl?: string;
    liveSiteUrl?: string;
}

export interface CSMedia {
    description?: string;
    publishDate: string;
    title: string;
    slug: string;
    relevantLinks?: string;
    thumbnailUrl?: string;
    l1Product?: CSEdges<GenericTagTypeResponse>;
    l2Product?: CSEdges<GenericTagTypeResponse>;
    technology?: CSEdges<GenericTagTypeResponse>;
    programmingLanguage?: CSEdges<GenericTagTypeResponse>;
    otherTags: CSOtherTags;
    seo: CSSEO;
}

export interface CSPodcast extends CSMedia {
    podcastFileUrl: string;
    casted_slug: string;
}

export interface CSVideo extends CSMedia {
    videoId: string;
}
