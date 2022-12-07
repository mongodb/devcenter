import { ESystemIconNames } from '@mdb/flora';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { DEBOUNCE_WAIT } from '../../data/constants';
import { ContentItem } from '../../interfaces/content-item';
import { getURLPath } from '../../utils/format-url-path';
import { locationFetcher, swrOptions } from './utils';

// TODO: needs to be updated with icon names that will be added by Web Team - https://jira.mongodb.org/browse/WEBSITE-13740
const DEFAULT_OPTIONS = [
    { icon: ESystemIconNames.ARROW_UP, label: 'Current Location' },
    { icon: ESystemIconNames.ARROW_DOWN, label: 'Virtual' },
];

type SelectionItem = { description: string };

const useLocationSearch = (callback: () => void) => {
    const [locationQuery, setLocationQuery] = useState('');
    const [locationSelection, setLocationSelection] = useState<
        ContentItem | SelectionItem
    >();
    const [geolocationValidating, setGeolocationValidating] = useState(false);

    const results = useSWR(
        `search=${locationQuery}`,
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
        (selection: string) => {
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
                const option = results?.data?.find(
                    res => res.description === selection
                );

                setLocationSelection(option);
            }

            setLocationQuery(selection);
            callback();
        },
        [results?.data, callback, geolocationSuccessCb, geolocationErrorCb]
    );

    useEffect(() => {
        return () => {
            debouncedOnLocationQuery.cancel();
        };
    }, [debouncedOnLocationQuery]);

    const displayOptions = useMemo(
        () => results.data?.map(item => item.description) || [],
        [results]
    ) as string[];

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
            results,
            geolocationValidating,
            displayOptions: locationQuery ? displayOptions : DEFAULT_OPTIONS,
        },
        clearLocation,
    };
};

export default useLocationSearch;
