import React from 'react';
import {
    SystemIcon,
    ESystemIconNames,
    TypographyScale,
    VerticalSectionSpacing,
} from '@mdb/flora';
import theme from '@mdb/flora/theme';
import { ComponentFactory } from '../component-factory';
import { ThemeUIStyleObject } from 'theme-ui';
import { ArticleNode } from '../../../interfaces/article-body-node';

type TVariant = 'generic' | 'note' | 'important';

interface CalloutProps {
    variant?: TVariant;
    children: ArticleNode[];
}

const baseCardStyles = {
    boxShadow: 'level01',
    border: `1px solid ${theme.colors.card.default.border}`,
    borderBottomRightRadius: 'inc40',
    borderTopRightRadius: 'inc40',
    borderLeftWidth: '3px',
};

const iconStyles = (cardColor: string): ThemeUIStyleObject => ({
    position: 'relative',
    top: [
        `calc(${theme.sizes.inc20} / 2)`,
        null,
        null,
        `calc(${theme.sizes.inc40} / 2)`,
    ],
    right: [
        `calc(${theme.sizes.inc20} / 2)`,
        null,
        null,
        `calc(${theme.sizes.inc40} / 2)`,
    ],
    height: ['inc20', null, null, 'inc40'],
    width: ['inc20', null, null, 'inc40'],

    bg: 'black00',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    stroke: cardColor,
    borderRadius: 'circle',
});

const variantCardColor = (variant: TVariant) => {
    let colorMedium;
    let colorLight;
    let colorDark;
    switch (variant) {
        case 'generic':
            colorMedium = 'purple60';
            break;
        case 'note':
            colorDark = 'blue70';
            colorMedium = 'blue60';
            colorLight = 'blue10';
            break;
        case 'important':
            colorDark = 'yellow70';
            colorMedium = 'yellow40';
            colorLight = 'yellow10';
            break;
    }
    return { colorDark, colorMedium, colorLight };
};

export const Callout: React.FunctionComponent<CalloutProps> = ({
    variant = 'generic',
    children,
    ...rest
}) => {
    console.log(children);
    const { colorDark, colorMedium, colorLight } = variantCardColor(variant);
    return (
        <div
            sx={{
                marginTop: [
                    `calc(-${theme.sizes.inc20} / 2)`,
                    null,
                    null,
                    `calc(-${theme.sizes.inc40} / 2)`,
                ],
            }}
        >
            <div sx={iconStyles(colorMedium)}>
                <SystemIcon
                    sx={{ display: ['none', null, null, 'block'] }}
                    name={ESystemIconNames.CIRCLE_INFO}
                    size="medium"
                    inheritColor
                />
                <SystemIcon
                    sx={{ display: ['block', null, null, 'none'] }}
                    name={ESystemIconNames.CIRCLE_INFO}
                    size="small"
                    inheritColor
                />
            </div>
            <div
                sx={{
                    ...baseCardStyles,
                    borderLeftColor: colorMedium,
                }}
            >
                {variant !== 'generic' && (
                    <div
                        sx={{
                            bg: colorLight,
                            px: 'inc40',
                            py: ['inc20', null, null, 'inc30'],
                            borderTopRightRadius: 'inc40',
                        }}
                    >
                        <TypographyScale
                            variant="body1"
                            sx={{ color: colorDark }}
                        >
                            {variant === 'important' ? 'Important' : 'Note'}
                        </TypographyScale>
                    </div>
                )}

                <div sx={{ px: 'inc40', py: 'inc30' }}>
                    {children.map((element, index) => (
                        <VerticalSectionSpacing
                            key={index}
                            top={index === 0 ? 'zero' : 'xxsmall'}
                            bottom={
                                index === children.length - 1
                                    ? 'zero'
                                    : 'xxsmall'
                            }
                        >
                            <ComponentFactory
                                {...rest}
                                nodeData={element}
                                key={index}
                            />
                        </VerticalSectionSpacing>
                    ))}
                </div>
            </div>
        </div>
    );
};
