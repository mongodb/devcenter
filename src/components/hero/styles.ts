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
    'div > span.textlink-default-text-class': {
        borderBottom: `${theme.borders.inc10} solid ${theme.colors.green60}`,
        marginBottom: 'inc10',
        '&:hover': {
            marginBottom: 0,
        },
    },
};

export const heroContainerStyles = {
    background: 'purple10',
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
    '> a': {
        width: [null, null, `calc(${theme.space.base} * 23)`],
    },
};
