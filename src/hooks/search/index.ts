import { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from 'lodash.debounce';
import useSWR from 'swr';
import { FilterItem } from '@mdb/devcenter-components';
import {
    createInitialSearchData,
    fetcher,
    itemInFilters,
    updateUrl,
} from './utils';
import { useRouter } from 'next/router';
import {
    buildSearchQuery,
    DEFAULT_PAGE_SIZE,
    SearchQueryParams,
} from '../../components/search/utils';
import { SearchItem, SortByType } from '../../components/search/types';

// Hook that contains the majority of the logic for our search functionality across the site.

const useSearch = (
    pageNumber: number,
    initialSearchContent?: SearchItem[],
    updatePageMeta: (pageNumber?: number) => void = () => {},
    contentType?: string, // Filter on backend by contentType tag specifically.
    tagSlug?: string, // Filter on backend by tag.
    filterItems?: { key: string; value: FilterItem[] }[] // This is needed for URL filter/search updates.
) => {
    const shouldUseQueryParams = !!filterItems;

    const router = useRouter();
    const totalInitialResults = initialSearchContent
        ? initialSearchContent.length
        : DEFAULT_PAGE_SIZE;
    const initialMaxPage = Math.ceil(totalInitialResults / DEFAULT_PAGE_SIZE);
    const initialPage =
        pageNumber && pageNumber > initialMaxPage ? initialMaxPage : pageNumber;

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
        // revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        fallback: {
            // default search query when loading a page
            [buildSearchQuery({
                searchString: '',
                contentType,
                tagSlug,
                sortBy: 'Most Recent',
            })]: createInitialSearchData(initialSearchContent, initialPage),
        },
    });

    const onSearch = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            updatePageMeta();
            setSearchString(event.target.value);

            if (shouldUseQueryParams) {
                updateUrl(router, filters, event.target.value);
            }
        },
        [filters, router, shouldUseQueryParams, updatePageMeta]
    );

    const onFilter = useCallback(
        (filters: FilterItem[]) => {
            updatePageMeta();
            setFilters(filters);

            if (shouldUseQueryParams) {
                updateUrl(router, filters, searchString);
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
                    router,
                    filters,
                    searchString,
                    sortByValue as SortByType
                );
            }
        },
        [filters, router, searchString, shouldUseQueryParams, updatePageMeta]
    );

    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, 400), // Not sure what this value should be, so set to 400ms.
        [onSearch]
    );
    // Stop the invocation of the debounced function after unmounting.
    useEffect(() => {
        return () => {
            debouncedOnSearch.cancel();
        };
    }, [debouncedOnSearch]);

    const getFiltersFromQueryStr = useCallback(() => {
        const l1Items = filterItems?.find(
            item => item.key === 'L1Product'
        )?.value;
        const contentTypeItems = filterItems?.find(
            item => item.key === 'ContentType'
        )?.value;
        const languageItems = filterItems?.find(
            item => item.key === 'ProgrammingLanguage'
        )?.value;
        const technologyItems = filterItems?.find(
            item => item.key === 'Technology'
        )?.value;
        const contributedByItems = filterItems?.find(
            item => item.key === 'AuthorType'
        )?.value;
        const expertiseLevelItems = filterItems?.find(
            item => item.key === 'ExpertiseLevel'
        )?.value;

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
        if (product && l1Items) {
            const productFilters: FilterItem[] = buildFilters(product, l1Items);
            allNewFilters = allNewFilters.concat(productFilters);
        }
        if (contentType && contentTypeItems) {
            const contentTypeFilters: FilterItem[] = buildFilters(
                contentType,
                contentTypeItems
            );
            allNewFilters = allNewFilters.concat(contentTypeFilters);
        }
        // For the rest, just map it to the corresponding item.
        if (language && languageItems) {
            // Technically can either come in as a string of a string[], so convert to a string[]
            // and loop over by default.
            const languages =
                typeof language === 'object' ? language : [language];
            const languageFilters = languageItems.filter(lang =>
                languages.includes(lang.name)
            );
            allNewFilters = allNewFilters.concat(languageFilters);
        }
        if (technology && technologyItems) {
            const technologies =
                typeof technology === 'object' ? technology : [technology];
            const technologyFilters = technologyItems.filter(tech =>
                technologies.includes(tech.name)
            );
            allNewFilters = allNewFilters.concat(technologyFilters);
        }
        if (contributedBy && contributedByItems) {
            const contributedBys =
                typeof contributedBy === 'object'
                    ? contributedBy
                    : [contributedBy];
            const contributedByFilters = contributedByItems.filter(contrib =>
                contributedBys.includes(contrib.name)
            );
            allNewFilters = allNewFilters.concat(contributedByFilters);
        }
        if (expertiseLevel && expertiseLevelItems) {
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
    }, [filterItems, router.query]);

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

    const clearAll = () => {
        setSearchString('');
        setFilters([]);
        setSortBy('Most Recent');
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
            results: filteredData,
            error,
            isValidating,
            searchString,
            filters,
        },
        clearAll,
    };
};

export default useSearch;
