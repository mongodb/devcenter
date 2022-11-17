import { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';
import useSWR from 'swr';
import { FilterItem } from '@mdb/devcenter-components';
import {
    fetcher,
    getFiltersFromQueryStr,
    itemInFilters,
    searchItemToContentItem,
    updateUrl,
} from './utils';
import { useRouter } from 'next/router';
import {
    buildSearchQuery,
    SearchQueryParams,
} from '../../components/search/utils';
import {
    defaultSortByType,
    SearchItem,
    SortByType,
} from '../../components/search/types';
import { DEBOUNCE_WAIT } from '../../data/constants';
import { mockResults } from '../../mockdata/mock-events-data';

// Hook that contains the majority of the logic for our search functionality across the site.

const useSearch = (
    initialSearchContent?: SearchItem[],
    updatePageMeta: (pageNumber?: number) => void = () => null,
    contentType?: string, // Filter on backend by contentType tag specifically.
    tagSlug?: string, // Filter on backend by tag.
    filterItems?: { key: string; value: FilterItem[] }[] // This is needed for URL filter/search updates.
) => {
    const shouldUseQueryParams = !!filterItems;

    const router = useRouter();

    const [searchString, setSearchString] = useState('');
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [sortBy, setSortBy] = useState<SortByType | ''>('');

    const queryParams: SearchQueryParams = {
        searchString,
        contentType,
        tagSlug,
        sortBy: sortBy || defaultSortByType,
    };

    const key = buildSearchQuery(queryParams);

    // TODO: Refactor to useSWRInfinite and implement client-side pagination.
    let { data, error, isValidating } = useSWR(key, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        fallbackData: (initialSearchContent || []).map(searchItemToContentItem),
    });

    // TODO: Remove and change let back to const on line 50
    if (contentType === 'Event') {
        data = mockResults;
        error = null;
        isValidating = false;
    }

    const onSearch = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            updatePageMeta();
            setSearchString(event.target.value);

            if (shouldUseQueryParams) {
                updateUrl(router.pathname, filters, event.target.value);
            }
        },
        [filters, router, shouldUseQueryParams, updatePageMeta]
    );

    const onFilter = useCallback(
        (filters: FilterItem[]) => {
            updatePageMeta();
            setFilters(filters);

            if (shouldUseQueryParams) {
                updateUrl(router.pathname, filters, searchString);
            }
        },
        [router, searchString, shouldUseQueryParams, updatePageMeta]
    );

    const onSort = useCallback(
        (sortByValue?: string) => {
            updatePageMeta();
            setSortBy(sortByValue as SortByType);

            if (shouldUseQueryParams) {
                updateUrl(
                    router.pathname,
                    filters,
                    searchString,
                    sortByValue as SortByType
                );
            }
        },
        [filters, router, searchString, shouldUseQueryParams, updatePageMeta]
    );

    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, DEBOUNCE_WAIT),
        [onSearch]
    );
    // Stop the invocation of the debounced function after unmounting.
    useEffect(() => {
        return () => {
            debouncedOnSearch.cancel();
        };
    }, [debouncedOnSearch]);

    // Populate the search/filters with query params on page load/param change if we have a router and filters defined.
    useEffect(() => {
        if (router?.isReady) {
            const { s } = router.query;

            if (filterItems) {
                const allNewFilters = getFiltersFromQueryStr(
                    router.query,
                    filterItems
                );
                setFilters(allNewFilters);
            }

            if (s && typeof s === 'string' && s !== searchString) {
                setSearchString(s);
            }
        }
    }, [router?.isReady]); // Missing query dependency, but that's ok because we only need this on first page load.

    const hasFiltersSet = !!filters.length;
    const filteredData = (() => {
        if (!data) {
            return [];
        } else if (!hasFiltersSet) {
            return data;
        } else {
            return data.filter(item => {
                return itemInFilters(item, filters);
            });
        }
    })();

    const clearAll = () => {
        setSearchString('');
        setFilters([]);
        setSortBy(defaultSortByType);
        updatePageMeta();
    };

    return {
        searchBoxProps: {
            searchString,
            onSearch: debouncedOnSearch,
        },
        filterProps: {
            onFilter,
            filters,
        },
        sortBoxProps: {
            onSort,
            sortBy,
        },
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
        clearAll,
    };
};

export default useSearch;
