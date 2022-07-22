import { SortByType } from './types';

export const sortByOptions: { [key in SortByType]: number } = {
    'Most Recent': 0,
    'Most Popular': 1,
    'Highest Rated': 2,
};
