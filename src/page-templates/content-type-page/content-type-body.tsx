import { FilterItem, FilterTagSection } from '@mdb/devcenter-components';
import {
    Button,
    ESystemIconNames,
    GridLayout,
    TypographyScale,
} from '@mdb/flora';
import { FeaturedCardSection } from '../../components/card-section';
import { SearchBox, SearchResults, SortBox } from '../../components/search';
import { searchWrapperStyles } from '../../components/search/styles';
import { h5Styles } from '../../styled/layout';
import LanguagesSection from './sections/languages';
import ProductsSection from './sections/products';
import TechnologiesSection from './sections/technologies';
import { ContentTypePageProps } from './types';
import pluralize from 'pluralize';
import { DesktopFilters, MobileFilters } from '../../components/search-filters';
import { desktopFiltersStyles } from './styles';
import { SearchMetaProps, SearchProps } from '../../hooks/search/types';

interface ContentTypeBodyProps {
    searchProps: SearchProps;
    searchMetaProps: SearchMetaProps;
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (open: boolean) => void;
    children: React.ReactNode;
}

const ContentTypeBody: React.FunctionComponent<
    ContentTypePageProps & ContentTypeBodyProps
> = ({
    searchProps: {
        searchStringProps,
        searchStringProps: { searchString },
        sortProps,
        filterProps,
        filterProps: { filters, onFilter },
        resultsProps,
        resultsProps: { results, isValidating },
        clearSearchParam,
    },
    searchMetaProps,
    featured,
    extraFeatured: {
        featuredLanguages,
        featuredTechnologies,
        featuredProducts,
    },
    filterItems,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    contentType,
    children,
    slug,
}) => {
    const showFeatured = !searchString && !filters.length;
    const pluralContentType =
        contentType === 'Video' ? 'Shows' : pluralize(contentType);

    const resultsHeader =
        (showFeatured
            ? `All ${pluralContentType}`
            : !results
            ? ''
            : results.length === 1
            ? '1 Result'
            : `${results.length} Results`) +
        (searchString && results && !filters.length
            ? ` for "${searchString}"`
            : '');

    return (
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
                        {...sortProps} // Mobile filters include sorting
                        contentType={contentType}
                        slug={slug}
                        filterItems={filterItems}
                        closeModal={() => setMobileFiltersOpen(false)}
                    />
                )}
            </div>

            <div sx={searchWrapperStyles}>
                <SearchBox
                    {...searchStringProps}
                    placeholder={`Search ${pluralContentType}`}
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
                                marginBottom: ['section20', null, 'section50'],
                            }}
                            title={`Featured ${pluralContentType}`}
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
                    {...sortProps}
                    contentType={contentType}
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
                                        (item: FilterItem) => item !== filterTag
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
                    {...searchMetaProps}
                    extraStyles={{
                        order: showFeatured ? '4' : '3',
                    }}
                    noResultsFooter={
                        <Button
                            hasIcon={true}
                            iconName={ESystemIconNames.ARROW_LEFT}
                            iconPosition="left"
                            onClick={() => clearSearchParam('search')}
                        >
                            Back to all{' '}
                            {contentType === 'Video'
                                ? 'show'
                                : contentType.toLowerCase()}
                            s
                        </Button>
                    }
                />

                {children}
            </div>
        </GridLayout>
    );
};

export default ContentTypeBody;
