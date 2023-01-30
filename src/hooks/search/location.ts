import { ESystemIconNames } from '@mdb/flora';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { DEBOUNCE_WAIT } from '../../data/constants';
import { ContentItem } from '../../interfaces/content-item';
import { getURLPath } from '../../utils/format-url-path';
import { locationFetcher, swrOptions } from './utils';
import haversine from 'haversine-distance';
import { LocationOptions, LocationSelection } from './types';

// 100 miles in meters
const MAX_LOCATION_RADIUS = 160934;

const DEFAULT_OPTIONS = [
    { icon: ESystemIconNames.LOCATION, label: 'Current Location' },
    { icon: ESystemIconNames.PLAY, label: 'Virtual' },
] as LocationOptions[];

const useLocationSearch = (callback: () => void) => {
    const [locationQuery, setLocationQuery] = useState('');
    const [locationSelection, setLocationSelection] =
        useState<LocationSelection>();
    const [geolocationValidating, setGeolocationValidating] = useState(false);

    const {
        data: locationResults = [],
        isValidating: locationValidating,
    }: {
        data?: google.maps.places.AutocompletePrediction[];
        isValidating: boolean;
    } = useSWR(
        locationQuery ? `search=${locationQuery}` : null,
        locationFetcher,
        swrOptions
    );

    const onLocationQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocationQuery(e.target.value);

        if (!e.target.value) {
            setLocationSelection(undefined);
        }
    };

    const debouncedOnLocationQuery = debounce(onLocationQuery, DEBOUNCE_WAIT);

    const geolocationSuccessCb = useCallback(
        async ({
            coords: { latitude, longitude },
        }: {
            coords: GeolocationCoordinates;
        }) => {
            if (latitude && longitude) {
                try {
                    const { error, results } = await (
                        await fetch(
                            `${getURLPath(
                                'api/geocode'
                            )}?latlng=${latitude},${longitude}`
                        )
                    ).json();

                    if (error) {
                        // There is no visual error handling planned to display to user, so just log it in the console
                        console.error(error);
                        clearLocation();
                    } else {
                        setLocationQuery(results[0]?.formatted_address);
                        setLocationSelection({
                            ...results[0],
                            description: results[0].formatted_address,
                        });
                    }
                } catch (error) {
                    console.error(error);
                    clearLocation();
                }
            }

            setGeolocationValidating(false);
        },
        []
    );

    const geolocationErrorCb = useCallback(() => {
        console.warn(
            'Cannot get current location, as location sharing is disabled'
        );
        clearLocation();
    }, []);

    const onLocationSelect = useCallback(
        async (selection: string) => {
            if (selection === 'Current Location') {
                if (navigator.geolocation) {
                    setGeolocationValidating(true);

                    navigator.geolocation.getCurrentPosition(
                        geolocationSuccessCb,
                        geolocationErrorCb
                    );
                } else {
                    console.warn(
                        'Geolocation functionality is not provided by this browser'
                    );
                }
            }

            // If an actual location is being selected
            if (!DEFAULT_OPTIONS.map(x => x.label).includes(selection)) {
                const option = locationResults?.find(
                    res => res.description === selection
                );

                if (option && option.place_id) {
                    try {
                        const { result } = await (
                            await fetch(
                                `${getURLPath(
                                    'api/location-details'
                                )}?place_id=${option.place_id}`
                            )
                        ).json();

                        setLocationSelection({
                            ...result,
                            description: option.description,
                        });
                    } catch (error) {
                        console.error(error);
                        clearLocation();
                    }
                }
            }

            setLocationQuery(selection);
            callback();
        },
        [locationResults, callback, geolocationSuccessCb, geolocationErrorCb]
    );

    const filterDataByLocation = useCallback(
        (data: ContentItem[]) => {
            // Places typings think lat/lng are functions when they are actually just values, so we convert to unknown first
            const location = locationSelection?.geometry
                ?.location as unknown as google.maps.LatLngLiteral;

            if (!location) {
                return data;
            }

            return data
                .filter(({ coordinates }) => {
                    if (!coordinates) return false;

                    const distance = haversine(location, coordinates);

                    return distance < MAX_LOCATION_RADIUS;
                })
                .sort(({ coordinates: aCoords }, { coordinates: bCoords }) => {
                    if (!aCoords || !bCoords) return 0;

                    return haversine(location, aCoords) >
                        haversine(location, bCoords)
                        ? 1
                        : -1;
                });
        },
        [locationSelection]
    );

    useEffect(() => {
        return () => {
            debouncedOnLocationQuery.cancel();
        };
    }, [debouncedOnLocationQuery]);

    const displayOptions = useMemo(
        () =>
            locationResults?.map(item => ({
                icon: undefined,
                label: item.description,
            })) || [],
        [locationResults]
    ) as LocationOptions[];

    const clearLocation = () => {
        setLocationQuery('');
        setLocationSelection(undefined);
        setGeolocationValidating(false);
    };

    return {
        locationProps: {
            locationQuery,
            onLocationQuery: debouncedOnLocationQuery,
            locationSelection,
            onLocationSelect,
            locationResults,
            locationValidating,
            geolocationValidating,
            displayOptions: locationQuery ? displayOptions : DEFAULT_OPTIONS,
        },
        filterDataByLocation,
        clearLocation,
    };
};

export default useLocationSearch;
