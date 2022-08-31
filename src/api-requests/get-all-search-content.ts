import {
    buildSearchQuery,
    SearchQueryParams,
} from '../components/search/utils';
import { SearchItem } from '../components/search/types';

// Should find a way to cache this response. Only use it in a few places for search filters but still.
export const getAllSearchContent = async (): Promise<SearchItem[]> => {
    const url = `${process.env.REALM_SEARCH_URL}/search_devcenter?s=`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, options)
        .then(async response => response.json())
        .then(async data => {
            const r_json: SearchItem[] = data;
            return r_json;
        });
};

export const getSearchContent = async (
    queryParams: SearchQueryParams
): Promise<SearchItem[]> => {
    const query = buildSearchQuery(queryParams);

    console.log(`${process.env.REALM_SEARCH_URL}/search_devcenter?${query}`);

    const url = `${process.env.REALM_SEARCH_URL}/search_devcenter?${query}`;
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    return fetch(url, options)
        .then(async response => response.json())
        .then(async data => {
            const r_json: SearchItem[] = data;
            return r_json;
        });
};

export default getAllSearchContent;
