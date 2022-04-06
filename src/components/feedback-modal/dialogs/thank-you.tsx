import { TypographyScale, Button, Link } from '@mdb/flora';

import { modalWrapperStyles } from '../styles';

const ThankYou: React.FunctionComponent<{ onContinue: () => void }> = ({
    onContinue,
}) => {
    const title = 'We appreciate your feedback.';
    const subtitle = (
        <>
            We&apos;d love to chat with you and answer your questions in our
            online{' '}
            <a // The Flora Link component is not designed for inline use (it has an underline that increases the box size when inline).
                href="https://www.mongodb.com/community"
                target="_blank"
                rel="noreferrer"
                sx={{ color: 'blue60' }}
            >
                MongoDB Community
            </a>
            . It&apos;s where people who develop MongoDB hang out with people
            who develop with MongoDB.
        </>
    );
    return (
        <div sx={modalWrapperStyles}>
            <TypographyScale
                variant="heading5"
                sx={{ display: 'block', marginBottom: 'inc20' }}
            >
                {title}
            </TypographyScale>

            <TypographyScale
                variant="body2"
                sx={{ display: 'block', marginBottom: 'inc50' }}
            >
                {subtitle}
            </TypographyScale>
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={onContinue} size="small">
                    Close
                </Button>
            </div>
        </div>
    );
};

export default ThankYou;
