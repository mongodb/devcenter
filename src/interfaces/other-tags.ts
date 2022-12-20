import { ContentTypeTag, GenericTagTypeResponse } from './tag-type-response';
import { CodeLevel } from '../types/tag-type';

export interface OtherTags {
    contentType: ContentTypeTag;
    technology?: GenericTagTypeResponse[];
    authorType?: GenericTagTypeResponse;
    l1Product?: GenericTagTypeResponse;
    l2Product?: GenericTagTypeResponse;
    spokenLanguage?: GenericTagTypeResponse;
    expertiseLevel?: GenericTagTypeResponse;
    programmingLanguage?: GenericTagTypeResponse[];
    codeType?: CodeLevel;
    githubUrl?: string;
    liveSiteUrl?: string;
}
