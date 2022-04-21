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

export interface OtherTags {
    contentType: ContentTypeTag;
    technology?: TechnologyTag[];
    authorType?: AuthorTypeTag;
    l1Product?: L1ProductTag;
    l2Product?: L2ProductTag;
    spokenLanguage?: SpokenLanguageTag;
    expertiseLevel?: ExpertiseLevelTag;
    programmingLanguage?: ProgrammingLanguageTag[];
}
