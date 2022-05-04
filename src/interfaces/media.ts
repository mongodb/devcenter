import {
    L1ProductTag,
    ProgrammingLanguageTag,
    TechnologyTag,
} from './tag-type-response';
import { OtherTags } from './other-tags';
import { PrimaryTags } from './primary-tags';

export interface Media {
    description?: string;
    publishDate: string;
    title: string;
    slug: string;
    thumbnailUrl?: string;
    technology?: TechnologyTag[];
    l1Product?: L1ProductTag;
    programmingLanguage?: ProgrammingLanguageTag[];
    otherTags?: OtherTags[];
    primaryTag?: PrimaryTags;
}
