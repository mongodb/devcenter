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
}
