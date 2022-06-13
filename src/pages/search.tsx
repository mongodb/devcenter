import { useState } from 'react';
import { NextSeo } from 'next-seo';
import type { NextPage, GetStaticProps } from 'next';
import NextImage from 'next/image';
import {
    GridLayout,
    TextInput,
    ESystemIconNames,
    Button,
    TypographyScale,
} from '@mdb/flora';

import Hero from '../components/hero';
import { DesktopFilters, MobileFilters } from '../components/search-filters';
import { pageWrapper } from '../styled/layout';

import { FilterItem } from '../components/search-filters';
import { getFilters } from '../hooks/search/utils';
import {
    resultsStringAndTagsStyles,
    desktopFiltersStyles,
} from '../page-templates/content-type/styles';
import { searchBoxStyles } from '../components/search/styles';

import Results from '../components/search/results';
import { useRouter } from 'next/router';
import { getURLPath } from '../utils/format-url-path';
import { thumbnailLoader } from '../components/card/utils';
import useSearch from '../hooks/search';
import FilterTagSection from '../components/search-filters/filter-tag-section';

export interface SearchProps {
    l1Items: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
    contentTypeItems: FilterItem[];
    expertiseLevelItems: FilterItem[];
}

const Search: NextPage<SearchProps> = ({
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
    contentTypeItems,
    expertiseLevelItems,
}) => {
    const router = useRouter();

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
        const newFilters = allFilters.filter(filter => filter !== filterTag);
        onFilter(newFilters);
    };

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
                        {resultsStringAndTags}
                        {!!data.length || isValidating || error ? (
                            <>
                                <Results
                                    data={data}
                                    isLoading={isValidating}
                                    hasError={error}
                                />
                                {!fullyLoaded && (
                                    <div
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: ['inc70', null, 'inc90'],
                                        }}
                                    >
                                        {!isValidating && data && (
                                            <Button
                                                onClick={() =>
                                                    setResultsToShow(
                                                        resultsToShow + 10
                                                    )
                                                }
                                                variant="secondary"
                                            >
                                                Load more
                                            </Button>
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

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const filters = await getFilters();

    return {
        props: filters,
    };
};

export default Search;
