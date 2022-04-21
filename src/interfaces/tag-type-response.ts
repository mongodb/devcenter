import { PillCategory } from '../types/pill-category';

interface GenericTagTypeResponse {
    name: string;
    calculatedSlug: string;
}

export interface ExpertiseLevelTag extends GenericTagTypeResponse {}

export interface ContentTypeTag {
    contentType: PillCategory;
    calculatedSlug: string;
}

export interface TechnologyTag extends GenericTagTypeResponse {}

export interface AuthorTypeTag extends GenericTagTypeResponse {}

export interface L1ProductTag extends GenericTagTypeResponse {}

export interface L2ProductTag extends GenericTagTypeResponse {}

export interface SpokenLanguageTag extends GenericTagTypeResponse {}

export interface ProgrammingLanguageTag extends GenericTagTypeResponse {}
