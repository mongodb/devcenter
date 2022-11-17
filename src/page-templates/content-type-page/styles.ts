import theme from '@mdb/flora/theme';

export const desktopFiltersStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 3'],
    display: ['none', null, null, 'flex'],
    flexDirection: 'column' as 'column',
    gap: 'inc50',
};

export const resultsStringAndTagsStyles = {
    display: 'flex',
    flexDirection: ['column' as 'column', null, 'row' as 'row'],
    justifyContent: 'space-between',
    alignItems: 'initial',
    gap: 'inc30',
    marginBottom: 'inc30',
    // have to get crazy with selectors because Flora wraps everything in a div but then doesn't provide a way to style those wrapper divs which is awesome :)
    '> div:nth-of-type(2)': {
        width: ['100%', null, 'auto'],
    },
};

export const tagWrapper = {
    bg: 'black10',
    fontWeight: 'medium',
    fontSize: 'inc20',
    display: 'flex',
    gap: 'inc20',
    alignItems: 'center',
    borderStyle: 'solid',
    borderRadius: 'circle',
    borderColor: 'black30',
    borderWidth: 'inc10',
    px: 'inc30',
    py: 'inc20',
    position: 'relative' as 'relative',
    '&:hover': {
        bg: 'black20',
        borderColor: 'black80',
        borderWidth: 'inc20',
        paddingBottom: `calc(${theme.space.inc20} - 2px)`,
        paddingRight: `calc(${theme.space.inc30} - 2px)`,
        right: '1px',
        bottom: '1px',
    },
    cursor: 'pointer',
    height: '16px',
};
