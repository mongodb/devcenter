import theme from '@mdb/flora/theme';

export const smallDesktopNavStyles = {
    display: ['none', null, null, 'flex', 'none'],
    alignItems: 'center',
};

export const navTagStyles = {
    boxSizing: 'border-box' as 'border-box',
    display: 'flex',
    whiteSpace: 'nowrap' as 'nowrap',
    overflowX: 'auto' as 'auto',

    boxShadow: 'level01',
    py: 'inc30',
    px: 'inc70',
    gap: 'inc50',

    // Hide scrollbar on all browsers.
    msOverflowStyle: 'none' as 'none',
    scrollbarWidth: 'none' as 'none',
    '::-webkit-scrollbar': {
        display: 'none',
    },

    minWidth: '100%',
};

export const smallDesktopNavFadeRightStyles = {
    display: 'inline-block',
    position: 'relative' as 'relative',
    right: theme.space.inc160,
    marginRight: `-${theme.space.inc160}`,
    width: theme.space.inc160,
    height: 'inc40',
    flexShrink: '0',
    background:
        'linear-gradient(270deg, #FFFFFF 29.17%, rgba(255, 255, 255, 0) 100%)',
};

export const smallDesktopNavFadeLeftStyles = {
    display: 'none', // Default
    position: 'relative' as 'relative',
    left: theme.space.inc160,
    marginLeft: `-${theme.space.inc160}`,
    width: theme.space.inc160,
    height: 'inc40',
    flexShrink: '0',
    background:
        'linear-gradient(90deg, #FFFFFF 29.17%, rgba(255, 255, 255, 0) 100% )',
};

export const sideNavTitleStyles = {
    borderLeft: 'solid',
    borderWidth: '2px',
    borderColor: 'black20',
    py: 'inc20',
    px: 'inc60',
    '&:hover': {
        borderLeftColor: 'green60',
        fontWeight: 700,
    },
};

export const sideNavStyles = (rowCount?: number) => ({
    display: ['none', null, null, null, 'block'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 3'],
    nav: {
        position: 'static' as 'static',
    },
    gridRow: `span ${rowCount || 4}`,
    'a:hover': {
        borderLeftColor: 'green60',
        span: {
            fontWeight: 700,
            color: theme.colors.text.default,
        },
    },
});
