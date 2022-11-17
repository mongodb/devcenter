import { FilterItem, FilterTagSection } from '@mdb/devcenter-components';
import { Button, ESystemIconNames, TypographyScale } from '@mdb/flora';
import { FeaturedCardSection } from '../../components/card-section';
import { SearchBox, SearchResults, SortBox } from '../../components/search';
import { searchWrapperStyles } from '../../components/search/styles';
import { h5Styles } from '../../styled/layout';
import LanguagesSection from './languages-section';
import ProductsSection from './products-section';
import TechnologiesSection from './technologies-section';
import { ContentTypePageProps } from './types';

let pluralize = require('pluralize');

interface ContentTypeBodyProps {
    searchProps: {
        searchBoxProps: any;
        sortBoxProps: any;
        filterProps: any;
        resultsProps: any;
        clearAll: any;
    };
    searchMetaProps: any;
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (isOpen: boolean) => void;
}

const ContentTypeBody: React.FunctionComponent<
    ContentTypePageProps & ContentTypeBodyProps
> = ({
    searchProps: {
        searchBoxProps,
        searchBoxProps: { searchString },
        sortBoxProps,
        filterProps: { filters, onFilter },
        resultsProps,
        resultsProps: { results, isValidating },
        clearAll,
    },
    searchMetaProps: { updatePageMeta },
    setMobileFiltersOpen,
    featured,
    extraFeatured: {
        featuredLanguages,
        featuredTechnologies,
        featuredProducts,
    },
    contentType,
    pageNumber,
    slug,
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
    );
};

export default ContentTypeBody;
