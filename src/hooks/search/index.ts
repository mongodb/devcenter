import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import useSWR from 'swr';
import { FilterItem } from '@mdb/devcenter-components';
import { fetcher, itemInFilters, updateUrl } from './utils';
import { useRouter } from 'next/router';
import {
    buildSearchQuery,
    SearchQueryParams,
    DEFAULT_PAGE_SIZE,
} from '../../components/search/utils';
import { SortByType } from '../../components/search/types';

interface SearchFilterItems {
    l1Items: FilterItem[];
    contentTypeItems: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
    expertiseLevelItems: FilterItem[];
}

// Hook that contains the majority of the logic for our search functionality across the site.

const useSearch = (
    contentType?: string, // Filter on backend by contentType tag specifically.
    tagSlug?: string, // Filter on backend by tag.
    filterItems?: SearchFilterItems // This is needed for URL filter/search updates.
) => {
    const shouldUseQueryParams = !!filterItems;

    const router = useRouter();
    const [searchString, setSearchString] = useState('');
    const [filters, setFilters] = useState<FilterItem[]>([]);
    const [sortBy, setSortBy] = useState<SortByType>('Most Recent');

    const queryParams: SearchQueryParams = {
        searchString,
        contentType,
        tagSlug,
        sortBy,
    };

    const key = buildSearchQuery(queryParams);

    // TODO: Refactor to useSWRInfinite and implement client-side pagination.
    const { data, error, isValidating } = useSWR(key, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    });

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(event.target.value);

        if (shouldUseQueryParams) {
            updateUrl(router, filters, event.target.value);
        }
    };

    const onFilter = (filters: FilterItem[]) => {
        setFilters(filters);
        if (shouldUseQueryParams) {
            updateUrl(router, filters, searchString);
        }
    };

    const onSort = (sortByValue?: string) => {
        setSortBy(sortByValue as SortByType);

        if (shouldUseQueryParams) {
            updateUrl(router, filters, searchString, sortByValue as SortByType);
        }
    };

    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, 400), // Not sure what this value should be, so set to 400ms.
        [filters]
    );
    // Stop the invocation of the debounced function after unmounting.
    useEffect(() => {
        return () => {
            debouncedOnSearch.cancel();
        };
    }, []);

    const getFiltersFromQueryStr = () => {
        const {
            l1Items,
            contentTypeItems,
            languageItems,
            technologyItems,
            contributedByItems,
            expertiseLevelItems,
        } = filterItems as SearchFilterItems;
        const {
            product,
            language,
            technology,
            contributedBy,
            contentType,
            expertiseLevel,
        } = router.query;

        const buildFilters = (
            filterType: string | string[],
            filterTypeItems: FilterItem[]
        ) => {
            const items =
                typeof filterType === 'object' ? filterType : [filterType];
            let filtersList: FilterItem[] = [];

            // Gotta look for L1s and L2s that match.
            items.forEach(item => {
                const filterProduct = filterTypeItems.find(
                    l1 =>
                        l1.name === item ||
                        l1.subFilters?.find(l2 => l2.name === item)
                );
                if (filterProduct) {
                    if (filterProduct.name !== item) {
                        // This means it's an L2 match.
                        filtersList.push(
                            filterProduct.subFilters?.find(
                                l2 => l2.name === item
                            ) as FilterItem
                        );
                    } else {
                        filtersList.push(filterProduct);
                    }
                }
            });
            return filtersList;
        };

        let allNewFilters: FilterItem[] = [];
        if (product) {
            const productFilters: FilterItem[] = buildFilters(product, l1Items);
            allNewFilters = allNewFilters.concat(productFilters);
        }
        if (contentType) {
            const contentTypeFilters: FilterItem[] = buildFilters(
                contentType,
                contentTypeItems
            );
            allNewFilters = allNewFilters.concat(contentTypeFilters);
        }
        // For the rest, just map it to the corresponding item.
        if (language) {
            // Technically can either come in as a string of a string[], so convert to a string[]
            // and loop over by default.
            const languages =
                typeof language === 'object' ? language : [language];
            const languageFilters = languageItems.filter(lang =>
                languages.includes(lang.name)
            );
            allNewFilters = allNewFilters.concat(languageFilters);
        }
        if (technology) {
            const technologies =
                typeof technology === 'object' ? technology : [technology];
            const technologyFilters = technologyItems.filter(tech =>
                technologies.includes(tech.name)
            );
            allNewFilters = allNewFilters.concat(technologyFilters);
        }
        if (contributedBy) {
            const contributedBys =
                typeof contributedBy === 'object'
                    ? contributedBy
                    : [contributedBy];
            const contributedByFilters = contributedByItems.filter(contrib =>
                contributedBys.includes(contrib.name)
            );
            allNewFilters = allNewFilters.concat(contributedByFilters);
        }
        if (expertiseLevel) {
            const expertiseLevels =
                typeof expertiseLevel === 'object'
                    ? expertiseLevel
                    : [expertiseLevel];
            const expertiseLevelFilters = expertiseLevelItems.filter(exp =>
                expertiseLevels.includes(exp.name)
            );
            allNewFilters = allNewFilters.concat(expertiseLevelFilters);
        }
        return allNewFilters;
    };

    // Populate the search/filters with query params on page load/param change if we have a router and filters defined.
    useEffect(() => {
        if (router?.isReady) {
            const { s } = router.query;

            if (!!filterItems) {
                const allNewFilters = getFiltersFromQueryStr();
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
            results: filteredData,
            error,
            isValidating,
        },
    };
};

export default useSearch;
