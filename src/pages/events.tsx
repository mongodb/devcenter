import type {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
} from 'next';

import ContentTypePage from '../page-templates/content-type-page';
import { ContentTypePageProps } from '../page-templates/content-type-page/types';
import { getContentTypePageData } from '../page-templates/content-type-page/content-type-data';
import { parsePageNumber } from '../utils/page-type-factory';
import { isValidPage } from '../components/search/utils';
import {
    LocationBox,
    SearchBox,
    SearchResults,
    SortBox,
} from '../components/search';
import { searchWrapperStyles } from '../components/search/styles';
import {
    Button,
    ESystemIconNames,
    HorizontalRule,
    TypographyScale,
} from '@mdb/flora';
import { h5Styles } from '../styled/layout';
import { FilterItem, FilterTagSection } from '@mdb/devcenter-components';
import { useCallback } from 'react';
import { FeaturedCardSection } from '../components/card-section';

const extraSearchResultsStyles = (showFeatured: boolean) => ({
    order: showFeatured ? '4' : '3',
});
const extraSearchResultsHeadingStyles = (showFeatured: boolean) => ({
    ...h5Styles,
    flexGrow: '1',
    flexBasis: showFeatured ? 'auto' : ['100%', null, 'auto'],
    order: '2',
    width: '100%',
    marginBottom: '0',
});
interface EventsPageComponentProps {
    allSearchProps: any;
    searchMetaProps: any;
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (open: boolean) => void;
}

const EventsPageComponent: React.FunctionComponent<
    EventsPageComponentProps & ContentTypePageProps
> = ({
    allSearchProps: {
        searchProps,
        searchProps: { searchString },
        filterProps: { filters, onFilter },
        resultsProps,
        resultsProps: { isValidating, results },
        locationProps,
        locationProps: {
            locationSelection: { description: location = '' } = {},
            onLocationSelect,
        },
        clearSearchParam,
    },
    searchMetaProps: { updatePageMeta },
    setMobileFiltersOpen,
    featured,
    pageNumber,
    children,
    filterItems,
}) => {
    const plural = results.length !== 1 ? 's' : '';
    const showFeatured = !searchString && !filters.length && !location;

    const bothCriteriaHeader = `${results.length} ${
        results.length === 1 ? 'event' : 'events'
    } for "${searchString}" near ${location}`;
    let oneCriteriaHeader = `${results.length} `;

    if (filters.length) {
        oneCriteriaHeader += `Result${plural}`;
    } else if (location && searchString) {
        oneCriteriaHeader += `event${plural} match${
            plural ? '' : 'es'
        } "${location}"`;
    } else if (location) {
        oneCriteriaHeader += `event${plural} near "${location}"`;
    } else if (searchString) {
        oneCriteriaHeader += `Result${plural}`;
    }

    const locationSelect = useCallback(
        (selection: string) => {
            if (selection === 'Virtual') {
                const attendanceFilters = filterItems.find(
                    ({ key }: { key: string }) => key === 'AttendanceType'
                );
                const virtualFilters = attendanceFilters?.value.filter(
                    filter =>
                        filter.name === 'Virtual' || filter.name === 'Hybrid'
                );
                const virtualFiltersToAdd = virtualFilters?.filter(
                    virtualFilter =>
                        !filters.find(
                            (filter: FilterItem) =>
                                filter.type === virtualFilter.type &&
                                filter.name === virtualFilter.name
                        )
                );

                if (virtualFiltersToAdd && virtualFiltersToAdd.length) {
                    onFilter(filters.concat(virtualFiltersToAdd));

                    // race condition with combobox's set value
                    setTimeout(() => clearSearchParam('location'), 0);
                }
            }

            onLocationSelect(selection);
        },
        [onLocationSelect, filterItems, filters, onFilter, clearSearchParam]
    );

    console.log(results);

    return (
        <div sx={searchWrapperStyles}>
            <SearchBox
                {...searchProps}
                placeholder="Search Events"
                extraStyles={{ flexBasis: ['100%', null, 'calc(66% - 12px)'] }}
            />

            <LocationBox {...locationProps} onLocationSelect={locationSelect} />

            {showFeatured && (
                <div sx={{ width: '100%' }}>
                    <FeaturedCardSection
                        content={featured.map(item => ({
                            ...item,
                            category: item.subCategory,
                        }))}
                        sx={{
                            marginBottom: ['section20', null, 'section50'],
                        }}
                        title="Featured Events"
                        smallLayout
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

            {location && searchString && !filters.length && (
                <div sx={{ order: '5', width: '100%' }}>
                    <TypographyScale
                        variant="heading2"
                        sx={{
                            ...extraSearchResultsHeadingStyles(showFeatured),
                            marginBottom: 'inc50',
                        }}
                    >
                        {bothCriteriaHeader}
                    </TypographyScale>
                    <SearchResults
                        {...resultsProps}
                        pageNumber={pageNumber}
                        updatePageMeta={updatePageMeta}
                        extraStyles={extraSearchResultsStyles(showFeatured)}
                    />
                    <HorizontalRule
                        sx={{ marginTop: 'inc100' }}
                        spacing="large"
                    />
                </div>
            )}

            {!showFeatured && (
                <div sx={{ order: '5', width: '100%' }}>
                    <TypographyScale
                        variant="heading2"
                        sx={{
                            ...extraSearchResultsHeadingStyles(showFeatured),
                            marginBottom: 'inc50',
                        }}
                    >
                        {oneCriteriaHeader}
                    </TypographyScale>
                    <SearchResults
                        {...resultsProps}
                        pageNumber={pageNumber}
                        updatePageMeta={updatePageMeta}
                        extraStyles={extraSearchResultsStyles(showFeatured)}
                    />
                    <HorizontalRule
                        sx={{ marginTop: 'inc100' }}
                        spacing="large"
                    />
                </div>
            )}

            {!filters.length && (
                <>
                    {(!isValidating || showFeatured) && (
                        <TypographyScale
                            variant="heading2"
                            sx={{
                                ...extraSearchResultsHeadingStyles(
                                    showFeatured
                                ),
                                order: '6',
                            }}
                        >
                            {location && !searchString
                                ? 'Other Virtual Events'
                                : 'All Events'}
                        </TypographyScale>
                    )}

                    <SearchResults
                        {...resultsProps}
                        pageNumber={pageNumber}
                        updatePageMeta={updatePageMeta}
                        extraStyles={{
                            ...extraSearchResultsStyles(showFeatured),
                            order: '6',
                        }}
                    />
                </>
            )}

            {children}
        </div>
    );
};

const EventsPage: NextPage<ContentTypePageProps> = props => (
    <ContentTypePage {...props}>
        {props => <EventsPageComponent {...props} />}
    </ContentTypePage>
);

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { query } = context;

    const pageNumber = parsePageNumber(query.page);

    const data = await getContentTypePageData('Event', pageNumber);

    if (
        data?.initialSearchContent &&
        data?.initialSearchContent.length > 0 &&
        !isValidPage(data?.initialSearchContent.length, pageNumber)
    ) {
        return {
            notFound: true,
        };
    }

    return {
        props: data,
    };
};

export default EventsPage;
