import { OtherTags } from './other-tags';
import { PrimaryTag } from './primary-tag';

export interface SeriesEntry {
    title: string;
    slug: string;
    otherTags?: OtherTags;
    primaryTags?: PrimaryTag;
}
