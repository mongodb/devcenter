import useSWR, { Fetcher } from 'swr';
import { Tag } from '../../interfaces/tag';
import { getURLPath } from '../../utils/format-url-path';
import { ContentItem } from '../../interfaces/content-item';

const fetcher: Fetcher<ContentItem[], string> = queryString => {
    return fetch(
        (getURLPath('/api/personalized-content') as string) + '?' + queryString
    ).then(async response => {
        const json: ContentItem[] = await response.json();
        return json;
    });
};

const buildQuery = (tags: Tag[]) => {
    // TODO: Replace with correct query string logic
    return tags
        .reduce((acc, tag) => acc + `${tag.type}=${tag.name},`, '')
        .slice(0, -1);
};

const usePersonalizedContent = (followedTags: Tag[]) => {
    const query = buildQuery(followedTags);

    const { data, error, isValidating } = useSWR(query, fetcher);

    return { data, error, isValidating };
};

export default usePersonalizedContent;
