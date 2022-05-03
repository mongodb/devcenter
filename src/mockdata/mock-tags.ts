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

const tag4: Tag = {
    name: 'Podcast',
    type: 'ContentType',
    slug: '/podcast',
};

const tag5: Tag = {
    name: 'Video',
    type: 'ContentType',
    slug: '/video',
};

const tag6: Tag = {
    name: 'Atlas',
    type: 'L1Product',
    slug: '/product/atlas',
};

export const MOCK_PODCAST_TAGS: Tag[] = [tag1, tag2, tag3, tag4];

export const MOCK_VIDEO_TAGS: Tag[] = [tag1, tag2, tag3, tag5];

export const MOCK_ARTICLE_TAGS: Tag[] = [tag1, tag2, tag3];

export const MOCK_ARTICLE_TAGS_ATLAS: Tag[] = [tag1, tag6, tag3];
