import theme from '@mdb/flora/theme';

export const desktopFiltersStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 3'],
    display: ['none', null, null, 'flex'],
    flexDirection: 'column' as 'column',
    gap: 'inc50',
};

export const pageWrapper = {
    paddingBottom: 'inc160',
    px: ['inc40', null, 'inc50', 'inc70'],
    paddingTop: ['inc40', null, 'inc50', 'inc70'],
};

export const resultsStringAndTagsStyles = {
    marginBottom: 'inc50',
    display: 'flex',
    flexDirection: [
        'column' as 'column',
        null,
        'row' as 'row',
        'column' as 'column',
    ],
    justifyContent: ['start', null, 'space-between', 'start'],
    alignItems: ['start', null, 'center', 'start'],
    gap: 'inc30',
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
