import { FeaturedResponse } from '../interfaces/featured';
import { getFeaturedForTopic } from './get-featured-for-topic';

const featuredArticles: FeaturedResponse = {
    articles: [
        { title: 'Article 1' },
        { title: 'Article 2' },
        { title: 'Article 3' },
        { title: 'Article 4' },
    ],
    podcasts: [],
    videos: [],
    events: [],
};

jest.mock('../config/api-client', () => ({
    esModule: true,
    STRAPI_CLIENT: { query: () => ({ data: { featured: featuredArticles } }) },
}));

test('parses featured to list of strings', async () => {
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
