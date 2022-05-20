import { useState, useEffect, useMemo } from 'react';
import type { NextPage } from 'next';
import NextImage from 'next/image';
import debounce from 'lodash.debounce';
import useSWR from 'swr';
import {
    GridLayout,
    TypographyScale,
    TextInput,
    ESystemIconNames,
    Link,
    Button,
} from '@mdb/flora';

import { fetcher } from '../../components/search/utils';
import Results from '../../components/search/results';
import Hero from '../../components/hero';
import RequestContentModal, {
    requestContentModalStages,
} from '../../components/request-content-modal';
import { CTAContainerStyles } from '../../components/hero/styles';

import FilterTag from './filter-tag';
import {
    FilterItem,
    DesktopFilters,
    MobileFilters,
} from '../../components/search-filters';

import { ContentTypePageProps } from './types';
import {
    pageWrapper,
    desktopFiltersStyles,
    resultsStringAndTagsStyles,
} from './styles';

import { searchBoxStyles } from '../../components/search/styles';
import noResults from '../../../public/no-results.png';

import { FeaturedCardSection } from '../../components/card-section';

import LanguagesSection from './languages-section';
import TechnologiesSection from './technologies-section';
import ProductsSection from './products-section';

import { itemInFilters } from './utils';

const ContentTypePage: NextPage<ContentTypePageProps> = ({
    description,
    contentType,
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
    expertiseLevelItems,
    featured,
    featuredLanguages,
    featuredTechnologies,
    featuredProducts,
}) => {
    ///////////////////////////////////////
    // HOOKS
    ///////////////////////////////////////
    const [allFilters, setAllFilters] = useState<FilterItem[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [resultstoShow, setResultsToShow] = useState<number>(10);
    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');
    const { data, error, isValidating } = useSWR(
        () =>
            `s=${encodeURIComponent(
                searchString
            )}&contentType=${encodeURIComponent(contentType)}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );
    const [filterTagsExpanded, setFilterTagsExpanded] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    ///////////////////////////////////////
    // HANDLERS
    ///////////////////////////////////////

    const clearFilters = () => {
        setAllFilters([]);
    };

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResultsToShow(10);
        setSearchString(event.target.value);
    };

    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, 400), // Not sure what this value should be.
        [allFilters]
    );
    // Stop the invocation of the debounced function
    // after unmounting
    useEffect(() => {
        return () => {
            debouncedOnSearch.cancel();
        };
    }, []);

    const onFilter = (filters: FilterItem[]) => {
        setResultsToShow(10);
        setAllFilters(filters);
    };

    const onFilterTabClose = (filterTag: FilterItem) => {
        setAllFilters(allFilters.filter(filter => filter !== filterTag));
    };

    const hasFiltersSet = !!allFilters.length;

    const filteredData = (() => {
        if (!data) {
            return [];
        } else if (!hasFiltersSet) {
            return data.filter(({ category }) => category === contentType);
        } else {
            return data.filter(
                item =>
                    item.category === contentType &&
                    itemInFilters(item, allFilters)
            );
        }
    })();

    const numberOfResults = filteredData.length;
    const shownData = filteredData.slice(0, resultstoShow);
    const fullyLoaded = resultstoShow >= numberOfResults;
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
                <NextImage src={noResults}></NextImage>
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
                Back to all {contentType.toLowerCase()}s
            </Button>
        </div>
    );

    const filterTags = (
        <div
            sx={{
                gap: 'inc30',
                flexWrap: 'wrap',
                display: ['none', null, null, 'flex'],
            }}
        >
            {allFilters.length > 5 ? (
                filterTagsExpanded ? (
                    <>
                        {allFilters.map(filter => (
                            <FilterTag
                                key={`${filter.name} ${filter.type}`}
                                filter={filter}
                                closeIcon={true}
                                onClick={onFilterTabClose}
                            />
                        ))}
                        <FilterTag
                            filter={{
                                name: 'Show less',
                                count: 0,
                                subItems: [],
                            }}
                            onClick={() => setFilterTagsExpanded(false)}
                        />
                    </>
                ) : (
                    <>
                        {allFilters.slice(0, 5).map(filter => (
                            <FilterTag
                                key={`${filter.name} ${filter.type}`}
                                filter={filter}
                                closeIcon={true}
                                onClick={onFilterTabClose}
                            />
                        ))}
                        <FilterTag
                            filter={{
                                name: `+${allFilters.length - 5}`,
                                count: 0,
                                subItems: [],
                            }}
                            onClick={() => setFilterTagsExpanded(true)}
                        />
                    </>
                )
            ) : (
                allFilters.map(filter => (
                    <FilterTag
                        key={`${filter.name} ${filter.type}`}
                        filter={filter}
                        closeIcon={true}
                        onClick={onFilterTabClose}
                    />
                ))
            )}
            <Link onClick={clearFilters}>Clear all filters</Link>
        </div>
    );

    const resultsStringAndTags = (
        <div sx={resultsStringAndTagsStyles}>
            {(data || isValidating) && (
                <TypographyScale variant="heading5">
                    {!allFilters.length && !searchString
                        ? `All ${contentType}s`
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
            {hasFiltersSet && filterTags}
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
            <Hero
                crumbs={[]}
                name={`${contentType}s`}
                description={description}
                ctas={CTAElement}
            />
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
                        expertiseLevelItems={expertiseLevelItems}
                    />
                    <div
                        sx={{
                            gridColumn: ['span 6', null, 'span 8', 'span 9'],
                        }}
                    >
                        <div sx={searchBoxStyles}>
                            <TextInput
                                name="search-text-input"
                                label={`Search ${contentType}s`}
                                iconName={ESystemIconNames.SEARCH}
                                value={searchString}
                                onChange={debouncedOnSearch}
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
                                    title={`Featured ${contentType}s`}
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
                        {!!filteredData.length || isValidating || error ? (
                            <>
                                <Results
                                    data={shownData}
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
                                                        resultstoShow + 10
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
            <RequestContentModal
                setModalStage={setRequestContentModalStage}
                modalStage={requestContentModalStage}
                contentCategory={contentType}
            />
            {mobileFiltersOpen && (
                <MobileFilters
                    onFilter={onFilter}
                    allFilters={allFilters}
                    l1Items={l1Items}
                    languageItems={languageItems}
                    technologyItems={technologyItems}
                    expertiseLevelItems={expertiseLevelItems}
                    contributedByItems={contributedByItems}
                    closeModal={() => setMobileFiltersOpen(false)}
                />
            )}
        </>
    );
};

export default ContentTypePage;
