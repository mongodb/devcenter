import {
    L1ProductTag,
    L2ProductTag,
    ProgrammingLanguageTag,
    TechnologyTag,
} from './tag-type-response';
import { OtherTags } from './other-tags';
import { SEO } from './seo';

export interface Media {
    description?: string;
    publishDate: string;
    title: string;
    slug: string;
    relevantLinks?: string;
    thumbnailUrl?: string;
    l1Product?: L1ProductTag;
    l2Product?: L2ProductTag;
    technology?: TechnologyTag[];
    programmingLanguage?: ProgrammingLanguageTag[];
    otherTags: OtherTags;
    seo: SEO;
}
