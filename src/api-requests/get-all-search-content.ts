import axios from 'axios';
import {
    buildSearchQuery,
    SearchQueryParams,
} from '../components/search/utils';
import { SearchItem } from '../components/search/types';

// Should find a way to cache this response. Only use it in a few places for search filters but still.
export const getAllSearchContent = async (): Promise<SearchItem[]> => {
    return axios
        .get(`${process.env.REALM_SEARCH_URL}/search_devcenter_stage?s=`)
        .then(async response => {
            const r_json: SearchItem[] = response.data;
            return r_json;
        });
};

export const getSearchContent = async (
    queryParams: SearchQueryParams
): Promise<SearchItem[]> => {
    const query = buildSearchQuery(queryParams);
    return axios
        .get(
            `
            ${process.env.REALM_SEARCH_URL}/search_devcenter_stage?${query}
        `
        )
        .then(async response => {
            const r_json: SearchItem[] = response.data;
            return r_json;
        });
};

export default getAllSearchContent;
