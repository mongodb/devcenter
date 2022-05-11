import theme from '@mdb/flora/theme';

export const showcaseCardWrapper = {
    display: 'flex',
    boxSizing: 'border-box' as 'border-box',
    flexDirection: 'column' as 'column',
    boxShadow: 'level01',
    borderRadius: ['inc50', null, null, null, 'inc70'],
    padding: [
        theme.space.cards.paddingXXS,
        null,
        null,
        theme.space.cards.paddingXS,
        theme.space.cards.paddingM,
    ],
};
