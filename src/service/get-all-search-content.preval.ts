import preval from 'next-plugin-preval';
import { SearchItem } from '../components/search/types';
import { getAllSearchContent } from '../api-requests/get-all-search-content';
import { mockResults } from '../mockdata/mock-events-data';

export const getData = async (): Promise<SearchItem[]> => {
    const data = await getAllSearchContent();
    return [...data, ...mockResults];
};

export default preval(getData());
