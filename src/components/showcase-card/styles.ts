import theme from '@mdb/flora/theme';

export const showcaseCardWrapper = (alignment: 'center' | 'left') => ({
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: alignment === 'center' ? 'center' : 'start',
    boxShadow: 'level01',
    borderRadius: ['inc50', null, null, null, 'inc70'],
    padding: [
        theme.space.cards.paddingXXS,
        null,
        null,
        theme.space.cards.paddingXS,
        theme.space.cards.paddingM,
    ],
});
