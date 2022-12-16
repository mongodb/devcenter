import { ESystemIconNames, ComboBox } from '@mdb/flora';
import { locationBoxStyles } from './styles';
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
                ...locationBoxStyles,
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
                iconName={ESystemIconNames.LOCATION}
                {...(geolocationValidating ? { isOpen: true } : {})}
            />
        </div>
    );
};

export default LocationBox;
