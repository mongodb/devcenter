import { SearchItem, SortByType } from './types';

export const DEFAULT_PAGE_SIZE = 10;

export const sortByOptions: { [key in SortByType]: number } = {
    'Most Recent': 0,
    // 'Most Popular': 1, // add back when Most Popular is implemented
    'Highest Rated': 2,
};

export interface SearchQueryParams {
    searchString: string;
    contentType?: string;
    tagSlug?: string;
    sortBy: SortByType;
    pageNumber?: number;
    pageSize?: number;
}

export const buildSearchQuery = (queryParams: SearchQueryParams) => {
    const uriParts = [
        `s=${encodeURIComponent(queryParams.searchString)}`,
        `sortMode=${sortByOptions[queryParams.sortBy]}`,
    ];
    if (queryParams.contentType) {
        uriParts.push(
            `contentType=${encodeURIComponent(queryParams.contentType)}`
        );
    }
    if (queryParams.tagSlug) {
        uriParts.push(`tagSlug=${encodeURIComponent(queryParams.tagSlug)}`);
    }
    if (queryParams.pageNumber && queryParams.pageSize) {
        uriParts.push(
            `pageNumber=${encodeURIComponent(queryParams.pageNumber)}`,
            `pageSize=${encodeURIComponent(queryParams.pageSize)}`
        );
    }

    return uriParts.join('&');
};
