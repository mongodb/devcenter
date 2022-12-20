import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';
import { PillCategory } from '../../types/pill-category';
import { CardVariant } from './types';

interface IPillColorMap {
    [key: string]: string;
}

const pillColorMap: IPillColorMap = {
    Video: theme.colors.purple10,
    Article: theme.colors.blue10,
    'Code Example': theme.colors.yellow20,
    Tutorial: theme.colors.green20,
    Podcast: theme.colors.red20,
    Quickstart: theme.colors.yellow20,
};

export const pillStyles = (pillCategory: PillCategory) => ({
    marginBottom: 'inc30',
    bg: pillColorMap[pillCategory],
    // Weird values but that's what figma says for the flora pills.
    px: ['inc30', null, null, 'inc40'],
    py: ['inc10', null, null, 'inc20'],
    fontSize: ['9px', null, null, 'inc00'],
    fontWeight: '500',
    letterSpacing: ['2.5px', null, null, '3px'],
});

export const thumbnailWrapperStyles = (
    variant: CardVariant,
    category: PillCategory
): ThemeUICSSObject => {
    const videoAspectRatio =
        category === 'Video' ? { aspectRatio: '16/9' } : {};

    let mobileDisplay;
    let tabletDesktopDisplay;

    switch (variant) {
        case 'large':
            tabletDesktopDisplay = 'block';
            mobileDisplay = category === 'Tutorial' ? 'none' : 'block';
            break;
        case 'medium':
            mobileDisplay = tabletDesktopDisplay =
                category === 'Tutorial' ? 'none' : 'block';
            break;
        case 'small':
            tabletDesktopDisplay = 'none';
            mobileDisplay = category === 'Tutorial' ? 'none' : 'block';
            break;
        case 'list':
            mobileDisplay = tabletDesktopDisplay = 'block';
            break;
        case 'related':
            mobileDisplay = tabletDesktopDisplay = 'none';
            break;
    }
    // Thumbnail dimensions vary by content type.
    let mobileDimensions;
    let tabletDimensions;
    let desktopDimensions;

    switch (variant) {
        case 'large':
            switch (category) {
                case 'Article':
                    mobileDimensions = '64px';
                    break;
                case 'Code Example':
                    mobileDimensions = '96px';
                    break;
                case 'Podcast':
                    mobileDimensions = '48px';
                    break;
                case 'Quickstart':
                    mobileDimensions = '64px';
                    break;
                default:
                    mobileDimensions = null;
            }
            tabletDimensions = desktopDimensions = '180px';
            break;
        case 'medium':
            switch (category) {
                case 'Article':
                    mobileDimensions =
                        tabletDimensions =
                        desktopDimensions =
                            '64px';
                    break;
                case 'Code Example':
                    mobileDimensions =
                        tabletDimensions =
                        desktopDimensions =
                            '96px';
                    break;
                case 'Podcast':
                    mobileDimensions = tabletDimensions = '48px';
                    desktopDimensions = '64px';
                    break;
                case 'Quickstart':
                    mobileDimensions =
                        tabletDimensions =
                        desktopDimensions =
                            '64px';
                    break;
                default:
                    mobileDimensions = null;
            }
            break;
        case 'small':
            switch (category) {
                case 'Article':
                    mobileDimensions = '64px';
                    break;
                case 'Code Example':
                    mobileDimensions = '96px';
                    break;
                case 'Podcast':
                    mobileDimensions = '48px';
                    break;
                case 'Quickstart':
                    mobileDimensions = '64px';
                    break;
                default:
                    mobileDimensions = null;
            }
            tabletDimensions = desktopDimensions = null;
            break;
        case 'list':
            mobileDimensions = '96px';
            tabletDimensions = desktopDimensions = '180px';
            break;
        case 'related':
            mobileDimensions = tabletDimensions = desktopDimensions = null;
            break;
    }

    return {
        display: [mobileDisplay, null, tabletDesktopDisplay],
        flexShrink: 0,
        position: 'relative',
        ...videoAspectRatio,
        width: [mobileDimensions, null, tabletDimensions, desktopDimensions],
        height: [mobileDimensions, null, tabletDimensions, desktopDimensions],
    };
};

export const cardWrapperStyles: ThemeUICSSObject = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: [
        theme.space.cards.paddingXXS,
        null,
        null,
        theme.space.cards.paddingXS,
    ],
    height: 'max-content',
    border: `1px solid ${theme.colors.card.default.border}`,
    boxShadow: 'level01',
    borderRadius: 'inc50',
    '&:hover': {
        border: `1px solid ${theme.colors.card.default.borderDarker}`,
        boxShadow: 'level03',
        cursor: 'pointer',
    },
    gap: ['inc40', null, null, 'inc50'],
    bg: theme.colors.panels.card.bg,
};

export const descriptionStyles = (
    variant: CardVariant,
    category: PillCategory
): ThemeUICSSObject => {
    let mobileDisplay;
    let tabletDesktopDisplay;
    switch (variant) {
        case 'large':
            tabletDesktopDisplay = '-webkit-box';
            mobileDisplay =
                category === 'Code Example' ? '-webkit-box' : 'none';
            break;
        case 'medium':
            tabletDesktopDisplay = mobileDisplay =
                category === 'Code Example' ? '-webkit-box' : 'none';
            break;
        case 'small':
            tabletDesktopDisplay = 'none';
            mobileDisplay =
                category === 'Code Example' ? '-webkit-box' : 'none';
            break;
        case 'list':
            tabletDesktopDisplay = '-webkit-box';
            mobileDisplay = 'none';
            break;
        case 'related':
            tabletDesktopDisplay = mobileDisplay = 'none';
            break;
    }
    return {
        display: [mobileDisplay, null, tabletDesktopDisplay],
        marginBottom: [null, null, 'inc50'],
        marginTop: [null, null, 'inc30'],
        WebkitLineClamp: 4,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        lineBreak: 'anywhere',
    };
};

export const cardHeaderStyles = (
    variant: CardVariant,
    category: PillCategory
): ThemeUICSSObject => {
    const mobileFlexDirection =
        variant === 'list' || category === 'Podcast' ? 'row' : 'column';
    const tabletDesktopFlexDirection =
        variant === 'medium' && category !== 'Podcast' ? 'column' : 'row';
    return {
        display: 'flex',
        gap: ['inc30', null, 'inc50'],
        flexDirection: [mobileFlexDirection, null, tabletDesktopFlexDirection],
    };
};
