import theme from '@mdb/flora/theme';
import { PillCategory } from '../../types/pill-category';
import { CardVariant } from './types';

interface IPillColorMap {
    [key: string]: string;
}

const pillColorMap: IPillColorMap = {
    Video: theme.colors.purple10,
    Article: theme.colors.blue10,
    'Demo App': theme.colors.yellow20,
    Tutorial: theme.colors.green20,
    Podcast: theme.colors.red20,
    'Code Example': theme.colors.yellow20,
    Quickstart: theme.colors.yellow20,
};

export const pillStyles = (pillCategory: PillCategory) => ({
    marginBottom: 'inc30',
    bg: pillColorMap[pillCategory],
    // Weird values but that's what figma says for the flora pills.
    px: ['inc30', null, null, 'inc40'],
    py: ['inc10', null, null, 'inc20'],
    fontSize: ['9px', null, null, 'inc00'],
    letterSpacing: ['2.5px', null, null, '3px'],
});

export const thumbnailWrapperStyles = (
    variant: CardVariant,
    category: PillCategory
) => {
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
                case 'Demo App':
                    mobileDimensions = '96px';
                    break;
                case 'Podcast':
                    mobileDimensions = '48px';
                    break;
                // case 'Quickstart':
                //     mobileDimensions = '64px';
                //     break;
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
                case 'Demo App':
                    mobileDimensions =
                        tabletDimensions =
                        desktopDimensions =
                            '96px';
                    break;
                case 'Podcast':
                    mobileDimensions = tabletDimensions = '48px';
                    desktopDimensions = '64px';
                    break;
                // case 'Quickstart':
                //     mobileDimensions = tabletDesktopDimensions = '64px';
                //     break;
                default:
                    mobileDimensions = null;
            }
            break;
        case 'small':
            switch (category) {
                case 'Article':
                    mobileDimensions = '64px';
                    break;
                case 'Demo App':
                    mobileDimensions = '96px';
                    break;
                case 'Podcast':
                    mobileDimensions = '48px';
                    break;
                // case 'Quickstart':
                //     mobileDimensions = '64px';
                //     break;
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
        position: 'relative' as 'relative',
        ...videoAspectRatio,
        width: [mobileDimensions, null, tabletDimensions, desktopDimensions],
        height: [mobileDimensions, null, tabletDimensions, desktopDimensions],
    };
};

export const cardWrapperStyles = {
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    flexDirection: 'column' as 'column',
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
};

export const descriptionStyles = (
    variant: CardVariant,
    category: PillCategory
) => {
    let mobileDisplay;
    let tabletDesktopDisplay;
    switch (variant) {
        case 'large':
            tabletDesktopDisplay = 'block';
            mobileDisplay = category === 'Demo App' ? 'block' : 'none';
            break;
        case 'medium':
            tabletDesktopDisplay = mobileDisplay =
                category === 'Demo App' ? 'block' : 'none';
            break;
        case 'small':
            tabletDesktopDisplay = 'none';
            mobileDisplay = category === 'Demo App' ? 'block' : 'none';
            break;
        case 'list':
            tabletDesktopDisplay = 'block';
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
    };
};

export const cardHeaderStyles = (
    variant: CardVariant,
    category: PillCategory
) => {
    const mobileFlexDirection =
        variant === 'list' || category === 'Podcast'
            ? ('row' as 'row')
            : ('column' as 'column');
    const tabletDesktopFlexDirection =
        variant === 'medium' && category !== 'Podcast'
            ? ('column' as 'column')
            : ('row' as 'row');
    return {
        display: 'flex',
        gap: ['inc30', null, 'inc50'],
        flexDirection: [mobileFlexDirection, null, tabletDesktopFlexDirection],
    };
};
