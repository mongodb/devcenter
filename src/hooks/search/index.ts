import { useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { FilterItem } from '@mdb/devcenter-components';
import {
<<<<<<< HEAD
    fetcher,
    getFiltersFromQueryStr,
    itemInFilters,
=======
    searchFetcher,
>>>>>>> 4fca657 (Refactor useSearch and incorporate location search in events page)
    searchItemToContentItem,
    swrOptions,
    updateUrl,
} from './utils';
import { useRouter } from 'next/router';
import {
    buildSearchQuery,
    SearchQueryParams,
} from '../../components/search/utils';
import { defaultSortByType, SearchItem } from '../../components/search/types';
import useSort from './sort';
import useLocationSearch from './location';
import useSearchString from './search-string';
import useFilter from './filter';

// Hook that contains the majority of the logic for our search functionality across the site.

const useSearch = (
    initialSearchContent?: SearchItem[],
    updatePageMeta: (pageNumber?: number) => void = () => null,
    contentType?: string, // Filter on backend by contentType tag specifically.
    tagSlug?: string, // Filter on backend by tag.
    filterItems?: { key: string; value: FilterItem[] }[] // This is needed for URL filter/search updates.
) => {
    const router = useRouter();
    const shouldUseQueryParams = !!filterItems;
    const paramChangeCallback = useCallback(() => {
        if (!shouldUseQueryParams) {
            updatePageMeta();
        }
    }, [shouldUseQueryParams, updatePageMeta]);

    const {
        searchProps,
        searchProps: { searchString },
        clearSearch,
    } = useSearchString(paramChangeCallback);

    const {
        sortProps,
        sortProps: { sortBy },
        clearSort,
    } = useSort(paramChangeCallback);

    const {
        filterProps,
        filterProps: { filters },
        filterData,
        clearFilters,
    } = useFilter(paramChangeCallback, filterItems);

    const { locationProps, clearLocation } =
        useLocationSearch(paramChangeCallback);

    useEffect(() => {
        if (shouldUseQueryParams) {
            updateUrl(router.pathname, filters, searchString, sortBy);
        }
    }, [
        shouldUseQueryParams,
        router.pathname,
        filters,
        searchString,
        sortBy,
        filterItems,
    ]);

    const clearSearchParam = useCallback(
        (which?: 'search' | 'location' | 'sort' | 'filters') => {
            switch (which) {
                case 'search':
                    clearSearch();
                    break;
                case 'location':
                    clearLocation();
                    break;
                case 'sort':
                    clearSort();
                    break;
                case 'filters':
                    clearFilters();
                    break;
                default:
                    clearSearch();
                    clearLocation();
                    clearSort();
                    clearFilters();
                    break;
            }

            updatePageMeta();
        },
        [clearSearch, clearLocation, clearSort, clearFilters, updatePageMeta]
    );

    const searchQueryParams: SearchQueryParams = {
        searchString,
        contentType,
        tagSlug,
        sortBy: sortBy || defaultSortByType,
    };

    const searchKey = buildSearchQuery(searchQueryParams);

    // TODO: Refactor to useSWRInfinite and implement client-side pagination.
    const { data, error, isValidating } = useSWR(searchKey, searchFetcher, {
        ...swrOptions,
        fallbackData: (initialSearchContent || []).map(searchItemToContentItem),
    });

    const filteredData = filterData(data);

    return {
        clearSearchParam,
        searchProps,
        filterProps,
        sortProps,
        locationProps,
        resultsProps: {
            unfilteredResults: data,
            results: filteredData,
            error,
            // Disable loading state when running server-side so results show when JS is disabled
            isValidating: typeof window === 'undefined' ? false : isValidating,
            searchString,
            filters,
            sortBy,
        },
    };
};

export default useSearch;
