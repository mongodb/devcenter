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
    '.textlink-default-text-class.textlink-default-text-class': {
        // double class for specificity
        borderBottom: `${theme.borders.inc10} solid ${theme.colors.green60}`,
        marginBottom: theme.borders.inc10,
        ':hover': {
            marginBottom: 0,
            borderBottom: `${theme.borders.inc20} solid ${theme.colors.black80}`,
        },
    },
};
