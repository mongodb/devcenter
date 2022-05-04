import { Fetcher } from 'swr';
import { decode } from 'querystring';

import { IsortByOptions } from './types';
import { ContentPiece } from '../../interfaces/content-piece';
import getL1Content from '../../mockdata/get-l1-content';
import { ContentItem } from '../../interfaces/content-item';
import { PillCategory } from '../../types/pill-category';

export const sortByOptions: IsortByOptions = {
    'Most Recent': 'recent',
    'Most Popular': 'popular',
    'Highest Rated': 'rated',
};

const searchEndpoint =
    'https://data.mongodb-api.com/app/devhub-search-service-fldiy/endpoint/search_devcenter';

export const fetcher: Fetcher<ContentPiece[], string> = queryString =>
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

export const fetcherv2: Fetcher<ContentPiece[], string> = searchString => {
    return fetch(`${searchEndpoint}?s=${searchString}`).then(async response => {
        const r_json = await response.json();
        return r_json;
    });
}; // Simulate request loading time
