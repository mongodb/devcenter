import useSWR, { Fetcher, KeyedMutator } from 'swr';
import { Tag } from '../../interfaces/tag';
import { getURLPath } from '../../utils/format-url-path';
import { ContentItem } from '../../interfaces/content-item';
import { searchItemToContentItem, swrOptions } from '../search/utils';
import { SearchItem } from '../../components/search/types';

interface RecommendedContentResponseData {
    contentItem: SearchItem[];
    followedTags: Tag[];
}

export interface RecommendedContentData {
    contentItems: ContentItem[];
    followedTags: Tag[];
}
interface RecommendedContentResponse {
    data?: RecommendedContentData;
    error?: string;
    isValidating?: boolean;
    mutate: KeyedMutator<{ data: RecommendedContentResponseData }>;
}

const fetcher: Fetcher<{ data: RecommendedContentResponseData }, string> = (
    query: string
) => {
    return fetch(
        (getURLPath('/api/personalized-content') as string) + '?' + query
    ).then(async response => {
        const json = await response.json();
        return json;
    });
};

const buildQuery = (tags: Tag[]) => {
    // TODO: Replace with correct query string logic
    return tags
        .sort((a: Tag, b: Tag) =>
            `${a.type}${a.name}` > `${b.type}${b.name}` ? 1 : -1
        )
        .reduce((acc, tag) => acc + `${tag.type}=${tag.name}&`, '')
        .slice(0, -1);
};

const usePersonalizedContent = (
    followedTags: Tag[]
): RecommendedContentResponse => {
    // Pass followedTags as a query so data updates when tags change
    const query = buildQuery(followedTags);

    const {
        data: {
            data: {
                contentItem = [],
                followedTags: responseFollowedTags = [],
            } = {},
        } = {},
        error,
        isValidating,
        mutate,
    } = useSWR(query, fetcher, swrOptions);

    const contentItems = contentItem.map(searchItemToContentItem);

    return {
        data: { contentItems, followedTags: responseFollowedTags },
        error,
        isValidating,
        mutate,
    };
};

export default usePersonalizedContent;
