import React, { useState, useCallback } from 'react';
import type { NextPage } from 'next';
import NextImage from 'next/image';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import {
    GridLayout,
    TypographyScale,
    TextInput,
    ESystemIconNames,
    Button,
} from '@mdb/flora';

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
import { pageWrapper } from '../../styled/layout';

import { searchBoxStyles } from '../../components/search/styles';

import { FeaturedCardSection } from '../../components/card-section';

import LanguagesSection from './languages-section';
import TechnologiesSection from './technologies-section';
import ProductsSection from './products-section';

import { getURLPath } from '../../utils/format-url-path';
import { thumbnailLoader } from '../../components/card/utils';
import useSearch from '../../hooks/search';
import { hasEmptyFilterAndQuery } from '../../hooks/search/utils';
import FilterTagSection from '../../components/search-filters/filter-tag-section';
import {
    createInitialSearchData,
    getResultData,
    getResultIsValidating,
} from '../../hooks/search/utils';

import { shouldRenderRequestButton } from './utils';
import { SearchItem } from '../../components/search/types';

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
    swrFallback,
    pageNumber,
    slug,
}) => {
    const initialSearchContent = swrFallback
        ? swrFallback[Object.keys(swrFallback)[0]]
        : undefined;

    const router = useRouter();
    const maxPage =
        initialSearchContent && 'numberOfPages' in initialSearchContent
            ? initialSearchContent.numberOfPages
            : 1;
    const [currentPage, setCurrentPage] = useState(
        pageNumber && pageNumber > maxPage ? maxPage : pageNumber
    );

    // Initial search data is the search content for initial page load (provided
    // via SSR based on the query parameters). This data is used for both faster
    // initial results and SEO crawlability. It must be cleared whenever any client
    // side re-rendering is needed, such as "load more", filtering or search.
    const [initialSearchData, setInitialSearchData] = useState(
        createInitialSearchData(
            initialSearchContent && 'results' in initialSearchContent
                ? (initialSearchContent.results as SearchItem[])
                : []
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
        allFilters,
        setAllFilters,
        size,
        setSize,
        onSearch,
        onFilter,
        searchString,
        setSearchString,
        numberOfResults,
    } = useSearch(pageNumber, contentType, undefined, undefined, swrFallback);
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

    const clearFilters = () => {
        setAllFilters([]);
    };

    const clearPagination = () => {
        setInitialPageResetFlag(true);
        setInitialSearchData(undefined);
        setCurrentPage(1);
        setPageTitle(buildPageTitle(1));

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
        }
        setSize(size + 1);
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
                <NextImage
                    loader={thumbnailLoader}
                    src={getURLPath('/no-results.png') as string}
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
        <div sx={resultsStringAndTagsStyles}>
            {!isValidating && (
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
            {!isValidating && hasFiltersSet && (
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

    const hasInitialData = initialSearchData
        ? initialSearchData.length > 0
        : false;
    const showLoadMoreButton = hasInitialData
        ? currentPage < maxPage
        : !fullyLoaded;

    const resultData = getResultData(
        data,
        initialSearchData,
        searchString,
        allFilters,
        pageNumber,
        initialPageResetFlag
    );
    const resultIsValidating = getResultIsValidating(
        initialSearchData,
        searchString,
        allFilters,
        isValidating
    );
    const isLoading = !hasInitialData ? isValidating : false;

    const loadMoreHref = hasEmptyFilterAndQuery(searchString, allFilters)
        ? `/developer${slug}/?page=${currentPage + 1}`
        : '#';

    return (
        <>
            <NextSeo
                title={pageTitle}
                {...(['Article', 'Code Example'].includes(contentType) &&
                    description && {
                        description,
                    })}
            />
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
                        <div
                            sx={{
                                ...searchBoxStyles,
                                marginBottom: ['inc40', null, 'inc70'],
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
