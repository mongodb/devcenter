import { getFeaturedForTopic } from './get-featured-for-topic';

const mockGetFeaturedTopic = jest.fn();
jest.mock('../api-requests/get-featured-for-topic', () => ({
    __esModule: true,
    CS_getFeaturedContentForTopic: () => mockGetFeaturedTopic(),
}));
jest.mock('./get-all-featured.preval', () => ({}));

test('parses featured to list of strings', async () => {
    mockGetFeaturedTopic.mockImplementation(() => ({
        articles: [
            { title: 'Article 1' },
            { title: 'Article 2' },
            { title: 'Article 3' },
            { title: 'Article 4' },
        ],
        podcasts: [],
        videos: [],
    }));

    const result = await getFeaturedForTopic('');
    expect(result.articles).toHaveLength(4);
    expect(result.podcasts).toHaveLength(0);
    expect(result.videos).toHaveLength(0);
    expect(result.articles).toEqual([
        'Article 1',
        'Article 2',
        'Article 3',
        'Article 4',
    ]);
});
