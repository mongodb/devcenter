import { useMemo } from 'react';
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
import { LocationBox, SearchBox, SearchResults } from '../components/search';
import { searchWrapperStyles } from '../components/search/styles';
import {
    Button,
    ESystemIconNames,
    GridLayout,
    HorizontalRule,
    TypographyScale,
} from '@mdb/flora';
import { h5Styles } from '../styled/layout';
import { FilterItem, FilterTagSection } from '@mdb/devcenter-components';
import { useCallback } from 'react';
import { FeaturedCardSection } from '../components/card-section';
import { DesktopFilters, MobileFilters } from '../components/search-filters';
import { desktopFiltersStyles } from '../page-templates/content-type-page/styles';
import { SearchMetaProps, SearchProps } from '../hooks/search/types';
import { ContentItem } from '../interfaces/content-item';

const extraSearchResultsStyles = (showFeatured: boolean) => ({
    order: showFeatured ? '4' : '3',
    marginBottom: 'inc70',
    '> div': {
        width: '100%',
    },
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
    searchProps: SearchProps;
    searchMetaProps: SearchMetaProps;
    mobileFiltersOpen: boolean;
    setMobileFiltersOpen: (open: boolean) => void;
}

// TODO: Refactor and remove references to this function
const fixInPersonFilter = (filters: FilterItem[], hyphenate = true) =>
    filters.map(filter =>
        filter.name === (hyphenate ? 'InPerson' : 'In-Person')
            ? { ...filter, name: hyphenate ? 'In-Person' : 'InPerson' }
            : filter
    );

const EventsPageComponent: React.FunctionComponent<
    EventsPageComponentProps & ContentTypePageProps
> = ({
    searchProps: {
        searchStringProps,
        searchStringProps: { searchString },
        filterProps,
        resultsProps,
        resultsProps: { isValidating, allResults, unfilteredResults, results },
        locationProps,
        locationProps: {
            locationSelection: { description: location = '' } = {},
            onLocationSelect,
        },
        clearSearchParam,
    },
    searchMetaProps: { updatePageMeta },
    mobileFiltersOpen,
    setMobileFiltersOpen,
    featured,
    pageNumber,
    children,
    filterItems: rawFilterItems,
    slug,
    contentType,
}) => {
    // TODO: Refactor and remove the following three consts
    const filters = useMemo(
        () => fixInPersonFilter(filterProps.filters),
        [filterProps.filters]
    );
    const onFilter = useMemo(
        () => (filters: FilterItem[]) =>
            filterProps.onFilter(fixInPersonFilter(filters, false)),
        [filterProps]
    );
    const filterItems = useMemo(
        () =>
            rawFilterItems.map(item => ({
                ...item,
                value: fixInPersonFilter(item.value),
            })),
        [rawFilterItems]
    );

    const showFeatured = !searchString && !filters.length && !location;

    const twoCriteriaResults = results;
    const showTwoCriteriaResults = location && searchString && !filters.length;
    const twoCriteriaHeader = `${results.length} event${
        results.length !== 1 ? 's' : ''
    } for "${searchString}" near ${location}`;

    const otherResultsAnyLocation = useMemo(
        () =>
            unfilteredResults.filter(
                item => !results.some(res => res.slug === item.slug)
            ),
        [results, unfilteredResults]
    );
    // If there's a search string and a location inputted, display whatever's left of the search query without the location filter underneath
    // If only one of the search string or location are inputted, then we just display the results
    const oneCriteriaResults = showTwoCriteriaResults
        ? otherResultsAnyLocation
        : results;
    // Hide if no filtering/querying inputted, or if both search string & location inputted and loading is showing (so we don't show two loaders at once)
    const showOneCriteriaResults =
        !(isValidating && showTwoCriteriaResults) && !showFeatured;

    let oneCriteriaHeader = `${oneCriteriaResults.length} `;
    const plural = oneCriteriaResults.length !== 1 ? 's' : '';

    if (filters.length) {
        oneCriteriaHeader += `Result${plural}`;
    } else if (location && searchString) {
        oneCriteriaHeader += `other result${plural} match${
            plural ? '' : 'es'
        } "${searchString}"`;
    } else if (location) {
        oneCriteriaHeader += `event${plural} near "${location}"`;
    } else if (searchString) {
        oneCriteriaHeader += `Result${plural} for "${searchString}"`;
    }

    const showAllOtherResults = !isValidating;
    // Always want to show all events, except when only a location
    // is specified where we want to show all virtual events
    const allOtherResults =
        location && !searchString
            ? allResults.filter((res: ContentItem) =>
                  res.tags.some(
                      tag =>
                          tag.type === 'EventAttendance' &&
                          (tag.name === 'Virtual' || tag.name === 'Hybrid')
                  )
              )
            : allResults;

    const locationSelect = useCallback(
        (selection: string) => {
            if (selection === 'Virtual') {
                const attendanceFilters = filterItems.find(
                    ({ key }: { key: string }) => key === 'Attendance Type'
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
                    filters={filters}
                    onFilter={onFilter}
                    filterItems={filterItems}
                    sx={desktopFiltersStyles}
                />

                {mobileFiltersOpen && (
                    <MobileFilters
                        {...filterProps}
                        filters={filters}
                        onFilter={onFilter}
                        filterItems={filterItems}
                        closeModal={() => setMobileFiltersOpen(false)}
                    />
                )}
            </div>

            <div
                sx={{
                    ...searchWrapperStyles,
                    gap: 'normal',
                    rowGap: ['inc40', null, 'inc70'],
                    columnGap: 'inc40',
                }}
            >
                <SearchBox
                    {...searchStringProps}
                    placeholder="Search Events"
                    extraStyles={{
                        flexBasis: ['100%', null, 'calc(66% - 12px)'],
                        marginBottom: 0,
                    }}
                />

                <LocationBox
                    {...locationProps}
                    onLocationSelect={locationSelect}
                />

                {showFeatured && featured.length >= 3 && (
                    <div sx={{ width: '100%', marginBottom: 'inc70' }}>
                        <FeaturedCardSection
                            content={featured}
                            title="Featured Events"
                            featuredCardType="middle"
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
                    Filter
                    {!!filters.length && ` (${filters.length})`}
                </Button>

                {showTwoCriteriaResults && (
                    <>
                        <div sx={{ order: '5', width: '100%' }}>
                            {!isValidating && (
                                <TypographyScale
                                    variant="heading2"
                                    sx={extraSearchResultsHeadingStyles(
                                        showFeatured
                                    )}
                                >
                                    {twoCriteriaHeader}
                                </TypographyScale>
                            )}
                            {!!results.length && (
                                <SearchResults
                                    {...resultsProps}
                                    results={twoCriteriaResults}
                                    pageNumber={pageNumber}
                                    updatePageMeta={updatePageMeta}
                                    extraStyles={extraSearchResultsStyles(
                                        showFeatured
                                    )}
                                    slug={slug}
                                    contentType={contentType}
                                />
                            )}
                        </div>
                        {!results.length && (
                            <HorizontalRule sx={{ order: '5' }} />
                        )}
                    </>
                )}

                {showOneCriteriaResults && (
                    <>
                        {/* We only want to display this horizontal rule when search string & location are inputted and "other results" is empty */}
                        {showTwoCriteriaResults &&
                            !!twoCriteriaResults.length &&
                            !oneCriteriaResults.length && (
                                <HorizontalRule sx={{ order: '5' }} />
                            )}

                        <div sx={{ order: '5', width: '100%' }}>
                            {!isValidating && (
                                <TypographyScale
                                    variant="heading2"
                                    sx={extraSearchResultsHeadingStyles(
                                        showFeatured
                                    )}
                                >
                                    {oneCriteriaHeader}
                                </TypographyScale>
                            )}

                            {!!filters?.length && (
                                <div
                                    sx={{
                                        flexBasis: '100%',
                                        display: ['none', null, null, 'block'],
                                        marginTop: 'inc20',
                                        marginBottom: 'inc40',
                                    }}
                                >
                                    <FilterTagSection
                                        allFilters={filters}
                                        onClearTag={(filterTag: FilterItem) =>
                                            onFilter(
                                                filters.filter(
                                                    (item: FilterItem) =>
                                                        item !== filterTag
                                                )
                                            )
                                        }
                                        onClearAll={() => onFilter([])}
                                    />
                                </div>
                            )}

                            {!!oneCriteriaResults.length && (
                                <SearchResults
                                    {...resultsProps}
                                    results={oneCriteriaResults}
                                    pageNumber={pageNumber}
                                    updatePageMeta={updatePageMeta}
                                    extraStyles={extraSearchResultsStyles(
                                        showFeatured
                                    )}
                                    slug={slug}
                                    contentType={contentType}
                                />
                            )}
                        </div>
                        {!oneCriteriaResults.length && (
                            <HorizontalRule sx={{ order: '5' }} />
                        )}
                    </>
                )}

                {showAllOtherResults && (
                    <div sx={{ order: '6', width: '100%' }}>
                        <TypographyScale
                            variant="heading2"
                            sx={extraSearchResultsHeadingStyles(showFeatured)}
                        >
                            {location && !searchString
                                ? 'Other Virtual Events'
                                : 'All Events'}
                        </TypographyScale>

                        <SearchResults
                            {...resultsProps}
                            results={allOtherResults}
                            isValidating={
                                allResults.length === 0 ? isValidating : false
                            }
                            pageNumber={pageNumber}
                            updatePageMeta={updatePageMeta}
                            extraStyles={extraSearchResultsStyles(showFeatured)}
                            slug={slug}
                            contentType={contentType}
                        />
                    </div>
                )}

                {children}
            </div>
        </GridLayout>
    );
};

const EventsPage: NextPage<ContentTypePageProps> = props => (
    <ContentTypePage {...props}>
        {(props: any) => <EventsPageComponent {...props} />}
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
