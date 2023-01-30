import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';

export const seriesCardStyles = {
    padding: [
        theme.space.cards.paddingXS,
        null,
        null,
        theme.space.cards.paddingM,
    ],
    boxShadow: 'level03',
    border: `1px solid ${theme.colors.black30}`,
    borderRadius: 'cardResponsive',
};

export const listItemstyles: ThemeUICSSObject = {
    position: 'relative',
    marginBottom: 'inc30',
    paddingLeft: ['inc50', null, null, 'inc60'],
    fontSize: ['inc10', null, null, 'inc20'],
    lineHeight: ['inc20', null, null, 'inc30'],
};

export const glyphStyles: ThemeUICSSObject = {
    position: 'absolute',
    left: 0,
    '&::before': {
        content: '""',
        position: 'absolute',
        width: '12px',
        height: '12px',
        bg: 'list.default.bullet',
        borderRadius: '50%',
        top: ['6px', null, null, '10px'],
        left: '2px',
    },
};
