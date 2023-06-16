import { useEffect, useState } from 'react';
import { SortByType } from './types';
import { PillCategory } from '../../types/pill-category';
import { defaultSortByType } from './types';

export const DEFAULT_PAGE_SIZE = 10;

export const sortByOptions: { [key in SortByType]: number } = {
    Newest: 0,
    'Recently Aired': 0,
    // 'Most Popular': 1, // add back when Most Popular is implemented
    'Highest Rated': 2,
    'Closest Upcoming': 3,
    Upcoming: 3,
};

export const getDefaultSortBy = (
    contentType?: PillCategory,
    tagSlug?: string
): SortByType => {
    if (contentType === 'Event') {
        return 'Closest Upcoming';
    } else if (tagSlug === '/videos') {
        return 'Upcoming';
    } else {
        return defaultSortByType;
    }
};

export interface SearchQueryParams {
    searchString: string;
    contentType?: string;
    tagSlug?: string;
    sortBy: SortByType;
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
    return uriParts.join('&');
};

// Given a list of total results for searcch content, will return if the page number exists.
export const isValidPage = (totalResults: number, pageNumber: number) => {
    return (
        pageNumber <= Math.ceil(totalResults / DEFAULT_PAGE_SIZE) &&
        pageNumber > 0
    );
};

/*
    This is a workaround due to a shortcoming of flora's TextInput component.
    TextInput isn't able to act as a fully controlled component, so the only
    way to clear it is by passing a key prop which effectively force-rerenders it.
    However, if the key is always passed, it will be rerendered on every search.
    Therefore, the idea here is to "flicker" the key value on and off to reset
    and facilitate the back button clearing the search input in the 404 state,
    while also preventing rerender on every search
*/

export const useResetKey = (value?: string) => {
    const [keyReset, setKeyReset] = useState(false);

    useEffect(() => {
        setKeyReset(false);
    }, [keyReset]);

    useEffect(() => {
        if (!value) {
            setKeyReset(true);
        }
    }, [value]);

    // Flicker the key value on mount to populate sitewide search field initially
    useEffect(() => {
        setKeyReset(true);
    }, []);

    return keyReset ? { key: Date.now() } : {};
};
