import { ESystemIconNames, ComboBox } from '@mdb/flora';
import { useEffect, useMemo } from 'react';
import { LocationBoxProps } from './types';
import { useResetKey } from './utils';

const LocationBox: React.FunctionComponent<LocationBoxProps> = ({
    locationQuery,
    onLocationQuery,
    onLocationSelect,
    results: { isValidating },
    displayOptions,
    extraStyles = {},
}) => {
    useEffect(() => {
        if (!locationQuery) {
            onLocationSelect('');
        }
    }, [locationQuery, onLocationSelect]);

    const resetKeyProps = useResetKey(locationQuery);

    return (
        <div
            sx={{
                width: ['100%', null, 'calc(33% - 12px)'],
                div: {
                    maxWidth: '100%',
                },
                'div[role="dropdown"]': {
                    width: 'calc(100% - 48px)',
                },
                ...extraStyles,
            }}
        >
            <ComboBox
                {...resetKeyProps}
                value={locationQuery}
                label="Location"
                options={displayOptions}
                onChange={onLocationQuery}
                onSelect={onLocationSelect}
                isLoading={isValidating}
                noResults={!!locationQuery && displayOptions.length === 0}
                inputName="location-search"
                iconName={ESystemIconNames.SEARCH}
            />
        </div>
    );
};

export default LocationBox;
