import { useState } from 'react';
import { NextSeo } from 'next-seo';
import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from 'next';
import * as Sentry from '@sentry/nextjs';
import {
    GridLayout,
    ESystemIconNames,
    Button,
    TypographyScale,
} from '@mdb/flora';

import { FilterItem } from '@mdb/devcenter-components';

import { getAllSearchContent } from '../api-requests/get-all-search-content';
import allSearchContentPreval from '../service/get-all-search-content.preval';
import Hero from '../components/hero';
import { DesktopFilters, MobileFilters } from '../components/search-filters';
import { h5Styles, pageWrapper } from '../styled/layout';

import { SearchItem } from '../components/search/types';
import { desktopFiltersStyles } from '../page-templates/content-type/styles';
import { searchWrapperStyles } from '../components/search/styles';
import { isValidPage } from '../components/search/utils';
import { useRouter } from 'next/router';
import { parsePageNumber } from '../utils/page-type-factory';
import useSearch from '../hooks/search';
import { getFilters } from '../hooks/search/utils';
import { FilterTagSection } from '@mdb/devcenter-components';
import { useSearchMeta } from '../hooks/search/meta';
import { SearchBox, SearchResults, SortBox } from '../components/search';

export interface SearchProps {
    filterItems: { key: string; value: FilterItem[] }[];
    initialSearchContent: SearchItem[];
    pageNumber: number;
}

const Search: NextPage<SearchProps> = ({
    filterItems,
    initialSearchContent,
    pageNumber,
}) => {
    const router = useRouter();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const { pageTitle, updatePageMeta, canonicalUrl } = useSearchMeta(
        pageNumber,
        '/search',
        'Search'
    );

    const {
        searchBoxProps,
        searchBoxProps: { searchString },
        filterProps,
        filterProps: { filters, onFilter },
        sortBoxProps,
        resultsProps,
        resultsProps: { results, isValidating },
        clearAll,
    } = useSearch(
        pageNumber,
        initialSearchContent,
        updatePageMeta,
        undefined,
        undefined,
        filterItems
    );

    const resultsHeader =
        (!filters.length && !searchString
            ? `All Content`
            : isValidating
            ? ''
            : results.length === 1
            ? '1 Result'
            : `${results.length} Results`) +
        (!isValidating && !!searchString && !filters.length
            ? ` for "${searchString}"`
            : '');

    return (
        <>
            <NextSeo
                title={pageTitle}
                canonical={canonicalUrl}
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
                        {...filterProps}
                        sx={desktopFiltersStyles}
                        filterItems={filterItems}
                    />

                    <div sx={searchWrapperStyles}>
                        <SearchBox
                            {...searchBoxProps}
                            placeholder="Search All"
                            autoFocus
                            extraStyles={{
                                flexBasis: ['100%', null, null, '60%'],
                            }}
                        />

                        <SortBox {...sortBoxProps} />

                        {resultsHeader && (
                            <TypographyScale
                                variant="heading5"
                                customElement="h5"
                                sx={{
                                    ...h5Styles,
                                    flexGrow: '1',
                                    flexBasis: ['100%', null, 'auto'],
                                }}
                            >
                                {resultsHeader}
                            </TypographyScale>
                        )}
                        {!!filters?.length && (
                            <div
                                sx={{
                                    flexBasis: '100%',
                                    display: ['none', null, null, 'block'],
                                }}
                            >
                                <FilterTagSection
                                    allFilters={filters}
                                    onClearTag={(filterTag: FilterItem) =>
                                        onFilter(
                                            filters.filter(
                                                item => item !== filterTag
                                            )
                                        )
                                    }
                                    onClearAll={() => onFilter([])}
                                />
                            </div>
                        )}

                        <Button
                            hasIcon
                            iconPosition="right"
                            iconStrokeWeight="medium"
                            iconName={ESystemIconNames.FILTER_HAMBURGER}
                            onClick={() => setMobileFiltersOpen(true)}
                            customWrapperStyles={{
                                display: ['block', null, null, 'none'],
                                flexBasis: ['100%', null, 'auto'],
                            }}
                            customStyles={{
                                display: ['flex', null, null, 'none'],
                                justifyContent: 'center',
                            }}
                        >
                            Filter & Sort
                            {!!filters.length && ` (${filters.length})`}
                        </Button>

                        <SearchResults
                            {...resultsProps}
                            pageNumber={pageNumber}
                            slug="/search"
                            updatePageMeta={updatePageMeta}
                            contentType="Content"
                            noResultsFooter={
                                <Button
                                    hasIcon={true}
                                    iconName={ESystemIconNames.ARROW_LEFT}
                                    iconPosition="left"
                                    onClick={clearAll}
                                >
                                    Back to all content
                                </Button>
                            }
                        />
                    </div>
                </GridLayout>
            </div>
            {mobileFiltersOpen && (
                <MobileFilters
                    {...filterProps}
                    {...sortBoxProps} // Mobile filters include sorting
                    filterItems={filterItems}
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

    let initialSearchContent: SearchItem[] | undefined;
    try {
        // Used for "load more" crawling
        initialSearchContent = await getAllSearchContent();
        if (
            initialSearchContent &&
            initialSearchContent.length > 0 &&
            !isValidPage(initialSearchContent.length, pageNumber)
        ) {
            return {
                notFound: true,
            };
        }
    } catch (e) {
        Sentry.captureException(e);
    }

    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const filters = await getFilters(
        undefined,
        !!initialSearchContent && Array.isArray(initialSearchContent)
            ? initialSearchContent
            : allSearchContentPreval
    );

    return {
        props: {
            filterItems: filters,
            pageNumber,
            initialSearchContent,
        },
    };
};

export default Search;
