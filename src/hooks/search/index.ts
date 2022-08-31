import { useState, useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';
import useSWRInfinite from 'swr/infinite';
import { FilterItem } from '../../components/search-filters';
import { fetcher, itemInFilters, updateUrl } from './utils';
import { useRouter } from 'next/router';
import {
    buildSearchQuery,
    SearchQueryParams,
    DEFAULT_PAGE_SIZE,
} from '../../components/search/utils';
import { SortByType } from '../../components/search/types';
import { ContentItem } from '../../interfaces/content-item';

interface SearchFilterItems {
    l1Items: FilterItem[];
    contentTypeItems: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
    expertiseLevelItems: FilterItem[];
}

const SWR_HOOK_DEFAULT_OPTIONS = {
    revalidateFirstPage: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: true,
    persistSize: true, // e.g. if page is set to 4, only load page 4 and onward
};

// Hook that contains the majority of the logic for our search functionality across the site.

const useSearch = (
    initialPageNumber: number,
    contentType?: string, // Filter on backend by contentType tag specifically.
    tagSlug?: string, // Filter on backend by tag.
    filterItems?: SearchFilterItems // This is needed for URL filter/search updates.
) => {
    const shouldUseQueryParams = !!filterItems;

    const router = useRouter();
    const [searchString, setSearchString] = useState('');
    const [resultsToShow, setResultsToShow] = useState(DEFAULT_PAGE_SIZE);
    const [allFilters, setAllFilters] = useState<FilterItem[]>([]);
    const [sortBy, setSortBy] = useState<SortByType>('Most Recent');

    const getKey = (pageIndex: number, previousPageData: any) => {
        const queryParams: SearchQueryParams = {
            searchString,
            contentType,
            tagSlug,
            sortBy,
            pageNumber: pageIndex + 1,
            pageSize: DEFAULT_PAGE_SIZE,
        };

        console.log(
            'getKey ',
            'pageIndex ',
            pageIndex,
            ' query ',
            buildSearchQuery(queryParams)
        );

        return buildSearchQuery(queryParams);
    };

    const { data, error, isValidating, size, setSize } = useSWRInfinite(
        getKey,
        fetcher,
        {
            ...SWR_HOOK_DEFAULT_OPTIONS,
            initialSize: initialPageNumber,
        }
    );

    console.log('useSWRInfinite', data);

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResultsToShow(
            initialPageNumber && event.target.value === ''
                ? initialPageNumber * DEFAULT_PAGE_SIZE
                : DEFAULT_PAGE_SIZE
        );
        setSearchString(event.target.value);

        if (shouldUseQueryParams) {
            updateUrl(router, allFilters, event.target.value);
        }
    };

    const onFilter = (filters: FilterItem[]) => {
        setResultsToShow(DEFAULT_PAGE_SIZE);
        setAllFilters(filters);
        if (shouldUseQueryParams) {
            updateUrl(router, filters, searchString);
        }
    };

    const onSort = (sortByValue: string) => {
        setResultsToShow(DEFAULT_PAGE_SIZE);
        setSortBy(sortByValue as SortByType);

        if (shouldUseQueryParams) {
            updateUrl(
                router,
                allFilters,
                searchString,
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

            if (!!filterItems) {
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
        const results =
            data && data.length > 0 ? data.map(item => item.results) : null;
        if (!results) {
            return [];
        } else if (!hasFiltersSet) {
            return ([] as ContentItem[]).concat(...results);
        } else {
            const flattenedData: ContentItem[] = ([] as ContentItem[]).concat(
                ...results
            );
            return flattenedData.filter(item => {
                return itemInFilters(item, allFilters);
            });
        }
    })();

    const numberOfPages =
        data && data.length > 0 ? data[0].numberOfPages : null;
    const numberOfResults =
        data && data.length > 0 ? data[0].numberOfResults : null;
    const fullyLoaded = numberOfPages ? size >= numberOfPages : false;

    return {
        data: filteredData,
        error,
        isValidating,
        resultsToShow,
        setResultsToShow,
        allFilters,
        setAllFilters,
        setSize,
        size,
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
