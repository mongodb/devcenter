import preval from 'next-plugin-preval';
import { SearchQueryResponse } from '../components/search/types';
import { getAllSearchContent } from '../api-requests/get-all-search-content';

export const getData = async (): Promise<SearchQueryResponse> => {
    const data = await getAllSearchContent();
    return data;
};

export default preval(getData());
