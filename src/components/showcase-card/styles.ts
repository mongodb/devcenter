import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';

export const showcaseCardWrapper: ThemeUICSSObject = {
    display: 'flex',
    boxSizing: 'border-box',
    flexDirection: 'column',
    boxShadow: 'level01',
    borderRadius: ['inc50', null, null, null, 'inc70'],
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'transparent',
    padding: [
        theme.space.cards.paddingXXS,
        null,
        null,
        theme.space.cards.paddingXS,
        theme.space.cards.paddingM,
    ],
    '&:hover': {
        borderColor: theme.colors.card.default.borderDarker,
        boxShadow: 'level03',
    },
    position: 'relative',
};
