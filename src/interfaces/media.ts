import {
    L1ProductTag,
    L2ProductTag,
    ProgrammingLanguageTag,
    TechnologyTag,
} from './tag-type-response';
import { OtherTags } from './other-tags';

export interface Media {
    description?: string;
    publishDate: string;
    title: string;
    slug: string;
    thumbnailUrl?: string;
    l1Product?: L1ProductTag;
    l2Product?: L2ProductTag;
    technology?: TechnologyTag[];
    programmingLanguage?: ProgrammingLanguageTag[];
    otherTags: OtherTags;
}
