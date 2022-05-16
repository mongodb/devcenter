import { OtherTags } from './other-tags';
import { PrimaryTag } from './primary-tag';

export interface SeriesEntry {
    title: string;
    calculatedSlug: string;
    otherTags?: OtherTags;
    primaryTags?: PrimaryTag;
}
