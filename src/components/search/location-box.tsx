import { ESystemIconNames, ComboBox } from '@mdb/flora';
import { useEffect, useMemo } from 'react';
import { LocationBoxProps } from './types';
import { useResetKey } from './utils';

const LocationBox: React.FunctionComponent<LocationBoxProps> = ({
    locationQuery,
    onLocationQuery,
    onLocationSelect,
    results: { isValidating } = {},
    geolocationValidating,
    displayOptions,
    extraStyles = {},
}) => {
    const resetKeyProps = useResetKey(locationQuery);

    return (
        <div
            {...resetKeyProps}
            sx={{
                width: ['100%', null, 'calc(33% - 12px)'],
                div: {
                    maxWidth: '100%',
                },
                ...extraStyles,
            }}
        >
            <ComboBox
                value={locationQuery}
                label="Location"
                options={displayOptions}
                onChange={onLocationQuery}
                onSelect={onLocationSelect}
                isLoading={isValidating || geolocationValidating}
                noResults={!!locationQuery && displayOptions.length === 0}
                inputName="location-search"
                iconName={ESystemIconNames.SEARCH}
                {...(geolocationValidating ? { isOpen: true } : {})}
            />
        </div>
    );
};

export default LocationBox;
