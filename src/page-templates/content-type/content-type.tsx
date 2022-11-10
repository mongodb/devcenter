import { useCallback, useState } from 'react';
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

import LanguagesSection from './languages-section';
import TechnologiesSection from './technologies-section';
import ProductsSection from './products-section';
import Hero from '../../components/hero';
import RequestContentModal, {
    requestContentModalStages,
} from '../../components/request-content-modal';
import { useSearchMeta } from '../../hooks/search/meta';
import { shouldRenderRequestButton } from './utils';
import { CTAContainerStyles } from '../../components/hero/styles';
import { NextSeo } from 'next-seo';
import { ContentTypePageProps } from './types';
import useSearch from '../../hooks/search';

let pluralize = require('pluralize');

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
}) => {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');
    const requestButtonText = `Request ${
        /^[aeiou]/gi.test(contentType) ? 'an' : 'a'
    } ${contentType}`; // Regex to tell if it starts with a vowel.

    const { searchBoxProps, filterProps, sortBoxProps, resultsProps } =
        useSearch(contentType, slug);

    const {
        searchBoxProps: { searchString },
        filterProps: { filters, onFilter },
        resultsProps: { results },
    } = { searchBoxProps, filterProps, resultsProps };

    const [pageTitle, metaDescr, updatePageTitle] = useSearchMeta(
        pageNumber,
        contentType
    );

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

    return (
        <>
            <NextSeo
                description={metaDescr}
                {...(canonicalUrl ? { canonical: canonicalUrl } : {})}
                title={pageTitle}
            />
            <Hero
                crumbs={[{ text: 'MongoDB Developer Center', url: '/' }]}
                name={pluralize(contentType)}
                description={description}
                ctas={
                    shouldRenderRequestButton(contentType) ? (
                        <div sx={CTAContainerStyles}>
                            <Button
                                variant="secondary"
                                onClick={() =>
                                    setRequestContentModalStage('text')
                                }
                                size="large"
                            >
                                {requestButtonText}
                            </Button>
                        </div>
                    ) : null
                }
            />

            {/* Main content body */}
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

                    <div
                        sx={{
                            alignItems: 'flex-start',
                            alignContent: 'flex-start',
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 'inc40',
                            gridColumn: 'span 9',
                            '& > *': {
                                order: 1,
                            },
                        }}
                    >
                        <SearchBox
                            {...searchBoxProps}
                            placeholder={`Search ${pluralize(contentType)}`}
                            extraStyles={{
                                flexBasis: showFeatured ? '100%' : '60%',
                            }}
                        />

                        {showFeatured && (
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
                            </>
                        )}

                        <SortBox
                            {...sortBoxProps}
                            extraStyles={{
                                order: showFeatured ? '2' : '1',
                            }}
                        />

                        <TypographyScale
                            variant="heading5"
                            customElement="h5"
                            sx={{
                                ...h5Styles,
                                flexGrow: '1',
                                flexBasis: showFeatured ? 'auto' : '100%',
                            }}
                        >
                            {resultsHeader}
                        </TypographyScale>

                        {!!filters?.length && (
                            <div sx={{ flexBasis: '100%' }}>
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
                            extraStyles={{
                                gridColumn: [
                                    'span 6',
                                    null,
                                    'span 8',
                                    'span 12',
                                    '4 / span 9',
                                ],
                                order: showFeatured ? '2' : '1',
                            }}
                        />
                    </div>
                </GridLayout>
            </div>

            <RequestContentModal
                setModalStage={setRequestContentModalStage}
                modalStage={requestContentModalStage}
                contentCategory={contentType}
            />
        </>
    );
};

export default ContentTypePage;
