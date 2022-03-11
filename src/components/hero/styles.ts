import theme from '@mdb/flora/theme';

export const heroContainerStyles = {
    bg: 'purple10',
    padding: ['inc40', null, 'inc50', 'inc70'],
};

export const CTAContainerStyles = {
    alignItems: [null, null, 'end', 'center'],
    display: ['none', null, 'flex'],
    flexDirection: [null, null, 'column' as 'column', 'row' as 'row'],
    gap: [null, null, 'inc30', 'inc50'],
    gridColumn: [null, null, 'span 3', 'span 7'],
    justifyContent: [null, null, 'end'],
    width: [null, null, '100%'],
};

// This is all to complement Flora's animation on the link arrow and force it not to push itself left.
export const CTALinkStyles = {
    position: 'relative' as 'relative',
    transitionDuration: theme.motion.linkAnimation,
    transitionProperty: 'right margin-left',
    right: '0',
};
