import { PillCategory } from '../types/pill-category';

export interface GenericTagTypeResponse {
    name: string;
    calculatedSlug: string;
}

export interface ContentTypeTag {
    contentType: PillCategory;
    calculatedSlug: string;
}
