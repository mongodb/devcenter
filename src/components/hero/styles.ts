import { ThemeUICSSObject } from 'theme-ui';

export const heroContainerStyles = {
    bg: 'purple10',
    padding: ['inc40', null, 'inc50', 'inc70'],
};

export const CTAContainerStyles: ThemeUICSSObject = {
    alignItems: [null, null, 'end', 'center'],
    display: ['none', null, 'flex'],
    flexDirection: [null, null, 'column', 'row'],
    gap: [null, null, 'inc30', 'inc50'],
    gridColumn: [null, null, 'span 3', 'span 7'],
    justifyContent: [null, null, 'end'],
    width: [null, null, '100%'],
};
