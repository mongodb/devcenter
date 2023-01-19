import { HorizontalRule, TypographyScale } from '@mdb/flora';
import { FilterItem, FilterTagSection } from '@mdb/devcenter-components';
import { useMemo } from 'react';
import { SearchResults } from '../search';
import { h5Styles } from '../../styled/layout';
import { ContentItem } from '../../interfaces/content-item';
import { SearchMetaProps, SearchProps } from '../../hooks/search/types';

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

interface EventsResultsProps {
    searchProps: SearchProps;
    searchMetaProps: SearchMetaProps;
    hideHeader?: boolean;
    gridLayout?: boolean;
}

const EventResults: React.FunctionComponent<EventsResultsProps> = ({
    searchProps: {
        searchStringProps: { searchString },
        filterProps: { onFilter, filters },
        locationProps: {
            locationSelection: { description: location = '' } = {},
        },
        resultsProps,
        resultsProps: { isValidating, allResults, unfilteredResults, results },
    },
    searchMetaProps,
    gridLayout = false,
    hideHeader = false,
}) => {
    const showFeatured = !searchString && !filters.length && !location;

    const twoCriteriaResults = results;
    const showTwoCriteriaResults = location && searchString && !filters.length;
    const twoCriteriaHeader = `${results.length} event${
        results.length !== 1 ? 's' : ''
    } for "${searchString}" near ${location}`;
    const showTwoCriteriaHeader = !isValidating;

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
    const showOneCriteriaHeader = !isValidating;

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

    return (
        <>
            {showTwoCriteriaResults && (
                <>
                    <div sx={{ order: '5', width: '100%' }}>
                        {showTwoCriteriaHeader && (
                            <TypographyScale
                                variant="heading2"
                                sx={extraSearchResultsHeadingStyles(
                                    showFeatured
                                )}
                            >
                                {twoCriteriaHeader}
                            </TypographyScale>
                        )}
                        {(!!results.length || isValidating) && (
                            <SearchResults
                                {...resultsProps}
                                {...searchMetaProps}
                                layout={gridLayout ? 'grid' : 'list'}
                                results={twoCriteriaResults}
                                extraStyles={extraSearchResultsStyles(
                                    showFeatured
                                )}
                            />
                        )}
                    </div>
                    {!results.length && (
                        <HorizontalRule sx={{ order: '5', margin: '0' }} />
                    )}
                </>
            )}

            {showOneCriteriaResults && (
                <>
                    {/* We only want to display this horizontal rule when search string & location are inputted and "other results" is empty */}
                    {showTwoCriteriaResults &&
                        !!twoCriteriaResults.length &&
                        !oneCriteriaResults.length && (
                            <HorizontalRule sx={{ order: '5', margin: '0' }} />
                        )}

                    <div sx={{ order: '5', width: '100%' }}>
                        {showOneCriteriaHeader && (
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
                                {...searchMetaProps}
                                layout={gridLayout ? 'grid' : 'list'}
                                results={oneCriteriaResults}
                                extraStyles={extraSearchResultsStyles(
                                    showFeatured
                                )}
                            />
                        )}
                    </div>
                    {!oneCriteriaResults.length && (
                        <HorizontalRule sx={{ order: '5', margin: '0' }} />
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
                            : hideHeader && !searchString
                            ? ''
                            : 'All Events'}
                    </TypographyScale>

                    <SearchResults
                        {...resultsProps}
                        {...searchMetaProps}
                        layout={gridLayout ? 'grid' : 'list'}
                        results={allOtherResults}
                        isValidating={
                            allResults.length === 0 ? isValidating : false
                        }
                        extraStyles={extraSearchResultsStyles(showFeatured)}
                    />
                </div>
            )}
        </>
    );
};

export default EventResults;
