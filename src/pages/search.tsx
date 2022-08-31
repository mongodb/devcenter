import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from 'next';
import NextImage from 'next/image';
import {
    GridLayout,
    TextInput,
    ESystemIconNames,
    Button,
    TypographyScale,
    Select,
} from '@mdb/flora';

import { getSearchContent } from '../api-requests/get-all-search-content';
import Hero from '../components/hero';
import { DesktopFilters, MobileFilters } from '../components/search-filters';
import { pageWrapper } from '../styled/layout';

import { SearchItem } from '../components/search/types';
import { FilterItem } from '../components/search-filters';
import { getFilters } from '../hooks/search/utils';
import {
    resultsStringAndTagsStyles,
    desktopFiltersStyles,
} from '../page-templates/content-type/styles';
import {
    searchBoxStyles,
    searchBoxSortBarWrapperStyles,
    sortBoxStyles,
} from '../components/search/styles';
import { sortByOptions, DEFAULT_PAGE_SIZE } from '../components/search/utils';

import { Grid } from 'theme-ui';

import Results from '../components/search/results';
import { useRouter } from 'next/router';
import { getURLPath } from '../utils/format-url-path';
import { parsePageNumber } from '../utils/page-type-factory';
import { thumbnailLoader } from '../components/card/utils';
import useSearch from '../hooks/search';
import { createInitialSearchData } from '../hooks/search/utils';
import FilterTagSection from '../components/search-filters/filter-tag-section';

export interface SearchProps {
    l1Items: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
    contentTypeItems: FilterItem[];
    expertiseLevelItems: FilterItem[];
    initialSearchContent: SearchItem[];
    pageNumber: number;
}

const Search: NextPage<SearchProps> = ({
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
    contentTypeItems,
    expertiseLevelItems,
    initialSearchContent,
    pageNumber,
}) => {
    const router = useRouter();

    // Used for initial "all content" page.
    const totalInitialResults = initialSearchContent
        ? initialSearchContent.length
        : DEFAULT_PAGE_SIZE;
    const initialMaxPage = Math.ceil(totalInitialResults / DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState(
        pageNumber && pageNumber > initialMaxPage ? initialMaxPage : pageNumber
    );
    const [pageTitle, setPageTitle] = useState(
        pageNumber > 1
            ? `Search - Page ${pageNumber} | MongoDB`
            : `Search | MongoDB`
    );

    // Initial search data is the search content for initial page load (provided
    // via SSR based on the query parameters). This data is used for both faster
    // initial results and SEO crawlability. It must be cleared whenever any client
    // side re-rendering is needed, such as "load more", filtering or search.
    const [initialSearchData, setInitialSearchData] = useState(
        createInitialSearchData(
            initialSearchContent as SearchItem[],
            currentPage // page provided by query parameters
        )
    );

    const {
        data,
        error,
        isValidating,
        fullyLoaded,
        setResultsToShow,
        resultsToShow,
        allFilters,
        setAllFilters,
        onSearch,
        onFilter,
        searchString,
        setSearchString,
        numberOfResults,
        onSort,
        sortBy,
    } = useSearch(
        undefined,
        undefined,
        {
            l1Items,
            languageItems,
            technologyItems,
            contributedByItems,
            contentTypeItems,
            expertiseLevelItems,
        },
        initialSearchData ? pageNumber : undefined
    );

    const hasEmptyFilterAndQuery = () => {
        return (!searchString || searchString == '') && allFilters.length == 0;
    };

    const getResultData = () => {
        return initialSearchData && hasEmptyFilterAndQuery()
            ? initialSearchData
            : data;
    };

    const getResultIsValidating = () => {
        return initialSearchData && hasEmptyFilterAndQuery()
            ? false
            : isValidating;
    };

    const [filterTagsExpanded, setFilterTagsExpanded] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const clearFilters = () => {
        onFilter([]);
    };

    const onFilterTagClose = (filterTag: FilterItem) => {
        clearPagination();
        const newFilters = allFilters.filter(filter => filter !== filterTag);
        onFilter(newFilters);
    };

    const clearPagination = () => {
        setInitialSearchData(undefined);
        setCurrentPage(1);
        setPageTitle(`Search | MongoDB`);

        router.replace(
            {
                pathname: router.pathname,
                query: {},
            },
            undefined,
            {
                scroll: false,
                shallow: true,
            }
        );
    };

    const onLoadMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // If JS is enabled, do not follow href.

        // If search query and filters are empty, then assume
        // we are traversing all content with pagination.
        if (hasEmptyFilterAndQuery()) {
            const nextPage = currentPage + 1;

            setCurrentPage(nextPage);
            if (nextPage > 1) {
                setPageTitle(`Search - Page ${nextPage} | MongoDB`);
            }

            router.replace(
                {
                    pathname: router.pathname,
                    query: { page: nextPage },
                },
                undefined,
                {
                    scroll: false,
                    shallow: true,
                }
            );
            setResultsToShow(currentPage * DEFAULT_PAGE_SIZE + 10);
        } else {
            setResultsToShow(resultsToShow + 10);
        }
        setInitialSearchData(undefined);
    };

    const hasInitialData = typeof initialSearchData !== 'undefined';
    const showLoadMoreButton = hasInitialData
        ? currentPage < initialMaxPage
        : !fullyLoaded;
    const isLoading = !hasInitialData ? isValidating : false;

    const hasFiltersSet = !!allFilters.length;

    ///////////////////////////////////////
    // COMPUTED ELEMENTS
    ///////////////////////////////////////
    if (allFilters.length <= 5 && filterTagsExpanded) {
        setFilterTagsExpanded(false);
    }

    const emptyState = (
        <div
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div>
                <NextImage
                    src={getURLPath('/no-results.png') as string}
                    loader={thumbnailLoader}
                    alt="No Results"
                    height={500}
                    width={500}
                />
            </div>
            <Button
                hasIcon={true}
                iconName={ESystemIconNames.ARROW_LEFT}
                iconPosition="left"
                onClick={() => {
                    setAllFilters([]);
                    setSearchString('');
                    clearPagination();
                }}
            >
                Back to all content
            </Button>
        </div>
    );

    const resultsStringAndTags = (
        <div sx={resultsStringAndTagsStyles}>
            {(data || isValidating) && (
                <TypographyScale variant="heading5">
                    {!allFilters.length && !searchString
                        ? 'All Content'
                        : isValidating
                        ? ''
                        : numberOfResults === 1
                        ? '1 Result'
                        : `${numberOfResults} Results`}
                    {!isValidating && !!searchString && !allFilters.length
                        ? ` for "${searchString}"`
                        : ''}
                </TypographyScale>
            )}
            {hasFiltersSet && (
                <FilterTagSection
                    allFilters={allFilters}
                    filterTagsExpanded={filterTagsExpanded}
                    setFilterTagsExpanded={setFilterTagsExpanded}
                    onFilterTagClose={onFilterTagClose}
                    clearFilters={clearFilters}
                />
            )}
            <div
                sx={{
                    display: ['block', null, null, 'none'],
                    width: ['100%', null, 'unset'],
                    '&>div': { width: '100%' },
                }}
            >
                <Button
                    sx={{
                        justifyContent: 'center',
                    }}
                    iconName={ESystemIconNames.FILTER_HAMBURGER}
                    iconStrokeWeight="medium"
                    hasIcon={true}
                    iconPosition="right"
                    onClick={() => setMobileFiltersOpen(true)}
                >
                    Filter{!!allFilters.length && ` (${allFilters.length})`}
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <NextSeo
                title={pageTitle}
                noindex={router.asPath === '/search/' ? false : true}
            />
            <Hero name="Search" />
            <div sx={pageWrapper}>
                <GridLayout
                    sx={{
                        rowGap: 0,
                    }}
                >
                    <DesktopFilters
                        sx={desktopFiltersStyles}
                        onFilter={filters => {
                            clearPagination();
                            onFilter(filters);
                        }}
                        allFilters={allFilters}
                        l1Items={l1Items}
                        languageItems={languageItems}
                        technologyItems={technologyItems}
                        contributedByItems={contributedByItems}
                        contentTypeItems={contentTypeItems}
                        expertiseLevelItems={expertiseLevelItems}
                    />
                    <div
                        sx={{
                            gridColumn: ['span 6', null, 'span 8', 'span 9'],
                        }}
                    >
                        <Grid
                            columns={[1, null, 8, 3]}
                            sx={searchBoxSortBarWrapperStyles}
                        >
                            <div sx={searchBoxStyles}>
                                <TextInput
                                    // The key prop will force it to rerender on external searchString changes.
                                    key={searchString}
                                    name="search-text-input"
                                    label="Search All"
                                    iconName={ESystemIconNames.SEARCH}
                                    value={searchString}
                                    onChange={(e: React.ChangeEvent<any>) => {
                                        clearPagination();
                                        onSearch(e);
                                    }}
                                    autoFocus={true}
                                />
                            </div>
                            <Select
                                sx={sortBoxStyles}
                                label="Sort by"
                                name="sort-by-dropdown"
                                options={Object.keys(sortByOptions)}
                                value={sortBy}
                                onSelect={e => {
                                    clearPagination();
                                    onSort(e);
                                }}
                                width="100%"
                                height="100%"
                            />
                        </Grid>
                        {resultsStringAndTags}
                        {!!getResultData().length ||
                        getResultIsValidating() ||
                        error ? (
                            <>
                                <Results
                                    data={getResultData()}
                                    isLoading={isLoading}
                                    hasError={error}
                                />
                                {showLoadMoreButton && (
                                    <div
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: ['inc70', null, 'inc90'],
                                        }}
                                    >
                                        {!getResultIsValidating() &&
                                            getResultData() && (
                                                <a
                                                    href={
                                                        hasEmptyFilterAndQuery()
                                                            ? `/developer/search/?page=${
                                                                  currentPage +
                                                                  1
                                                              }`
                                                            : '#'
                                                    }
                                                    onClick={onLoadMore}
                                                >
                                                    <Button variant="secondary">
                                                        Load more
                                                    </Button>
                                                </a>
                                            )}
                                    </div>
                                )}
                            </>
                        ) : (
                            emptyState
                        )}
                    </div>
                </GridLayout>
            </div>
            {mobileFiltersOpen && (
                <MobileFilters
                    onFilter={filters => {
                        clearPagination();
                        onFilter(filters);
                    }}
                    allFilters={allFilters}
                    l1Items={l1Items}
                    languageItems={languageItems}
                    technologyItems={technologyItems}
                    contributedByItems={contributedByItems}
                    contentTypeItems={contentTypeItems}
                    expertiseLevelItems={expertiseLevelItems}
                    closeModal={() => setMobileFiltersOpen(false)}
                />
            )}
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { query } = context;

    const pageNumber = parsePageNumber(query.page);
    // Used for "load more" crawling
    const initialSearchContent: SearchItem[] = await getSearchContent({
        searchString: '',
        sortBy: 'Most Recent',
    });

    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const filters = await getFilters();

    return {
        props: {
            ...filters,
            pageNumber,
            initialSearchContent,
        },
    };
};

export default Search;
