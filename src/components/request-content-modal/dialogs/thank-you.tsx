import { TypographyScale, Button } from '@mdb/flora';

import { modalWrapperStyles } from '../styles';

const ThankYou: React.FunctionComponent<{ onContinue: () => void }> = ({
    onContinue,
}) => {
    return (
        <div sx={modalWrapperStyles}>
            <TypographyScale
                variant="heading5"
                sx={{
                    display: 'block',
                    marginBottom: ['inc40', null, null, 'inc50'],
                }}
            >
                Thanks for your request!
            </TypographyScale>

            <TypographyScale
                variant="body2"
                sx={{
                    display: 'block',
                    marginBottom: ['inc40', null, null, 'inc50'],
                }}
            >
                Someone from our Developer Experience team will review your
                request. Once reviewed, someone from our team may reach out to
                you to follow up
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
