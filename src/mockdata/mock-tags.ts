import { Tag } from '../interfaces/tag';

const tag1: Tag = {
    name: 'AWS',
    type: 'Technology',
    slug: '/technology/aws',
};

const tag2: Tag = {
    name: 'MongoDB',
    type: 'L1Product',
    slug: '/product/mongodb',
};

const tag3: Tag = {
    name: 'Java',
    type: 'ProgrammingLanguage',
    slug: '/language/java',
};

export const MOCK_TAGS: Tag[] = [tag1, tag2, tag3];
