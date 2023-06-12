import { GenericTagTypeResponse } from './tag-type-response';
import { OtherTags, OtherTagConnection, CS_OtherTags } from './other-tags';
import { CS_SEO, SEO } from './seo';

export interface Media {
    description?: string;
    publishDate: string;
    title: string;
    slug: string;
    relevantLinks?: string;
    thumbnailUrl?: string;
    l1Product?: GenericTagTypeResponse;
    l2Product?: GenericTagTypeResponse;
    technology?: GenericTagTypeResponse[];
    programmingLanguage?: GenericTagTypeResponse[];
    otherTags: OtherTags;
    seo: SEO;
}

export interface CS_Media {
    title: string;
    description?: string;
    slug: string;
    original_publish_date: string;
    relevant_links?: string;
    thumbnailUrl?: string;
    l1_productConnection?: OtherTagConnection;
    l2_productConnection?: OtherTagConnection;
    technologiesConnection?: OtherTagConnection;
    programming_languagesConnection?: OtherTagConnection;
    other_tags: CS_OtherTags | null;
    seo: CS_SEO;
}
