import { render, screen } from '@testing-library/react';
import useLocationSearch from './location';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

jest.mock('swr', () => {
    const mockAutocompleteResponse = [
        {
            description: 'NYC, NY, USA',
            matched_substrings: [
                {
                    length: 3,
                    offset: 0,
                },
            ],
            place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
            reference: 'ChIJOwg_06VPwokRYv534QaPC8g',
            structured_formatting: {
                main_text: 'NYC',
                main_text_matched_substrings: [
                    {
                        length: 3,
                        offset: 0,
                    },
                ],
                secondary_text: 'NY, USA',
            },
            terms: [
                {
                    offset: 0,
                    value: 'NYC',
                },
                {
                    offset: 5,
                    value: 'NY',
                },
                {
                    offset: 9,
                    value: 'USA',
                },
            ],
            types: ['locality', 'political', 'geocode'],
        },
        {
            description: 'Yonkers, NY, USA',
            matched_substrings: [
                {
                    length: 7,
                    offset: 0,
                },
            ],
            place_id: 'ChIJoa9DCQjAwokRotrYpIRzlr4',
            reference: 'ChIJoa9DCQjAwokRotrYpIRzlr4',
            structured_formatting: {
                main_text: 'Yonkers',
                main_text_matched_substrings: [
                    {
                        length: 7,
                        offset: 0,
                    },
                ],
                secondary_text: 'NY, USA',
            },
            terms: [
                {
                    offset: 0,
                    value: 'Yonkers',
                },
                {
                    offset: 9,
                    value: 'NY',
                },
                {
                    offset: 13,
                    value: 'USA',
                },
            ],
            types: ['locality', 'political', 'geocode'],
        },
        {
            description: 'Nyckelby, Sweden',
            matched_substrings: [
                {
                    length: 3,
                    offset: 0,
                },
            ],
            place_id: 'ChIJQw1wLkh8Z0YRZkDSUGLnR34',
            reference: 'ChIJQw1wLkh8Z0YRZkDSUGLnR34',
            structured_formatting: {
                main_text: 'Nyckelby',
                main_text_matched_substrings: [
                    {
                        length: 3,
                        offset: 0,
                    },
                ],
                secondary_text: 'Sweden',
            },
            terms: [
                {
                    offset: 0,
                    value: 'Nyckelby',
                },
                {
                    offset: 10,
                    value: 'Sweden',
                },
            ],
            types: ['locality', 'political', 'geocode'],
        },
    ];

    return () => ({
        isValidating: false,
        data: mockAutocompleteResponse,
    });
});

jest.mock('lodash.debounce', () => (fn: (...args: any[]) => void) => {
    function returnFunc(...args: any[]) {
        fn(...args);
    }

    // @ts-expect-error Reason
    Function.prototype.cancel = () => '';

    return returnFunc;
});

const mockLocationDetailsResponse = {
    result: {
        address_components: [
            {
                long_name: 'New York',
                short_name: 'New York',
                types: ['locality', 'political'],
            },
            {
                long_name: 'New York',
                short_name: 'NY',
                types: ['administrative_area_level_1', 'political'],
            },
            {
                long_name: 'United States',
                short_name: 'US',
                types: ['country', 'political'],
            },
        ],
        adr_address:
            "<span class='locality'>New York</span>, <span class='region'>NY</span>, <span class='country-name'>USA</span>",
        formatted_address: 'New York, NY, USA',
        geometry: {
            location: { lat: 40.7127753, lng: -74.0059728 },
            viewport: {
                northeast: { lat: 40.91757705070789, lng: -73.70027206817629 },
                southwest: { lat: 40.47739906045452, lng: -74.25908991427882 },
            },
        },
        icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png',
        icon_background_color: '#7B9EB0',
        icon_mask_base_uri:
            'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
        name: 'New York',
        photos: [],
        place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
        reference: 'ChIJOwg_06VPwokRYv534QaPC8g',
        types: ['locality', 'political'],
        url: 'https://maps.google.com/?q=New+York,+NY,+USA&ftid=0x89c24fa5d33f083b:0xc80b8f06e177fe62',
        utc_offset: -300,
        vicinity: 'New York',
        website: 'http://www.nyc.gov/',
    },
};
const mockGeocodeResponse = {
    results: [
        {
            address_components: [
                {
                    long_name: 'New York',
                    short_name: 'New York',
                    types: ['locality', 'political'],
                },
                {
                    long_name: 'New York',
                    short_name: 'NY',
                    types: ['administrative_area_level_1', 'political'],
                },
                {
                    long_name: 'United States',
                    short_name: 'US',
                    types: ['country', 'political'],
                },
            ],
            formatted_address: 'New York, NY, USA',
            geometry: {
                bounds: {
                    northeast: {
                        lat: 40.9175771,
                        lng: -73.70027209999999,
                    },
                    southwest: {
                        lat: 40.4773991,
                        lng: -74.25908989999999,
                    },
                },
                location: {
                    lat: 40.7127753,
                    lng: -74.0059728,
                },
                location_type: 'APPROXIMATE',
                viewport: {
                    northeast: {
                        lat: 40.9175771,
                        lng: -73.70027209999999,
                    },
                    southwest: {
                        lat: 40.4773991,
                        lng: -74.25908989999999,
                    },
                },
            },
            place_id: 'ChIJOwg_06VPwokRYv534QaPC8g',
            types: ['locality', 'political'],
        },
    ],
    error: '',
};

describe('useLocationSearch', () => {
    const mockCallback = jest.fn();
    const mockGeocode = jest.fn();
    const mockLocationDetails = jest.fn();

    beforeEach(() => {
        mockCallback.mockClear();
    });

    // @ts-expect-error Reason
    global.fetch = jest.fn((url: URL) =>
        Promise.resolve({
            json: () => {
                if (url.toString().includes('geocode')) {
                    mockGeocode();
                    return mockGeocodeResponse;
                } else {
                    mockLocationDetails();
                    return mockLocationDetailsResponse;
                }
            },
        })
    ) as unknown as (input: URL) => Promise<Response>;

    const geolocation = {
        clearWatch: () => '',
        getCurrentPosition: jest.fn(successCb => {
            successCb({
                coords: {
                    latitude: 40.7127753,
                    longitude: -74.0059728,
                    accuracy: 0,
                    altitude: 0,
                    altitudeAccuracy: 0,
                    heading: 0,
                    speed: 0,
                },
                timestamp: 0,
            });
        }),
        watchPosition: () => '',
    };

    Object.defineProperty(global.navigator, 'geolocation', {
        value: geolocation,
    });

    const TestLocationComponent = () => {
        const {
            locationProps: {
                locationQuery,
                onLocationQuery,
                locationSelection,
                onLocationSelect,
                locationResults,
                locationValidating,
                displayOptions,
            },
            clearLocation,
        } = useLocationSearch(mockCallback);

        const [, setInputValue] = useState('');

        return (
            <div>
                {locationValidating && (
                    <span className="loading-span">Loading...</span>
                )}

                {!locationValidating && (
                    <>
                        <input
                            type="text"
                            className="query"
                            onChange={e => {
                                onLocationQuery(e);
                                setInputValue(e.target.value);
                            }}
                            value={locationQuery}
                        />

                        <select
                            className="options"
                            onChange={e => onLocationSelect(e.target.value)}
                            value={locationSelection?.description}
                        >
                            {displayOptions.map((option, i) => (
                                <option key={i} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        <div data-testid="location-selection">
                            {locationSelection
                                ? JSON.stringify(locationSelection)
                                : 'No selection'}
                        </div>

                        <ol>
                            {locationResults?.map((result, i) => (
                                <li key={i}>{result.description}</li>
                            ))}
                        </ol>

                        <button onClick={clearLocation} className="clear-btn">
                            Clear
                        </button>
                    </>
                )}
            </div>
        );
    };

    test('Typing an input and selecting a location option', async () => {
        render(<TestLocationComponent />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'NYC');

        expect(input).toHaveValue('NYC');
        const select = screen.getByRole('combobox');
        const option = [...select.children].find(node =>
            node.textContent?.includes('NYC')
        );

        expect(option).toBeDefined();

        await userEvent.selectOptions(select, 'NYC, NY, USA');
        expect(mockLocationDetails).toHaveBeenCalled();
        expect(screen.getByTestId('location-selection')).toHaveTextContent(
            JSON.stringify({
                ...mockLocationDetailsResponse.result,
                description: 'NYC, NY, USA',
            })
        );
    });

    test('Geolocation', async () => {
        render(<TestLocationComponent />);
        const select = screen.getByRole('combobox');
        await userEvent.selectOptions(select, 'Current Location');

        expect(mockGeocode).toHaveBeenCalled();
        screen.debug(screen.getByRole('textbox'));
        expect(screen.getByRole('textbox')).toHaveValue('New York, NY, USA');
    });

    test('Clearing works', async () => {
        render(<TestLocationComponent />);

        const input = screen.getByRole('textbox');
        await userEvent.type(input, 'NYC');
        expect(input).toHaveValue('NYC');

        const clearBtn = screen.getByRole('button', { name: /clear/i });
        userEvent.click(clearBtn);
        expect(input).toHaveValue('');
    });
});
