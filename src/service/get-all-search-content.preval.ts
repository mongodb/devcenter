import preval from 'next-plugin-preval';
import { SearchItem } from '../components/search/types';
import { getAllSearchContent } from '../api-requests/get-all-search-content';

import '../../mocks/run-msw';

export const getData = async (): Promise<SearchItem[]> => {
    const data = await getAllSearchContent();
    return data;
};

export default preval(getData());
