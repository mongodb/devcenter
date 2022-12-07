import { FilterItem, FilterTagSection } from '@mdb/devcenter-components';
import { Button, ESystemIconNames, TypographyScale } from '@mdb/flora';
import { FeaturedCardSection } from '../../components/card-section';
import { SearchBox, SearchResults, SortBox } from '../../components/search';
import { searchWrapperStyles } from '../../components/search/styles';
import { h5Styles } from '../../styled/layout';
import LanguagesSection from './sections/languages';
import ProductsSection from './sections/products';
import TechnologiesSection from './sections/technologies';
import { ContentTypePageProps } from './types';

let pluralize = require('pluralize');

interface ContentTypeBodyProps {
    allSearchProps: {
        searchProps: any;
        sortProps: any;
        filterProps: any;
        resultsProps: any;
        clearSearchParam: any;
    };
    searchMetaProps: any;
    mobileFiltersOpen: boolean;
    children: React.ReactNode;
}

const ContentTypeBody: React.FunctionComponent<
    ContentTypePageProps & ContentTypeBodyProps
> = ({
    allSearchProps: {
        searchProps,
        searchProps: { searchString },
        sortProps,
        filterProps: { filters, onFilter },
        resultsProps,
        resultsProps: { results, isValidating },
        clearSearchParam,
    },
    searchMetaProps: { updatePageMeta },
    featured,
    extraFeatured: {
        featuredLanguages,
        featuredTechnologies,
        featuredProducts,
    },
    contentType,
    pageNumber,
    slug,
    children,
}) => {
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
        <div sx={searchWrapperStyles}>
            <SearchBox
                {...searchProps}
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
                            marginBottom: ['section20', null, 'section50'],
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
                </div>
            )}

            <SortBox
                {...sortProps}
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

            <SearchResults
                {...resultsProps}
                pageNumber={pageNumber}
                slug={slug}
                updatePageMeta={updatePageMeta}
                contentType={contentType}
                extraStyles={{
                    order: showFeatured ? '4' : '3',
                }}
                noResultsFooter={
                    <Button
                        hasIcon={true}
                        iconName={ESystemIconNames.ARROW_LEFT}
                        iconPosition="left"
                        onClick={clearSearchParam}
                    >
                        Back to all {contentType.toLowerCase()}s
                    </Button>
                }
            />

            {children}
        </div>
    );
};

export default ContentTypeBody;
