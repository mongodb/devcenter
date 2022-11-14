import { TagType } from '../types/tag-type';

export const L1L2_TOPIC_PAGE_TYPES: TagType[] = [
    'L1Product',
    'L2Product',
    'ProgrammingLanguage',
    'Technology',
    'ExpertiseLevel',
];

export const CONTENT_TYPE_NAME_MAP: { [type: string]: string } = {
    ProgrammingLanguage: 'Language',
    Technology: 'Technology',
    L1Product: 'Products',
    ExpertiseLevel: 'Expertise Level',
    AuthorType: 'Contributed By',
    ContentType: 'Content Type',
    ExampleType: 'Example Type',
};

export const DOCS_UNIVERSAL_LINK = 'https://www.mongodb.com/docs/';
