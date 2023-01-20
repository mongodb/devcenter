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
import { LocationBox, SearchBox } from '../components/search';
import { searchWrapperStyles } from '../components/search/styles';
import { Button, ESystemIconNames, GridLayout } from '@mdb/flora';
import { FilterItem } from '@mdb/devcenter-components';
import { useCallback } from 'react';
import { FeaturedCardSection } from '../components/card-section';
import { DesktopFilters, MobileFilters } from '../components/search-filters';
import { desktopFiltersStyles } from '../page-templates/content-type-page/styles';
import { SearchMetaProps, SearchProps } from '../hooks/search/types';
import EventResults from '../components/event-results';

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
    searchProps,
    searchProps: {
        searchStringProps,
        searchStringProps: { searchString },
        filterProps,
        locationProps,
        locationProps: {
            locationSelection: { description: location = '' } = {},
            onLocationSelect,
        },
        clearSearchParam,
    },
    searchMetaProps,
    mobileFiltersOpen,
    setMobileFiltersOpen,
    featured,
    children,
    filterItems: rawFilterItems,
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

                <EventResults
                    searchProps={searchProps}
                    searchMetaProps={searchMetaProps}
                />

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
