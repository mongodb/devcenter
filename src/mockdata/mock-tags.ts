import { Tag } from '../interfaces/tag';

const tag1: Tag = {
    name: 'AWS',
    type: 'Technology',
    slug: '/technologies/aws',
};

const tag2: Tag = {
    name: 'MongoDB',
    type: 'L1Product',
    slug: '/products/mongodb',
};

const tag3: Tag = {
    name: 'Java',
    type: 'ProgrammingLanguage',
    slug: '/languages/java',
};

export const MOCK_ARTICLE_TAGS: Tag[] = [tag1, tag2, tag3];
