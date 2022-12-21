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
    HorizontalRule,
    TypographyScale,
} from '@mdb/flora';
import { h5Styles } from '../styled/layout';
import { FilterItem, FilterTagSection } from '@mdb/devcenter-components';
import { useCallback } from 'react';
import { FeaturedCardSection } from '../components/card-section';
import { SearchItem } from '../components/search/types';

const extraSearchResultsStyles = (showFeatured: boolean) => ({
    order: showFeatured ? '4' : '3',
    marginBottom: 'inc30',
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
        resultsProps: { isValidating, allResults, unfilteredResults, results },
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

    let oneCriteriaHeader = `${results.length} `;

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

    const twoCriteriaHeader = `${results.length} ${
        results.length === 1 ? 'event' : 'events'
    } for "${searchString}" near ${location}`;

    const showTwoCriteriaResults = location && searchString && !filters.length;
    const twoCriteriaResults = results;

    const showOneCriteriaResults = !showFeatured;
    const oneCriteriaResults = showTwoCriteriaResults
        ? unfilteredResults
        : results;

    const showAllOtherResults = !isValidating;
    // Always want to show all events, except when only a location
    // is specified where we want to show all virtual events
    const allOtherResults =
        location && !searchString
            ? allResults.filter((res: SearchItem) =>
                  res.tags.some(
                      tag =>
                          tag.type === 'EventAttendance' &&
                          tag.name === 'Virtual'
                  )
              )
            : allResults;

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

    return (
        <div
            sx={{
                ...searchWrapperStyles,
                gap: 'normal',
                rowGap: ['inc40', null, 'inc70'],
                columnGap: 'inc40',
            }}
        >
            <SearchBox
                {...searchProps}
                placeholder="Search Events"
                extraStyles={{ flexBasis: ['100%', null, 'calc(66% - 12px)'] }}
            />

            <LocationBox {...locationProps} onLocationSelect={locationSelect} />

            {showFeatured && (
                <div sx={{ width: '100%' }}>
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
                Filter & Sort
                {!!filters.length && ` (${filters.length})`}
            </Button>

            {showTwoCriteriaResults && (
                <>
                    <div sx={{ order: '5', width: '100%' }}>
                        <TypographyScale
                            variant="heading2"
                            sx={extraSearchResultsHeadingStyles(showFeatured)}
                        >
                            {twoCriteriaHeader}
                        </TypographyScale>
                        {!!results.length && (
                            <SearchResults
                                {...resultsProps}
                                results={twoCriteriaResults}
                                pageNumber={pageNumber}
                                updatePageMeta={updatePageMeta}
                                extraStyles={extraSearchResultsStyles(
                                    showFeatured
                                )}
                            />
                        )}
                    </div>
                    {!results.length && <HorizontalRule sx={{ order: '5' }} />}
                </>
            )}

            {showOneCriteriaResults && (
                <>
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

                        {!!results.length && (
                            <SearchResults
                                {...resultsProps}
                                results={oneCriteriaResults}
                                pageNumber={pageNumber}
                                updatePageMeta={updatePageMeta}
                                extraStyles={extraSearchResultsStyles(
                                    showFeatured
                                )}
                            />
                        )}
                    </div>
                    {!results.length && <HorizontalRule sx={{ order: '5' }} />}
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
                    />
                </div>
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
