import { TextInput } from '@mdb/flora';
import { ThemeUICSSObject } from 'theme-ui';
import { LocationBoxProps } from './types';

const LocationBox: React.FunctionComponent<LocationBoxProps> = ({
    location,
    onLocationChange,
    extraStyles = {},
}) => (
    <div
        sx={{
            width: ['100%', null, 'calc(33% - 12px)'],
            div: {
                maxWidth: '100%',
            },
            ...extraStyles,
        }}
    >
        <TextInput
            name="location"
            label="Location"
            value={location}
            onChange={onLocationChange}
        />
    </div>
);

export default LocationBox;
