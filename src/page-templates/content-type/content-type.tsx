import { useState } from 'react';
import type { NextPage } from 'next';
import NextImage from 'next/image';
import { NextSeo } from 'next-seo';

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
import FilterTagSection from '../../components/search-filters/filter-tag-section';
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
}) => {
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
    } = useSearch(contentType);

    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');

    const [filterTagsExpanded, setFilterTagsExpanded] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    ///////////////////////////////////////
    // HANDLERS
    ///////////////////////////////////////

    const clearFilters = () => {
        setAllFilters([]);
    };

    const onFilter = (filters: FilterItem[]) => {
        setResultsToShow(10);
        setAllFilters(filters);
    };

    const onFilterTagClose = (filterTag: FilterItem) => {
        setAllFilters(allFilters.filter(filter => filter !== filterTag));
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
                }}
            >
                Back to all {contentType.toLowerCase()}s
            </Button>
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
                title={`${pluralize(contentType)} | MongoDB`}
                {...(['Article', 'Code Example'].includes(contentType) &&
                    description && {
                        description,
                    })}
            />
            <Hero
                crumbs={[{ text: 'MongoDB Developer Center', url: '/' }]}
                name={pluralize(contentType)}
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
                        codeLevelItems={
                            contentType === 'Code Example' ? codeLevelItems : []
                        }
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
                                onChange={onSearch}
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
