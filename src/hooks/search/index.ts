import { useEffect, useCallback, useState } from 'react';
import useSWR from 'swr';
import { FilterItem } from '@mdb/devcenter-components';
import {
    searchFetcher,
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
import { ContentItem } from '../../interfaces/content-item';
import { SearchParamType, SearchProps } from './types';
import isServerSide from '../../utils/is-server-side';

// Credit https://github.com/reduxjs/redux/blob/d794c56f78eccb56ba3c67971c26df8ee34dacc1/src/compose.ts#L46
// eslint-disable-next-line @typescript-eslint/ban-types
const compose = (...funcs: Function[]) => {
    if (funcs.length === 0) {
        return <T>(arg: T) => arg;
    }

    if (funcs.length === 1) {
        return funcs[0];
    }

    return funcs.reduce(
        (a, b) =>
            (...args: any) =>
                a(b(...args))
    );
};

// Hook that contains the majority of the logic for our search functionality across the site
const useSearch = (
    initialSearchContent?: SearchItem[],
    updatePageMeta: (pageNumber?: number) => void = () => null,
    contentType?: string, // Filter on backend by contentType tag specifically.
    tagSlug?: string, // Filter on backend by tag.
    filterItems?: { key: string; value: FilterItem[] }[] // This is needed for URL filter/search updates.
): SearchProps => {
    const [allResults, setAllResults] = useState<ContentItem[]>([]);
    const router = useRouter();
    const shouldUseQueryParams = !!filterItems;
    const paramChangeCallback = useCallback(() => {
        if (!shouldUseQueryParams) {
            updatePageMeta();
        }
    }, [shouldUseQueryParams, updatePageMeta]);

    const {
        searchStringProps,
        searchStringProps: { searchString },
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

    const { locationProps, clearLocation, filterDataByLocation } =
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
        (which?: SearchParamType) => {
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
        sortBy:
            sortBy ||
            (contentType === 'Event' ? 'Closest Upcoming' : defaultSortByType),
    };

    const searchKey = buildSearchQuery(searchQueryParams);

    // TODO: Refactor to useSWRInfinite and implement client-side pagination.
    const {
        data = [],
        error,
        isValidating,
    } = useSWR(searchKey, searchFetcher, {
        ...swrOptions,
        fallbackData: (initialSearchContent || []).map(searchItemToContentItem),
    });

    // Populate all results with either the result of useSWR if searchString starts out empty,
    // or with a one-time fetch to the search endpoint with an empty query
    useEffect(() => {
        if (!allResults.length) {
            if (searchString === '' && data && data.length > 0) {
                setAllResults(data);
            } else {
                (
                    searchFetcher(
                        buildSearchQuery({
                            searchString: '',
                            contentType,
                            tagSlug,
                            sortBy:
                                contentType === 'Event'
                                    ? 'Closest Upcoming'
                                    : defaultSortByType,
                        })
                    ) as Promise<ContentItem[]>
                ).then((response: ContentItem[]) => {
                    setAllResults(response);
                });
            }
        }
    }, [searchString, allResults, data, contentType, tagSlug]);

    const filteredData = compose(filterData, filterDataByLocation)(data);

    return {
        clearSearchParam,
        searchStringProps,
        filterProps,
        sortProps,
        locationProps,
        resultsProps: {
            allResults: isServerSide() ? data : allResults,
            unfilteredResults: data,
            results: filteredData,
            error,
            // Disable loading state when running server-side so results show when JS is disabled
            isValidating: isServerSide() ? false : isValidating,
            searchString,
            filters,
            sortBy,
        },
    };
};

export default useSearch;
