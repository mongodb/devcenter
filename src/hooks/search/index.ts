import { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';
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
import { mockResults } from '../../mockdata/mock-events-data';
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

    const {
        searchProps,
        searchProps: { searchString },
        clearSearch,
    } = useSearchString(updatePageMeta);

    const { locationProps, clearLocation } = useLocationSearch(updatePageMeta);

    const {
        sortProps,
        sortProps: { sortBy },
        clearSort,
    } = useSort(updatePageMeta);

    const {
        filterProps,
        filterProps: { filters },
        filterData,
        clearFilters,
    } = useFilter(updatePageMeta, filterItems);

    useEffect(() => {
        const shouldUseQueryParams = !!filterItems;

        if (shouldUseQueryParams) {
            updateUrl(router.pathname, filters, searchString, sortBy);
        }
    }, [router.pathname, filters, searchString, sortBy, filterItems]);

    const clearAll = useCallback(() => {
        clearSearch();
        clearLocation();
        clearSort();
        clearFilters();
        updatePageMeta();
    }, [clearSearch, clearLocation, clearSort, clearFilters, updatePageMeta]);

    const searchQueryParams: SearchQueryParams = {
        searchString: searchProps.searchString,
        contentType,
        tagSlug,
        sortBy: sortProps.sortBy || defaultSortByType,
    };

    const searchKey = buildSearchQuery(searchQueryParams);

    // TODO: Refactor to useSWRInfinite and implement client-side pagination.
    let { data, error, isValidating } = useSWR(searchKey, searchFetcher, {
        ...swrOptions,
        fallbackData: (initialSearchContent || []).map(searchItemToContentItem),
    });

    // TODO: Remove and change let back to const on line 50
    if (contentType === 'Event') {
        data = mockResults;
        error = null;
        isValidating = false;
    }

    const filteredData = filterData(data);

    return {
        clearAll,
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
            searchString: searchProps.searchString,
            filters: filterProps.filters,
            sortBy: sortProps.sortBy,
        },
    };
};

export default useSearch;
