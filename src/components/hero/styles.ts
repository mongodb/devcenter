import theme from '@mdb/flora/theme';

export const breadcrumbsContainerStyles = {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    gap: 'elementXSmall',
    gridColumn: ['span 6', null, 'span 8', 'span 12'],
};

export const breadcrumbStyles = {
    alignItems: 'center',
    display: 'flex',
    gap: 'elementXSmall',
};

export const linkStyles = {
    '*.textlink-default-text-class': {
        // Need the tag+class for specificity over default class styles.
        borderBottom: `${theme.borders.inc10} solid ${theme.colors.green60}`,
        marginBottom: theme.borders.inc10,
        '&:hover': {
            marginBottom: 0,
        },
    },
};

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
