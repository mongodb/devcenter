import theme from '@mdb/flora/theme';

export const breadcrumbsContainerStyles = {
    alignItems: 'center' as 'center',
    display: 'flex',
    flexWrap: 'wrap' as 'wrap',
    gap: 'elementXSmall',
    gridColumn: ['span 6', null, 'span 8', 'span 12'],
};

export const breadcrumbStyles = {
    alignItems: 'center' as 'center',
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
