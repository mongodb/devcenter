import React from 'react';
import { TypographyScale, VerticalSectionSpacing } from '@mdb/flora';
import theme from '@mdb/flora/theme';
import { ComponentFactory } from '../component-factory';
import { ThemeUICSSObject } from 'theme-ui';
import { ArticleNode } from '../../../interfaces/article-body-node';

import { Pin, MenuBoxed, Alert } from '../../icons';

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
    borderBottomLeftRadius: 'inc10',
    borderLeftWidth: '3px',
};

const iconStyles = (cardColor: string): ThemeUICSSObject => ({
    position: 'relative',
    top: [
        `calc(${theme.sizes.inc20} / 2)`,
        null,
        null,
        `calc(${theme.sizes.inc40} / 2)`,
    ],
    right: [
        `calc((${theme.sizes.inc20} - 3px) / 2)`, // -3px to align with the center(ish) of the left border.
        null,
        null,
        `calc((${theme.sizes.inc40} - 3px) / 2)`,
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

const variantCardItems = (variant: TVariant) => {
    let colorMedium;
    let colorLight;
    let colorDark;
    let icon;
    switch (variant) {
        case 'generic':
            colorMedium = 'purple60';
            icon = Pin;
            break;
        case 'note':
            colorDark = 'blue70';
            colorMedium = 'blue60';
            colorLight = 'blue10';
            icon = MenuBoxed;
            break;
        case 'important':
            colorDark = 'yellow70';
            colorMedium = 'yellow40';
            colorLight = 'yellow10';
            icon = Alert;
            break;
    }
    return { colorDark, colorMedium, colorLight, icon };
};

export const Callout: React.FunctionComponent<CalloutProps> = ({
    variant = 'generic',
    children,
    ...rest
}) => {
    const {
        colorDark,
        colorMedium,
        colorLight,
        icon: CalloutIcon,
    } = variantCardItems(variant);
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
                <CalloutIcon
                    sx={{
                        stroke: colorMedium,
                        width: ['inc10', null, null, 'inc20'],
                        height: ['inc10', null, null, 'inc20'],
                    }}
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
