import { ContentItem } from '../interfaces/content-item';
import { getFeaturedForContent } from './get-featured-for-content';

const mockGetFeatured = jest.fn();
jest.mock('./get-featured-for-topic', () => ({
    __esModule: true,
    getFeaturedForTopic: () => mockGetFeatured(),
}));

const content: ContentItem[] = [
    {
        category: 'Quickstart',
        contentDate: '0000-00-00',
        slug: '/products/atlas/1',
        tags: [],
        title: 'Quickstart 1',
    },
    {
        category: 'Article',
        contentDate: '0000-00-00',
        slug: '/languages/python/1',
        tags: [],
        title: 'Article 1',
    },
    {
        category: 'Article',
        contentDate: '0000-00-00',
        slug: '/languages/python/2',
        tags: [],
        title: 'Article 2',
    },
    {
        category: 'Article',
        contentDate: '0000-00-00',
        slug: '/languages/python/3',
        tags: [],
        title: 'Article 3',
    },
    {
        category: 'Article',
        contentDate: '0000-00-00',
        slug: '/languages/python/4',
        tags: [],
        title: 'Article 4',
    },
];

test('only returns 3 when there are more than 3 matching', async () => {
    mockGetFeatured.mockImplementation(() => ({
        articles: ['Article 1', 'Article 2', 'Article 3', 'Article 4'],
        podcasts: [],
        videos: [],
    }));
    const result = await getFeaturedForContent(content, '');
    expect(result).toHaveLength(3);
    expect(result[0].title).toEqual('Article 1');
    expect(result[1].title).toEqual('Article 2');
    expect(result[2].title).toEqual('Article 3');
});

test('returns most recent when there are not enough featured and will not duplicate', async () => {
    mockGetFeatured.mockImplementation(() => ({
        articles: [],
        podcasts: ['Quickstart 1'],
        videos: [],
    }));
    const result = await getFeaturedForContent(content, '');
    expect(result).toHaveLength(3);
    expect(result[0].title).toEqual('Quickstart 1');
    expect(result[1].title).toEqual('Article 1');
    expect(result[2].title).toEqual('Article 2');
});
