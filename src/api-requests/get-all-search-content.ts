import { SearchItem } from '../components/search/types';
const searchEndpoint =
    'https://data.mongodb-api.com/app/devhub-search-service-fldiy/endpoint/search_devcenter';

// Should find a way to cache this response. Only use it in a few places for search filters but still.
export const getAllSearchContent = async (): Promise<SearchItem[]> => {
    return fetch(`${searchEndpoint}?s=`).then(async response => {
        const r_json: SearchItem[] = await response.json();
        return r_json;
    });
};

export default getAllSearchContent;
