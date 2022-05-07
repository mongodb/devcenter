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

const tag4: Tag = {
    name: 'Podcast',
    type: 'ContentType',
    slug: '/podcasts',
};

const tag5: Tag = {
    name: 'Video',
    type: 'ContentType',
    slug: '/videos',
};

const tag6: Tag = {
    name: 'Atlas',
    type: 'L1Product',
    slug: '/products/atlas',
};

export const MOCK_PODCAST_TAGS: Tag[] = [];

export const MOCK_VIDEO_TAGS: Tag[] = [];

export const MOCK_ARTICLE_TAGS: Tag[] = [tag1, tag2, tag3];

export const MOCK_ARTICLE_TAGS_ATLAS: Tag[] = [tag1, tag6, tag3];
