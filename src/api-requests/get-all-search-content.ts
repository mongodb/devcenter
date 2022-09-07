import * as Sentry from '@sentry/nextjs';
import {
    buildSearchQuery,
    SearchQueryParams,
} from '../components/search/utils';
import { SearchQueryResponse } from '../components/search/types';

export const getSearchContent = async (
    queryParams: SearchQueryParams,
    data?: any
): Promise<SearchQueryResponse> => {
    const query = buildSearchQuery(queryParams);

    const url = `${process.env.REALM_SEARCH_URL}/search_devcenter_dev?${query}`;
    const options: any = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    if (data) options.body = data;

    try {
        const req = await fetch(url, options);
        const data: SearchQueryResponse = await req.json();
        return data;
    } catch (e) {
        Sentry.captureException(e);
        throw new Error('Failed to fetch search data.');
    }
};

// Used in get-all-search-content.preval for building search filters.
export const getAllSearchContent = async (): Promise<SearchQueryResponse> => {
    const queryParams: SearchQueryParams = {
        searchString: '',
        sortBy: 'Most Recent',
    };
    return await getSearchContent(queryParams);
};

export default getAllSearchContent;
