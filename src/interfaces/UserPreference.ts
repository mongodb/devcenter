import { TagType } from '../types/tag-type';

export interface UserPreference {
    tag_name: string;
    category: TagType;
    slug: string;
}
