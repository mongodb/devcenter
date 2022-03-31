import { useState } from 'react';

import {
    TypographyScale,
    Button,
    Checkbox,
    ESystemIconNames,
    BrandedIcon,
} from '@mdb/flora';

import { checkboxListStyles, modalWrapperStyles } from '../styles';
import { CheckboxFeedbackProps } from '../types';

const CheckboxFeedback: React.FunctionComponent<CheckboxFeedbackProps> = ({
    onContinue,
    stars,
    contentCategory,
}) => {
    const category = contentCategory.toLowerCase();
    const initialComments =
        stars < 3
            ? {
                  [`This ${category} contained incorrect information`]: false,
                  [`This ${category} was difficult to understand`]: false,
                  [`This ${category} didn't meet my expectations`]: false,
                  [`This ${category} wasn't applicable to my use case`]: false,
                  [`Something else`]: false,
              }
            : {
                  [`This ${category} was a fun read`]: false,
                  [`This ${category} was easy to understand`]: false,
                  [`This ${category} helped me solve a problem`]: false,
                  [`This ${category} was applicable to my use case`]: false,
                  [`Something else`]: false,
              };
    const [comments, setComments] = useState(initialComments);

    const title =
        stars < 3 ? "We're sorry to hear that." : 'Thanks for the feedback!';
    const subtitle =
        stars < 3
            ? `We want to be better for you. Let us know how we can improve this ${category}.`
            : `What did you like about this ${category}?`;
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
            <TypographyScale
                variant="body2"
                sx={{ display: 'block', marginBottom: 'inc50' }}
            >
                {subtitle}
            </TypographyScale>
            <div sx={checkboxListStyles}>
                {Object.keys(comments).map(comment => {
                    return (
                        <Checkbox
                            key={comment}
                            name={comment}
                            label={comment}
                            onToggle={checked => {
                                setComments(prev => ({
                                    ...prev,
                                    [comment]: checked,
                                }));
                            }}
                            checked={comments[comment]}
                        />
                    );
                })}
            </div>
            <div sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    onClick={() =>
                        onContinue(
                            Object.keys(comments).filter(c => comments[c])
                        )
                    }
                    size="small"
                    hasIcon={true}
                    iconPosition="right"
                    iconName={ESystemIconNames.ARROW_RIGHT}
                >
                    Tell us more
                </Button>
            </div>
        </div>
    );
};

export default CheckboxFeedback;
