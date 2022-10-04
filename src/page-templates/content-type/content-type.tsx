import * as Sentry from '@sentry/nextjs';
import React, { useState, useCallback } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import {
    GridLayout,
    TypographyScale,
    TextInput,
    ESystemIconNames,
    Button,
    Select,
} from '@mdb/flora';
import { Grid } from 'theme-ui';

import Results from '../../components/search/results';
import Hero from '../../components/hero';
import RequestContentModal, {
    requestContentModalStages,
} from '../../components/request-content-modal';
import { CTAContainerStyles } from '../../components/hero/styles';

import {
    FilterItem,
    DesktopFilters,
    MobileFilters,
} from '../../components/search-filters';

import { ContentTypePageProps } from './types';
import { desktopFiltersStyles, resultsStringAndTagsStyles } from './styles';
import { h5Styles, pageWrapper } from '../../styled/layout';

import {
    searchBoxSortBarWrapperStyles,
    searchBoxStyles,
    sortBoxStyles,
} from '../../components/search/styles';

import { FeaturedCardSection } from '../../components/card-section';

import LanguagesSection from './languages-section';
import TechnologiesSection from './technologies-section';
import ProductsSection from './products-section';

import { getURLPath } from '../../utils/format-url-path';
import useSearch from '../../hooks/search';
import { hasEmptyFilterAndQuery, isEmptyArray } from '../../hooks/search/utils';
import FilterTagSection from '../../components/search-filters/filter-tag-section';
import {
    createInitialSearchData,
    getResultData,
    getResultIsValidating,
} from '../../hooks/search/utils';

import { shouldRenderRequestButton } from './utils';
import { SearchItem } from '../../components/search/types';
<<<<<<< HEAD
import { DEFAULT_PAGE_SIZE } from '../../components/search/utils';
import { getMetaDescr } from '../../utils/seo';
=======
import {
    sortByOptions,
    DEFAULT_PAGE_SIZE,
} from '../../components/search/utils';
>>>>>>> d7dcef6 (sort by functionality)

let pluralize = require('pluralize');

const ContentTypePage: NextPage<ContentTypePageProps> = ({
    description,
    contentType,
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
    expertiseLevelItems,
    codeLevelItems,
    featured,
    featuredLanguages,
    featuredTechnologies,
    featuredProducts,
    initialSearchContent,
    pageNumber,
    slug,
}) => {
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
    const { asPath, route } = router;

    const totalResults = initialSearchContent
        ? initialSearchContent.length
        : DEFAULT_PAGE_SIZE;
    const maxPage = Math.ceil(totalResults / DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState(
        pageNumber && pageNumber > maxPage ? maxPage : pageNumber
    );

    const defaultMetaDescr = getMetaDescr(publicRuntimeConfig, route, asPath);
    const [metaDescr, setMetaDescr] = useState(
        defaultMetaDescr && pageNumber > 1
            ? `${defaultMetaDescr} - Page ${pageNumber}`
            : defaultMetaDescr
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
    const [initialPageResetFlag, setInitialPageResetFlag] = useState(false);

    ///////////////////////////////////////
    // HOOKS
    ///////////////////////////////////////
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
        searchString,
        setSearchString,
        numberOfResults,
        onSort,
        sortBy,
    } = useSearch(
        contentType,
        undefined,
        undefined,
        initialSearchData ? pageNumber : undefined
    );

    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');

    const [filterTagsExpanded, setFilterTagsExpanded] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    ///////////////////////////////////////
    // HANDLERS
    ///////////////////////////////////////

    const buildPageTitle = useCallback(
        (pageNumber: number) => {
            const titlePageNo = pageNumber > 1 ? `- Page ${pageNumber}` : '';
            return `${pluralize(contentType)} ${titlePageNo} | MongoDB`;
        },
        [contentType]
    );
    const [pageTitle, setPageTitle] = useState(buildPageTitle(pageNumber));

    const clearPagination = () => {
        setInitialPageResetFlag(true);
        setInitialSearchData(undefined);
        setCurrentPage(1);
        setPageTitle(buildPageTitle(1));
        setMetaDescr(defaultMetaDescr);

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

    const onFilter = (filters: FilterItem[]) => {
        clearPagination();
        setResultsToShow(10);
        setAllFilters(filters);
    };

    const onFilterTagClose = (filterTag: FilterItem) => {
        setInitialSearchData(undefined);
        setAllFilters(allFilters.filter(filter => filter !== filterTag));
    };

    const onLoadMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // If JS is enabled, do not follow href.

        // If search query and filters are empty, then assume
        // we are traversing all content with pagination.
        if (hasEmptyFilterAndQuery(searchString, allFilters)) {
            const nextPage = currentPage + 1;

            setCurrentPage(nextPage);
            setPageTitle(buildPageTitle(nextPage));
            setMetaDescr(
                defaultMetaDescr && nextPage > 1
                    ? `${defaultMetaDescr} - Page ${nextPage}`
                    : defaultMetaDescr
            );
            router.replace(
                {
                    pathname: router.pathname,
                    query: {
                        page: nextPage,
                    },
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

    const hasFiltersSet = !!allFilters.length;

    const hasExtraSections =
        !!featuredLanguages && !!featuredTechnologies && !!featuredProducts;

    const requestButtonText = `Request ${
        /^[aeiou]/gi.test(contentType) ? 'an' : 'a'
    } ${contentType}`; // Regex to tell if it starts with a vowel.

    ///////////////////////////////////////
    // COMPUTED ELEMENTS
    ///////////////////////////////////////
    if (allFilters.length <= 5 && filterTagsExpanded) {
        setFilterTagsExpanded(false);
    }

    const sortByDropdown = (
        <Select
            label="Sort by"
            name="sort-by-dropdown"
            options={Object.keys(sortByOptions)}
            value={sortBy}
            onSelect={onSort}
            width="100%"
            height="100%"
            sx={{
                ...sortBoxStyles,
                flexBasis: '33%',
            }}
        />
    );

    const CTAElement = (
        <div sx={CTAContainerStyles}>
            <Button
                variant="secondary"
                onClick={() => setRequestContentModalStage('text')}
                size="large"
            >
                {requestButtonText}
            </Button>
        </div>
    );

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
                <Image
                    src={getURLPath('/no-results.png', false) as string}
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
                Back to all {contentType.toLowerCase()}s
            </Button>
        </div>
    );

    const resultsStringAndTags = (
        <div sx={{ marginBottom: 'inc50' }}>
            <div sx={resultsStringAndTagsStyles}>
                {(data || isValidating) && (
                    <TypographyScale variant="heading5">
                        {!allFilters.length && !searchString
                            ? `All ${pluralize(contentType)}`
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
                <Button
                    hasIcon
                    iconPosition="right"
                    iconStrokeWeight="medium"
                    iconName={ESystemIconNames.FILTER_HAMBURGER}
                    onClick={() => setMobileFiltersOpen(true)}
                    sx={{
                        display: ['flex', null, null, 'none'],
                        justifyContent: 'center',
                    }}
                >
                    Filter & Sort
                    {!!allFilters.length && ` (${allFilters.length})`}
                </Button>
                {!searchString && !hasFiltersSet && sortByDropdown}
            </div>
            {hasFiltersSet && (
                <FilterTagSection
                    allFilters={allFilters}
                    filterTagsExpanded={filterTagsExpanded}
                    setFilterTagsExpanded={setFilterTagsExpanded}
                    onFilterTagClose={onFilterTagClose}
                    clearFilters={() => setAllFilters([])}
                />
            )}
        </div>
    );

    const hasInitialData = typeof initialSearchData !== 'undefined';
    const showLoadMoreButton = hasInitialData
        ? currentPage < maxPage
        : !fullyLoaded;
    const isLoading = !hasInitialData ? isValidating : false;

    let resultData = getResultData(
        data,
        initialSearchData,
        searchString,
        allFilters,
        pageNumber,
        initialPageResetFlag
    );

    let resultIsValidating = getResultIsValidating(
        initialSearchData,
        searchString,
        allFilters,
        isValidating
    );

    // Debug for DEVHUB-1501 which is not yet replicable.
    // Ensure results fall back to client SWR results if initial data is somehow empty (e.g. initialSearchContent = []).
    if (isEmptyArray(resultData)) {
        resultData = data;
        resultIsValidating = isValidating;
        Sentry.withScope(scope => {
            scope.setExtra('resultParameters', {
                data,
                error,
                initialSearchData,
                searchString,
                allFilters,
                pageNumber,
                initialPageResetFlag,
            });
            Sentry.captureException(new Error('Initial result data is empty'));
        });
    }

    // If data is still empty, capture another exception for Sentry.
    if (isEmptyArray(resultData)) {
        Sentry.withScope(scope => {
            scope.setExtra('resultParameters', {
                data,
                error,
            });
            Sentry.captureException(new Error('Result data is empty'));
        });
    }

    const loadMoreHref = hasEmptyFilterAndQuery(searchString, allFilters)
        ? `/developer${slug}/?page=${currentPage + 1}`
        : '#';

    return (
        <>
            <NextSeo title={pageTitle} description={metaDescr} />
            <Hero
                crumbs={[{ text: 'MongoDB Developer Center', url: '/' }]}
                name={pluralize(contentType)}
                description={description}
                ctas={
                    shouldRenderRequestButton(contentType) ? CTAElement : null
                }
            />
            <div sx={pageWrapper}>
                <GridLayout
                    sx={{
                        rowGap: 0,
                    }}
                >
                    <DesktopFilters
                        sx={desktopFiltersStyles}
                        onFilter={filters => {
                            onFilter(filters);
                            clearPagination();
                        }}
                        allFilters={allFilters}
                        l1Items={l1Items}
                        languageItems={languageItems}
                        technologyItems={technologyItems}
                        contributedByItems={contributedByItems}
                        expertiseLevelItems={expertiseLevelItems}
                        codeLevelItems={
                            contentType === 'Code Example' ? codeLevelItems : []
                        }
                    />
                    <div
                        sx={{
                            gridColumn: ['span 6', null, 'span 8', 'span 9'],
                        }}
                    >
                        <Grid
                            columns={[1, null, 3]}
                            sx={searchBoxSortBarWrapperStyles}
                        >
                            <div
                                sx={{
                                    ...searchBoxStyles,
                                    ...(!!searchString || hasFiltersSet
                                        ? {}
                                        : { gridColumn: 'span 3' }),
                                }}
                            >
                                <TextInput
                                    name="search-text-input"
                                    label={`Search ${pluralize(contentType)}`}
                                    iconName={ESystemIconNames.SEARCH}
                                    value={searchString}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        clearPagination();
                                        onSearch(e);
                                    }}
                                />
                            </div>

                            {(!!searchString || hasFiltersSet) &&
                                sortByDropdown}
                        </Grid>
                        {!searchString && !hasFiltersSet && (
                            <>
                                <FeaturedCardSection
                                    content={featured}
                                    sx={{
                                        marginBottom: [
                                            'section20',
                                            null,
                                            'section50',
                                        ],
                                    }}
                                    title={`Featured ${pluralize(contentType)}`}
                                />
                                {hasExtraSections && (
                                    <>
                                        {!!featuredLanguages.length && (
                                            <LanguagesSection
                                                title={`${contentType}s by Programming Language`}
                                                items={featuredLanguages}
                                            />
                                        )}
                                        {!!featuredTechnologies.length && (
                                            <TechnologiesSection
                                                title={`${contentType}s by Technology`}
                                                items={featuredTechnologies}
                                            />
                                        )}
                                        {!!featuredProducts.length && (
                                            <ProductsSection
                                                title={`${contentType}s by Product`}
                                                items={featuredProducts}
                                            />
                                        )}
                                    </>
                                )}
                            </>
                        )}
                        {resultsStringAndTags}
                        {!!resultData.length || resultIsValidating || error ? (
                            <>
                                <Results
                                    data={resultData}
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
                                        {!resultIsValidating && resultData && (
                                            <a
                                                href={loadMoreHref}
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
            <RequestContentModal
                setModalStage={setRequestContentModalStage}
                modalStage={requestContentModalStage}
                contentCategory={contentType}
            />
            {mobileFiltersOpen && (
                <MobileFilters
                    onFilter={filters => {
                        clearPagination();
                        onFilter(filters);
                    }}
                    onSort={onSort}
                    sortBy={sortBy}
                    allFilters={allFilters}
                    l1Items={l1Items}
                    languageItems={languageItems}
                    technologyItems={technologyItems}
                    expertiseLevelItems={expertiseLevelItems}
                    contributedByItems={contributedByItems}
                    codeLevelItems={
                        contentType === 'Code Example' ? codeLevelItems : []
                    }
                    closeModal={() => setMobileFiltersOpen(false)}
                />
            )}
        </>
    );
};

export default ContentTypePage;
