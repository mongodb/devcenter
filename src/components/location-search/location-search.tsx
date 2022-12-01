import debounce from 'lodash.debounce';
import { ComboBox, ESystemIconNames } from '@mdb/flora';
import { ChangeEvent, useCallback, useState } from 'react';

import { DEBOUNCE_WAIT } from '../../data/constants';
import { getURLPath } from '../../utils/format-url-path';

type Option = string | { icon: string; label: string };

// TODO: needs to be updated with icon names that will be added by Web Team - https://jira.mongodb.org/browse/WEBSITE-13740
const DEFAULT_OPTIONS = [
    { icon: ESystemIconNames.ARROW_UP, label: 'Current Location' },
    { icon: ESystemIconNames.ARROW_DOWN, label: 'Virtual' },
];

interface LocationSearchProps {
    onSelectCallback?: (selection: string) => void;
}

export default function LocationSearch({
    onSelectCallback = () => null,
}: LocationSearchProps) {
    const [value, setValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState<Option[]>(DEFAULT_OPTIONS);

    async function geolocationSuccessCb({
        coords: { latitude, longitude },
    }: {
        coords: GeolocationCoordinates;
    }) {
        if (latitude && longitude) {
            const req = await fetch(
                `${getURLPath('api/geocode')}?latlng=${latitude},${longitude}`
            );
            const { error, results } = await req.json();

            if (error) {
                // There is no visual error handling planned to display to user, so just log it in the console
                console.warn(error);
                setValue('');
            } else {
                setValue(results[0]?.formatted_address);
            }
        }
    }

    function geolocationErrorCb() {
        console.warn(
            'Cannot get current location, as location sharing is disabled'
        );
        setValue('');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSearch = useCallback(
        debounce(async value => {
            const req = await fetch(
                `${getURLPath('api/location')}?search=${value}`
            );
            const { results, error } = await req.json();

            if (error) {
                // There is no visual error handling planned to display to user, so just log it in the console
                console.warn(error);
                setOptions([]);
            } else {
                setOptions(
                    results.map(
                        ({ description }: { description: string }) =>
                            description
                    )
                );
            }

            setIsLoading(false);
        }, DEBOUNCE_WAIT),
        []
    );

    function onChange(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.value) {
            return setOptions(DEFAULT_OPTIONS);
        }
        setIsLoading(true);
        setValue(e.target.value);
        debouncedSearch(e.target.value);
    }

    function onSelect(selection: string) {
        setValue(selection);
        onSelectCallback(selection);

        if (selection === 'Current Location') {
            if (navigator.geolocation) {
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
    }

    return (
        <ComboBox
            value={value}
            label="Location"
            options={options}
            onChange={onChange}
            onSelect={onSelect}
            isLoading={isLoading}
            noResults={!!value && options.length === 0}
            inputName="location-search"
            iconName={ESystemIconNames.SEARCH}
        />
    );
}
