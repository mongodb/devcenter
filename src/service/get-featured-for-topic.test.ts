import { ContentItem } from '../interfaces/content-item';
import { FeaturedItem, FeaturedResponse } from '../interfaces/featured';
import { getFeaturedForTopic } from './get-featured-for-topic';
import * as apiRequestModule from '../api-requests/get-featured-for-topic';

jest.mock('../api-requests/get-featured-for-topic', () => ({
    __esModule: true,
    ...jest.requireActual('../api-requests/get-featured-for-topic'),
}));

const featuredArticles: FeaturedResponse = {
    articles: [
        { title: 'Article 1' },
        { title: 'Article 2' },
        { title: 'Article 3' },
        { title: 'Article 4' },
    ],
    podcasts: [],
    videos: [],
};

test('parses featured to list of strings', async () => {
    const spy = jest.spyOn(apiRequestModule, 'getFeaturedForTopicFromAPI');
    spy.mockReturnValue(Promise.resolve(featuredArticles));
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
