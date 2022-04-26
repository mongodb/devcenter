import { OtherTags } from './other-tags';
import { PrimaryTags } from './primary-tags';

export interface SeriesEntry {
    title: string;
    slug: string;
    otherTags?: OtherTags;
    primaryTags?: PrimaryTags;
}
