import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import useSWR from 'swr';
import { FilterItem } from '../../components/search-filters';
import { fetcher, itemInFilters, updateUrl } from './utils';
import { useRouter } from 'next/router';
import {
    buildSearchQuery,
    SearchQueryParams,
    sortByOptions,
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
    pageNumber?: number,
    filterItems?: SearchFilterItems // This is needed for URL filter/search updates.
) => {
    const hasFilterItems = !!filterItems;
    const shouldUseQueryParams = hasFilterItems || !!pageNumber;

    const router = useRouter();
    const [searchString, setSearchString] = useState('');
    const [resultsToShow, setResultsToShow] = useState(
        pageNumber ? pageNumber * DEFAULT_PAGE_SIZE : DEFAULT_PAGE_SIZE
    );
    const [allFilters, setAllFilters] = useState<FilterItem[]>([]);
    const [sortBy, setSortBy] = useState<SortByType>('Most Recent');

    // Constructing the URL we send to search endpoint, which is also the cache key for SWR.
    const keyParts = [
        `s=${encodeURIComponent(searchString)}`,
        `sortMode=${sortByOptions[sortBy]}`,
    ];
    if (contentType) {
        keyParts.push(`contentType=${encodeURIComponent(contentType)}`);
    }
    if (tagSlug) {
        keyParts.push(`tagSlug=${encodeURIComponent(tagSlug)}`);
    }

    const queryParams: SearchQueryParams = {
        searchString,
        contentType,
        tagSlug,
        sortBy,
        pageNumber: 1,
        pageSize: DEFAULT_PAGE_SIZE,
    };

    const key = buildSearchQuery(queryParams);

    const { data, error, isValidating } = useSWR(key, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
    });

    const onSearch = (
        event: React.ChangeEvent<HTMLInputElement>,
        pageNumber?: number
    ) => {
        setResultsToShow(
            pageNumber ? pageNumber * DEFAULT_PAGE_SIZE : DEFAULT_PAGE_SIZE
        );
        setSearchString(event.target.value);

        if (shouldUseQueryParams) {
            updateUrl(router, allFilters, event.target.value);
        }
    };

    const onFilter = (filters: FilterItem[]) => {
        setResultsToShow(
            pageNumber ? pageNumber * DEFAULT_PAGE_SIZE : DEFAULT_PAGE_SIZE
        );
        setAllFilters(filters);
        if (shouldUseQueryParams) {
            updateUrl(router, filters, searchString);
        }
    };

    const onSort = (sortByValue: string) => {
        setResultsToShow(
            pageNumber ? pageNumber * DEFAULT_PAGE_SIZE : DEFAULT_PAGE_SIZE
        );
        setSortBy(sortByValue as SortByType);

        if (shouldUseQueryParams) {
            updateUrl(
                router,
                allFilters,
                searchString,
                pageNumber,
                sortByValue as SortByType
            );
        }
    };

    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, 400), // Not sure what this value should be, so set to 400ms.
        [allFilters]
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

        let allNewFilters: FilterItem[] = [];
        if (product) {
            // Gotta look for L1s and L2s that match.
            const products = typeof product === 'object' ? product : [product];
            let productFilters: FilterItem[] = [];

            products.forEach(prod => {
                const filterProduct = l1Items.find(
                    l1 =>
                        l1.name === prod ||
                        l1.subItems.find(l2 => l2.name === prod)
                );
                if (filterProduct) {
                    if (filterProduct.name !== prod) {
                        // This means it's an L2 match.
                        productFilters.push(
                            filterProduct.subItems.find(
                                l2 => l2.name === prod
                            ) as FilterItem
                        );
                    } else {
                        productFilters.push(filterProduct);
                    }
                }
            });
            allNewFilters = allNewFilters.concat(productFilters);
        }
        if (contentType) {
            // Gotta look for content types and dig down into the subcategories of Code Examples.
            const contentTypes =
                typeof contentType === 'object' ? contentType : [contentType];
            let contentTypeFilters: FilterItem[] = [];

            contentTypes.forEach(ct => {
                const filterContentType = contentTypeItems.find(
                    l1 =>
                        l1.name === ct || l1.subItems.find(l2 => l2.name === ct)
                );
                if (filterContentType) {
                    if (filterContentType.name !== ct) {
                        // This means it's an L2 match.
                        contentTypeFilters.push(
                            filterContentType.subItems.find(
                                l2 => l2.name === ct
                            ) as FilterItem
                        );
                    } else {
                        contentTypeFilters.push(filterContentType);
                    }
                }
            });
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

            if (hasFilterItems) {
                const allNewFilters = getFiltersFromQueryStr();
                setAllFilters(allNewFilters);
            }

            if (s && typeof s === 'string' && s !== searchString) {
                setSearchString(s);
            }
        }
    }, [router?.isReady]); // Missing query dependency, but that's ok because we only need this on first page load.

    const hasFiltersSet = !!allFilters.length;
    const filteredData = (() => {
        if (!data) {
            return [];
        } else if (!hasFiltersSet) {
            return data;
        } else {
            return data.filter(item => {
                return itemInFilters(item, allFilters);
            });
        }
    })();

    const numberOfResults = filteredData.length;
    const shownData = filteredData.slice(0, resultsToShow);
    const fullyLoaded = resultsToShow >= numberOfResults;

    return {
        data: shownData,
        error,
        isValidating,
        resultsToShow,
        setResultsToShow,
        allFilters,
        setAllFilters,
        onSearch: debouncedOnSearch,
        onFilter,
        searchString,
        setSearchString,
        fullyLoaded,
        numberOfResults,
        onSort,
        sortBy,
    };
};

export default useSearch;
