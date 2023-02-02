import Image from 'next/image';
import { cardWrapperStyles } from '../card/styles';
import { Button, TypographyScale } from '@mdb/flora';
import { ThemeUICSSObject } from 'theme-ui';

interface AdditionalContentPlaceholderProps {
    extraStyles?: ThemeUICSSObject;
}

const AdditionalContentPlaceholder: React.FunctionComponent<
    AdditionalContentPlaceholderProps
> = ({ extraStyles = {} }) => (
    <div
        sx={{
            ...cardWrapperStyles,
            '&:hover': {},
            height: '100%',
            alignItems: 'center',
            gap: 'inc40',
            ...extraStyles,
        }}
    >
        <Image
            src="/developer/topic-recommend.svg"
            alt="topic recommendation icon"
            width={180}
            height={96}
        />

        <TypographyScale variant="body2" sx={{ textAlign: 'center' }}>
            Follow more topics for additional recommendations
        </TypographyScale>

        <Button variant="secondary">See topics</Button>
    </div>
);

export default AdditionalContentPlaceholder;
