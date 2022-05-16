import {
    AuthorTypeTag,
    ContentTypeTag,
    ExpertiseLevelTag,
    L1ProductTag,
    L2ProductTag,
    ProgrammingLanguageTag,
    SpokenLanguageTag,
    TechnologyTag,
} from './tag-type-response';
import { CodeLevel } from '../types/tag-type';

export interface OtherTags {
    contentType: ContentTypeTag;
    technology?: TechnologyTag[];
    authorType?: AuthorTypeTag;
    l1Product?: L1ProductTag;
    l2Product?: L2ProductTag;
    spokenLanguage?: SpokenLanguageTag;
    expertiseLevel?: ExpertiseLevelTag;
    programmingLanguage?: ProgrammingLanguageTag[];
    codeType?: CodeLevel;
    githubUrl?: string;
    liveSiteUrl?: string;
}
