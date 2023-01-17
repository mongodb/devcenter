import theme from '@mdb/flora/theme';
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

// This is all to complement Flora's animation on the link arrow and force it not to push itself left.
export const CTALinkStyles: ThemeUICSSObject = {
    position: 'relative',
    transitionDuration: theme.motion.linkAnimation,
    transitionProperty: 'right margin-left',
    right: '0',
};

export const tooltipStyles = {
    tooltipWrapper: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        width: 208,
    } as ThemeUICSSObject,
    tooltipArrow: {
        borderBottom: '8px solid transparent',
        borderTop: '8px solid transparent',
        borderRight: `8px solid ${theme.colors.background.containerInverse}`,
    } as ThemeUICSSObject,
    tooltipBody: {
        bg: 'background.containerInverse',
        color: 'text.inverse',
        borderRadius: 'tooltips',
        padding: ['inc10', null, null, 'inc20'],
        textAlign: 'left',
        fontSize: ['inc00', null, null, 'inc10'],
        lineHeight: ['inc10', null, null, 'inc20'],
        fontFamily: 'body',
        boxShadow: 'level01',
    } as ThemeUICSSObject,
};
