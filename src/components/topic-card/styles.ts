import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';

export const topicCardStyles: ThemeUICSSObject = {
    boxSizing: 'border-box',
    display: 'flex',
    textAlign: ['center', null, 'left'],
    alignItems: 'center',
    flexDirection: ['column', null, 'row'],
    gap: ['inc30', null, 'inc20'],
    border: `1px solid ${theme.colors.card.default.border}`,
    borderRadius: 'inc40',
    px: 'inc40',
    py: 'inc30',
    boxShadow: 'level01',
    gridColumn: ['span 2', null, null, 'span 1'],

    '&:hover': {
        border: `1px solid ${theme.colors.blue80}`,
        boxShadow: 'level03',
        cursor: 'pointer',
    },
};

export const iconStyles = {
    width: ['inc30', null, 'inc20', 'inc30'],
    height: ['inc30', null, 'inc20', 'inc30'],
};

export const topicsGridStyles = {
    gap: ['inc30', null, null, 'inc40'],
    marginTop: ['inc30', null, null, 'inc40'],
    maxWidth: 'maxWidthDesktop',
};

export const topicsCardsContainerStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', '4 /span 9'],
};
