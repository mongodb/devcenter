import { useState } from 'react';
import {
    TypographyScale,
    Button,
    TextArea,
    TextInput,
    BrandedIcon,
} from '@mdb/flora';

import { TextFeedbackProps } from '../types';
import { modalWrapperStyles } from '../../shared/styles';

const TextFeedback: React.FunctionComponent<TextFeedbackProps> = ({
    onContinue,
    stars,
    contentCategory,
}) => {
    const category = contentCategory.toLowerCase();
    const title =
        stars < 3
            ? 'How could this be better?'
            : stars < 4
            ? 'Thanks for the feedback.'
            : 'Thanks for the feedback!';
    const subtitle = stars < 3 ? `` : `How can we improve this ${category}?`;

    const [comment, setComment] = useState('');
    const [email, setEmail] = useState('');
    return (
        <div sx={modalWrapperStyles}>
            {stars === 5 && (
                <BrandedIcon
                    name="misc_sunrise"
                    sx={{ width: 72, height: 72 }}
                />
            )}
            <TypographyScale
                variant="heading5"
                sx={{ display: 'block', marginBottom: 'inc20' }}
            >
                {title}
            </TypographyScale>

            {stars > 2 && (
                <TypographyScale
                    variant="body2"
                    sx={{ display: 'block', marginBottom: 'inc50' }}
                >
                    {subtitle}
                </TypographyScale>
            )}
            <div sx={{ marginBottom: 'inc30' }}>
                <TextArea
                    name="description"
                    label="Describe your experience"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    textAreaStyles={{ resize: 'vertical' }}
                />
            </div>
            <div
                sx={{
                    '& > div': {
                        width: '100%',
                        maxWidth: '100%',
                    },
                    marginBottom: 'inc30',
                }}
            >
                <TextInput
                    name="email"
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={() => onContinue(comment, email)} size="small">
                    Next
                </Button>
            </div>
        </div>
    );
};

export default TextFeedback;
