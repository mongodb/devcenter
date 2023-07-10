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
    getDefaultSortBy,
    SearchQueryParams,
} from '../../components/search/utils';
import { SearchItem } from '../../components/search/types';
import useSort from './sort';
import useLocationSearch from './location';
import useSearchString from './search-string';
import useFilter from './filter';
import { ContentItem } from '../../interfaces/content-item';
import { SearchParamType, SearchProps } from './types';
import isServerSide from '../../utils/is-server-side';
import { PillCategory } from '../../types/pill-category';

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
    } = useSort(paramChangeCallback, contentType);

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
            sortBy || getDefaultSortBy(contentType as PillCategory, tagSlug),
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
                            sortBy: getDefaultSortBy(
                                contentType as PillCategory,
                                tagSlug
                            ),
                        })
                    ) as Promise<ContentItem[]>
                ).then((response: ContentItem[]) => {
                    setAllResults(response);
                });
            }
        }
    }, [searchString, allResults, data, contentType, tagSlug]);

    const filterAired = useCallback(searchData => {
        if (!searchData) {
            return [];
        } else {
            // Only show MongoDB TV content that has not yet aired.
            const currentTime = new Date();
            return searchData.filter(
                (item: ContentItem) =>
                    item.videoType === 'MongoDB TV' &&
                    Array.isArray(item.contentDate) &&
                    new Date(item.contentDate[1]) > currentTime
            );
        }
    }, []);

    const filterMongoDBTV = useCallback(searchData => {
        if (!searchData) {
            return [];
        } else {
            return searchData.filter(
                (item: ContentItem) => item.videoType !== 'MongoDB TV'
            );
        }
    }, []);

    const filterPastEvents = useCallback((searchData: ContentItem[]) => {
        if (!searchData) return [];
        const currentTime = new Date();
        return searchData.filter((item: ContentItem) => {
            if (item.category !== 'Event') return true;
            if (!item.contentDate) return true;
            if (Array.isArray(item.contentDate) && !item.contentDate.length)
                return true;

            const endDate = Array.isArray(item.contentDate)
                ? item.contentDate[1]
                : item.contentDate;

            return new Date(endDate) > currentTime;
        });
    }, []);

    const filterFunctions = [
        filterData,
        filterDataByLocation,
        filterPastEvents,
    ];

    if (tagSlug === '/videos' && (sortBy === 'Upcoming' || !sortBy)) {
        filterFunctions.unshift(filterAired);
    } else {
        filterFunctions.unshift(filterMongoDBTV);
    }

    const filteredData = compose(...filterFunctions)(data);

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
