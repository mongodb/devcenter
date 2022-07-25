import { SortByType } from './types';

export const sortByOptions: { [key in SortByType]: number } = {
    'Most Recent': 0,
    // 'Most Popular': 1, // add back when Most Popular is implemented
    'Highest Rated': 2,
};
