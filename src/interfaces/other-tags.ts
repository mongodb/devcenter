import { ContentTypeTag, GenericTagTypeResponse } from './tag-type-response';
import { CodeLevel } from '../types/tag-type';
import { PillCategory } from '../types/pill-category';
import { Connection } from './connection';
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

export interface OtherTagConnection extends Connection {
    edges: { node: { title: string; calculated_slug: string } }[];
}

export interface ContentTypeConnection extends Connection {
    edges: { node: { title: PillCategory; calculated_slug: string } }[];
}

export interface CS_OtherTags {
    author_typeConnection?: OtherTagConnection;
    content_typeConnection?: ContentTypeConnection;
    expertise_levelConnection?: OtherTagConnection;
    l1_productConnection?: OtherTagConnection;
    l2_productConnection?: OtherTagConnection;
    programming_languagesConnection?: OtherTagConnection;
    spoken_languageConnection?: OtherTagConnection;
    technologiesConnection?: OtherTagConnection;
    code_type?: CodeLevel;
    github_url?: string;
    livesite_url?: string;
}

export interface CS_VideoOtherTags extends CS_OtherTags {
    expertise_levelConnection: OtherTagConnection;
    spoken_languageConnection: OtherTagConnection;
    author_typeConnection: OtherTagConnection;
}
