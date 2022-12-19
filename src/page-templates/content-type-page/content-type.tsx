import * as Sentry from '@sentry/nextjs';
import { useMemo, useState } from 'react';
import {
    Button,
    ESystemIconNames,
    GridLayout,
    TypographyScale,
} from '@mdb/flora';
import { h5Styles, pageWrapper } from '../../styled/layout';
import { SearchBox, SearchResults, SortBox } from '../../components/search';
import { desktopFiltersStyles } from './styles';
import { FilterItem, FilterTagSection } from '@mdb/devcenter-components';
import { FeaturedCardSection } from '../../components/card-section';

import { DesktopFilters, MobileFilters } from '../../components/search-filters';

import LanguagesSection from './sections/languages';
import TechnologiesSection from './sections/technologies';
import ProductsSection from './sections/products';
import Hero from '../../components/hero';
import RequestContentModal from '../../components/request-content-modal';
import { useSearchMeta } from '../../hooks/search/meta';
import { shouldRenderRequestButton } from './utils';
import { CTAContainerStyles } from '../../components/hero/styles';
import { NextSeo } from 'next-seo';
import { ContentTypePageProps } from './types';
import useSearch from '../../hooks/search';
import { searchWrapperStyles } from '../../components/search/styles';
import { isEmptyArray } from '../../hooks/search/utils';
import { getRequestBtnText } from '../../utils/page-template-helpers';
import { useRequestContentModal } from '../../contexts/request-content-modal';

let pluralize = require('pluralize');

const heroCrumbs = [
    {
        text: 'MongoDB Developer Center',
        url: '/',
    },
];

// Debug for DEVHUB-1501 which is not yet replicable.
// If data is empty, capture an exception for Sentry.
const useEmptyDataDebug = (results: any, error: any) => {
    if (isEmptyArray(results)) {
        Sentry.withScope(scope => {
            scope.setExtra('resultParameters', {
                results,
                error,
            });
            Sentry.captureException(new Error('Result data is empty'));
        });
    }
};

const ContentTypePage: React.FunctionComponent<ContentTypePageProps> = ({
    description,
    contentType,
    filterItems,
    featured,
    extraFeatured: {
        featuredProducts,
        featuredLanguages,
        featuredTechnologies,
    },
    initialSearchContent,
    pageNumber,
    slug,
    children,
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const requestButtonText = getRequestBtnText(contentType);

    const { setModalStage } = useRequestContentModal();
    const searchMetaProps = useSearchMeta(
        pageNumber,
        slug,
        pluralize(contentType)
    );
    const { pageTitle, metaDescr, updatePageMeta, canonicalUrl } =
        searchMetaProps;
    const searchProps = useSearch(
        initialSearchContent,
        updatePageMeta,
        contentType,
        slug
    );
    const {
        searchBoxProps,
        searchBoxProps: { searchString },
        filterProps,
        filterProps: { filters, onFilter },
        sortBoxProps,
        resultsProps,
        resultsProps: { results, error, isValidating },
        clearAll,
    } = searchProps;

    useEmptyDataDebug(results, error);

    const showFeatured = !searchString && !filters.length;
    const resultsHeader =
        (showFeatured
            ? `All ${pluralize(contentType)}`
            : !results
            ? ''
            : results.length === 1
            ? '1 Result'
            : `${results.length} Results`) +
        (searchString && results && !filters.length
            ? ` for "${searchString}"`
            : '');

    const heroCTAs = useMemo(
        () =>
            shouldRenderRequestButton(contentType) ? (
                <div sx={CTAContainerStyles}>
                    <Button
                        variant="secondary"
                        onClick={() => setModalStage('text')}
                        size="large"
                    >
                        {requestButtonText}
                    </Button>
                </div>
            ) : null,
        [contentType, requestButtonText] // eslint-disable-line react-hooks/exhaustive-deps
    );

    return (
        <>
            <NextSeo
                description={metaDescr}
                {...(canonicalUrl ? { canonical: canonicalUrl } : {})}
                title={pageTitle}
            />
            <Hero
                crumbs={heroCrumbs}
                name={pluralize(contentType)}
                description={description}
                ctas={heroCTAs}
            />
            <div sx={pageWrapper}>
                <GridLayout
                    sx={{
                        rowGap: 0,
                    }}
                >
                    <div
                        sx={{
                            gridColumn: 'span 3',
                        }}
                    >
                        <DesktopFilters
                            {...filterProps}
                            sx={desktopFiltersStyles}
                            filterItems={filterItems}
                        />

                        {mobileFiltersOpen && (
                            <MobileFilters
                                {...filterProps}
                                {...sortBoxProps} // Mobile filters include sorting
                                filterItems={filterItems}
                                closeModal={() => setMobileFiltersOpen(false)}
                            />
                        )}
                    </div>

                    {!children && (
                        <div sx={searchWrapperStyles}>
                            <SearchBox
                                {...searchBoxProps}
                                placeholder={`Search ${pluralize(contentType)}`}
                                extraStyles={{
                                    flexBasis: showFeatured
                                        ? '100%'
                                        : ['100%', null, null, '60%'],
                                }}
                            />

                            {showFeatured && (
                                <div sx={{ width: '100%' }}>
                                    <FeaturedCardSection
                                        content={featured}
                                        sx={{
                                            marginBottom: [
                                                'section20',
                                                null,
                                                'section50',
                                            ],
                                        }}
                                        title={`Featured ${pluralize(
                                            contentType
                                        )}`}
                                        featuredCardType="middle"
                                    />

                                    {!!featuredLanguages?.length && (
                                        <LanguagesSection
                                            title={`${contentType}s by Programming Language`}
                                            items={featuredLanguages}
                                        />
                                    )}
                                    {!!featuredTechnologies?.length && (
                                        <TechnologiesSection
                                            title={`${contentType}s by Technology`}
                                            items={featuredTechnologies}
                                        />
                                    )}
                                    {!!featuredProducts?.length && (
                                        <ProductsSection
                                            title={`${contentType}s by Product`}
                                            items={featuredProducts}
                                        />
                                    )}
                                </div>
                            )}

                            <SortBox
                                {...sortBoxProps}
                                extraStyles={{
                                    order: showFeatured ? '2' : '1',
                                }}
                            />

                            {(!isValidating || showFeatured) && (
                                <TypographyScale
                                    variant="heading2"
                                    sx={{
                                        ...h5Styles,
                                        flexGrow: '1',
                                        flexBasis: showFeatured
                                            ? 'auto'
                                            : ['100%', null, 'auto'],
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
                                slug={slug}
                                updatePageMeta={updatePageMeta}
                                contentType={contentType}
                                extraStyles={{
                                    order: showFeatured ? '2' : '1',
                                }}
                                noResultsFooter={
                                    <Button
                                        hasIcon={true}
                                        iconName={ESystemIconNames.ARROW_LEFT}
                                        iconPosition="left"
                                        onClick={clearAll}
                                    >
                                        Back to all {contentType.toLowerCase()}s
                                    </Button>
                                }
                            />
                        </div>
                    )}

                    {children && children(searchProps, searchMetaProps)}
                </GridLayout>
            </div>
            <RequestContentModal contentCategory={contentType} />
        </>
    );
};

export default ContentTypePage;
