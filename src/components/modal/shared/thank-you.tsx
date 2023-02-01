import { TypographyScale, Button } from '@mdb/flora';
import { ThemeUICSSObject } from 'theme-ui';
import { useModalContext } from '../../../contexts/modal';

import { modalWrapperStyles } from './styles';

const ThankYou: React.FunctionComponent<{
    title: string;
    subtitle: string | JSX.Element;
    titleStyles?: ThemeUICSSObject;
    subtitleStyles?: ThemeUICSSObject;
}> = ({ title, subtitle, titleStyles = {}, subtitleStyles = {} }) => {
    const { closeModal } = useModalContext();

    return (
        <div sx={modalWrapperStyles}>
            <TypographyScale variant="heading5" sx={titleStyles}>
                {title}
            </TypographyScale>
            <TypographyScale variant="body2" sx={subtitleStyles}>
                {subtitle}
            </TypographyScale>
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="small" onClick={closeModal}>
                    Close
                </Button>
            </div>
        </div>
    );
};

export default ThankYou;
