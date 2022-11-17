import * as Sentry from '@sentry/nextjs';
import {
    buildSearchQuery,
    SearchQueryParams,
} from '../components/search/utils';
import { defaultSortByType, SearchItem } from '../components/search/types';

export const getSearchContent = async (
    queryParams: SearchQueryParams
): Promise<SearchItem[]> => {
    const query = buildSearchQuery(queryParams);

    const url = `${process.env.REALM_SEARCH_URL}/search_devcenter?${query}`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    try {
        const req = await fetch(url, options);
        const data: SearchItem[] = await req.json();
        return data;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error('Failed to fetch search data.');
    }
};

// Used in get-all-search-content.preval for building search filters.
export const getAllSearchContent = async (): Promise<SearchItem[]> => {
    const queryParams: SearchQueryParams = {
        searchString: '',
        sortBy: defaultSortByType,
    };
    return await getSearchContent(queryParams);
};

export default getAllSearchContent;
