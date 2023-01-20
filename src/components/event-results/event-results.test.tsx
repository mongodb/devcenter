import { render, screen } from '@testing-library/react';
import { SearchProps } from '../../hooks/search/types';
import { ContentItem } from '../../interfaces/content-item';
import EventResults from './event-results';
import { FilterItem } from '@mdb/devcenter-components';

const mockEvent = {
    author: [],
    category: 'Event',
    subCategory: 'Industry Event',
    contentDate: ['2024-04-02T03:30:00.000Z', '2024-04-10T16:00:00.000Z'],
    description: 'Lorem Ipsum Dolor Sit Amet',
    slug: '/events/event',
    tags: [
        {
            name: 'Kafka',
            type: 'Technology',
            slug: '/technologies/kafka',
        },
        {
            name: 'Industry Event',
            type: 'EventType',
            slug: '/events',
        },
        {
            name: 'InPerson',
            type: 'EventAttendance',
            slug: '/events',
        },
        {
            name: 'Event',
            type: 'ContentType',
            slug: '/events',
        },
    ],
    title: 'Mock InPerson Event',
    featured: false,
    location: '20 Rue Quentin-Bauchart Level 2, 75008 Paris, France',
    coordinates: {
        lat: 48.8704156,
        lng: 2.3019408,
    },
} as ContentItem;

const mockVirtualEvent = {
    ...mockEvent,
    tags: [
        ...mockEvent.tags.filter(tag => tag.name !== 'InPerson'),
        {
            name: 'Virtual',
            type: 'EventAttendance',
            slug: '/events',
        },
    ],
    title: 'Mock Virtual Event',
} as ContentItem;

const searchPropsDefaults = {
    searchStringProps: { searchString: '', onSearch: () => '' },
    sortProps: { onSort: () => '' },
    filterProps: { filters: [], onFilter: () => '' },
    locationProps: {
        locationQuery: '',
        onLocationQuery: () => '',
        onLocationSelect: () => '',
        locationValidating: false,
        geolocationValidating: false,
        displayOptions: [],
    },
    resultsProps: {
        allResults: [],
        unfilteredResults: [],
        results: [],
        error: '',
        isValidating: false,
        searchString: '',
        filters: [],
    },
};

const mockSearchPropsFactory = ({
    searchStringProps = searchPropsDefaults.searchStringProps,
    sortProps = searchPropsDefaults.sortProps,
    filterProps = searchPropsDefaults.filterProps,
    locationProps = searchPropsDefaults.locationProps,
    resultsProps = searchPropsDefaults.resultsProps,
}: {
    searchStringProps?: SearchProps['searchStringProps'];
    sortProps?: SearchProps['sortProps'];
    filterProps?: SearchProps['filterProps'];
    locationProps?: SearchProps['locationProps'];
    resultsProps?: SearchProps['resultsProps'];
}): SearchProps =>
    ({
        searchStringProps,
        sortProps,
        filterProps,
        locationProps,
        resultsProps,
    } as SearchProps);

const mockSearchMetaProps = {
    pageTitle: 'MockTitle',
    metaDescr: 'MockDesc',
    canonicalUrl: '/events/event',
    pageNumber: 1,
    slug: '/events/event',
    contentType: 'Event',
    updatePageMeta: () => '',
};

describe('EventResults', () => {
    test('All Events render by default', () => {
        const searchProps = mockSearchPropsFactory({
            resultsProps: {
                ...searchPropsDefaults.resultsProps,
                allResults: [mockEvent],
                unfilteredResults: [],
                results: [],
            },
        });
        render(
            <EventResults
                searchProps={searchProps}
                searchMetaProps={mockSearchMetaProps}
            />
        );

        expect(
            screen.getByRole('heading', { name: /all events/i })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: mockEvent.title })
        ).toBeInTheDocument();
        expect(screen.getAllByTestId('card-list')).toHaveLength(1);
    });

    test('When a search string is entered, results and all events are both displayed', () => {
        const searchString = 'Event';

        const searchProps = mockSearchPropsFactory({
            searchStringProps: {
                ...searchPropsDefaults.searchStringProps,
                searchString,
            },
            resultsProps: {
                ...searchPropsDefaults.resultsProps,
                allResults: [mockEvent],
                unfilteredResults: [mockEvent],
                results: [mockEvent],
            },
        });

        render(
            <EventResults
                searchProps={searchProps}
                searchMetaProps={mockSearchMetaProps}
            />
        );

        expect(
            screen.getByRole('heading', {
                name: new RegExp(`1 result for "${searchString}"`, 'i'),
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: /all events/i })
        ).toBeInTheDocument();
        expect(screen.getAllByTestId('card-list')).toHaveLength(2);
    });

    test('When a location is entered, results and virtual events are both displayed', () => {
        const locationSelection = 'NYC';

        const searchProps = mockSearchPropsFactory({
            locationProps: {
                ...searchPropsDefaults.locationProps,
                locationSelection: {
                    description: locationSelection,
                },
            },
            resultsProps: {
                ...searchPropsDefaults.resultsProps,
                allResults: [mockEvent, mockVirtualEvent],
                unfilteredResults: [mockEvent, mockVirtualEvent],
                results: [mockEvent],
            },
        });

        render(
            <EventResults
                searchProps={searchProps}
                searchMetaProps={mockSearchMetaProps}
            />
        );

        expect(
            screen.getByRole('heading', {
                name: new RegExp(`1 event near "${locationSelection}"`, 'i'),
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: /other virtual events/i })
        ).toBeInTheDocument();
        expect(screen.getAllByTestId('card-list')).toHaveLength(2);
    });

    test('When a location and search string are entered, three results sections are displayed', () => {
        const searchString = 'Event';
        const locationSelection = 'NYC';

        const searchProps = mockSearchPropsFactory({
            searchStringProps: {
                ...searchPropsDefaults.searchStringProps,
                searchString,
            },
            locationProps: {
                ...searchPropsDefaults.locationProps,
                locationSelection: {
                    description: locationSelection,
                },
            },
            resultsProps: {
                ...searchPropsDefaults.resultsProps,
                allResults: [mockEvent, mockVirtualEvent],
                unfilteredResults: [mockEvent, mockVirtualEvent],
                results: [mockEvent],
            },
        });

        render(
            <EventResults
                searchProps={searchProps}
                searchMetaProps={mockSearchMetaProps}
            />
        );

        expect(
            screen.getByRole('heading', {
                name: new RegExp(
                    `1 event for "${searchString}" near ${locationSelection}`,
                    'i'
                ),
            })
        ).toBeInTheDocument();
        expect(
            screen.getByRole('heading', { name: /all events/i })
        ).toBeInTheDocument();
        expect(screen.getAllByTestId('card-list')).toHaveLength(3); // One event in the search results, both in all results
    });

    test('When filters are selected, the results and all results are displayed regardless if other criteria are entered', () => {
        const searchString = 'Event';
        const locationSelection = 'NYC';
        const filterItem = {
            name: 'Virtual',
            type: 'EventAttendance',
        } as FilterItem;

        const searchProps = mockSearchPropsFactory({
            filterProps: {
                ...searchPropsDefaults.filterProps,
                filters: [filterItem],
            },
            searchStringProps: {
                ...searchPropsDefaults.searchStringProps,
                searchString,
            },
            locationProps: {
                ...searchPropsDefaults.locationProps,
                locationSelection: {
                    description: locationSelection,
                },
            },
            resultsProps: {
                ...searchPropsDefaults.resultsProps,
                allResults: [mockVirtualEvent],
                unfilteredResults: [mockVirtualEvent],
                results: [mockVirtualEvent],
            },
        });
        render(
            <EventResults
                searchProps={searchProps}
                searchMetaProps={mockSearchMetaProps}
            />
        );

        expect(
            screen.getByRole('heading', { name: /1 result/i })
        ).toBeInTheDocument();
        expect(screen.getAllByTestId('card-list')).toHaveLength(2);
    });

    test('Passing gridLayout prop as true changes layout to grid', () => {
        const searchProps = mockSearchPropsFactory({
            resultsProps: {
                ...searchPropsDefaults.resultsProps,
                allResults: [mockEvent],
                unfilteredResults: [],
                results: [],
            },
        });
        render(
            <EventResults
                searchProps={searchProps}
                searchMetaProps={mockSearchMetaProps}
                gridLayout
            />
        );

        expect(screen.getAllByTestId('card-medium')).toHaveLength(1);
    });

    test('Passing hideHeader prop as true hides the topmost header properly', () => {
        const searchProps = mockSearchPropsFactory({
            resultsProps: {
                ...searchPropsDefaults.resultsProps,
                allResults: [mockEvent],
                unfilteredResults: [],
                results: [],
            },
        });
        render(
            <EventResults
                searchProps={searchProps}
                searchMetaProps={mockSearchMetaProps}
                hideHeader
            />
        );

        expect(
            screen.queryByRole('heading', { name: /all events/i })
        ).not.toBeInTheDocument();
    });
});
