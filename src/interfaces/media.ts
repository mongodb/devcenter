import { GenericTagTypeResponse } from './tag-type-response';
import { OtherTags } from './other-tags';
import { SEO } from './seo';

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
