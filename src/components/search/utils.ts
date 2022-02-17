import { Fetcher } from 'swr';

import { IsortByOptions } from './types';
import { ContentPiece } from '../../interfaces/content-piece';

const contentPieces: ContentPiece[] = [
    { name: 'Some Article', description: 'Description of the article.' },
    { name: 'Some Podcast', description: 'Description of the podcase.' },
    { name: 'Some How To', description: 'Description of the how to.' },
];

export const sortByOptions: IsortByOptions = {
    'Most Recent': 'recent',
    'Most Popular': 'popular',
    'Highest Rated': 'rated',
};

export const fetcher: Fetcher<ContentPiece[], string> = queryString =>
    // fetch(`whateverOurLambdaSearchFunctionURLIs${queryString}`).then(res =>
    //     res.json()
    // );
    new Promise(resolve => {
        if (queryString.includes('page=3')) {
            throw Error('ERROR AHHHH');
        } else return setTimeout(resolve.bind(null, contentPieces), 500);
    }); // Simulate request loading time and error if we load more than 3 pages.
