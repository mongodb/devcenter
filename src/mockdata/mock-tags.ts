import { Tag } from '../interfaces/tag';

const tag1: Tag = {
    name: 'MongoDB',
    type: 'AuthorType',
    slug: '/author-type/mongodb',
};

const tag2: Tag = {
    name: 'MongoDB',
    type: 'L1Product',
    slug: '/product/mongodb',
};

const tag3: Tag = {
    name: 'Go',
    type: 'ProgrammingLanguage',
    slug: '/language/go',
};
export const MOCK_TAGS: Tag[] = [tag1, tag2, tag3];
