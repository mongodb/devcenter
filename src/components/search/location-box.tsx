import { TextInput } from '@mdb/flora';
import { ThemeUICSSObject } from 'theme-ui';

const LocationBox: React.FunctionComponent<{
    extraStyles?: ThemeUICSSObject;
}> = ({ extraStyles = {} }) => (
    <div
        sx={{
            width: ['100%', null, 'calc(33% - 12px)'],
            div: {
                maxWidth: '100%',
            },
            ...extraStyles,
        }}
    >
        <TextInput name="location" label="Location" />
    </div>
);

export default LocationBox;
