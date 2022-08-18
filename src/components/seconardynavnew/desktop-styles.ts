import theme from '@mdb/flora/theme';
import { ThemeUICSSObject } from 'theme-ui';

export const navContainerStyles: ThemeUICSSObject = {
    display: 'flex',
    boxSizing: 'border-box',
    mx: 'auto',
    paddingTop: 'elementXSmall',
    paddingBottom: 'elementXSmall',
    position: 'relative',
    maxWidth: '1416px',
};

export const navWrapperStyles: ThemeUICSSObject = {
    display: ['none', null, null, 'block'],
    borderBottom: [null, null, null, `solid 1px ${theme.colors.black30}`],
    px: ['inc40', null, 'inc50', 'inc70'],
    position: 'sticky',
    top: 0,
    bg: '#ffffff',
    zIndex: 21,
};
