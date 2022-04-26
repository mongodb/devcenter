import { Fetcher } from 'swr';
import { decode } from 'querystring';

import { IsortByOptions } from './types';
import getL1Content from '../../mockdata/get-l1-content';
import { ContentItem } from '../../interfaces/content-item';

export const sortByOptions: IsortByOptions = {
    'Most Recent': 'recent',
    'Most Popular': 'popular',
    'Highest Rated': 'rated',
};

export const fetcher: Fetcher<ContentItem[], string> = queryString =>
    // fetch(`whateverOurLambdaSearchFunctionURLIs?${queryString}`).then(res =>
    //     res.json()
    // );
    new Promise(resolve => {
        if (queryString.includes('page=3')) {
            throw Error('ERROR AHHHH');
        }

        const { topic } = decode(queryString);
        const { content } = getL1Content(topic as string);
        return setTimeout(resolve.bind(null, content.slice(0, 10)), 100);
    }); // Simulate request loading time and error if we load more than 3 pages.
