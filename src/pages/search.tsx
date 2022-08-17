import { useState } from 'react';
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
    } = useSearch(undefined, undefined, {
        l1Items,
        languageItems,
        technologyItems,
        contributedByItems,
        contentTypeItems,
        expertiseLevelItems,
    });

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

    const [initialSearchData, setInitialSearchData] = useState(
        createInitialSearchData(
            initialSearchContent as SearchItem[],
            currentPage // page provided by query parameters
        )
    );

    const clearPagination = () => {
        setInitialSearchData(undefined);
        setCurrentPage(1);

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
        if ((!searchString || searchString == '') && allFilters.length == 0) {
            const nextPage = currentPage + 1;

            setCurrentPage(nextPage);

            const query = router.replace(
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
        }
        setInitialSearchData(undefined);
        setResultsToShow(resultsToShow + 10);
    };

    const hasInitialData = typeof initialSearchData !== 'undefined';
    const showLoadMoreButton =
        !fullyLoaded || (currentPage < initialMaxPage && hasInitialData);
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
                title={'Search | MongoDB'}
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
                        onFilter={onFilter}
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
                                    onChange={onSearch}
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
                        {!!data.length || isValidating || error ? (
                            <>
                                <Results
                                    data={
                                        initialSearchData
                                            ? initialSearchData
                                            : data
                                    }
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
                                        {!isValidating && data && (
                                            <a
                                                href={`/developer/search/?page=${
                                                    currentPage + 1
                                                }`}
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
                    onFilter={onFilter}
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
