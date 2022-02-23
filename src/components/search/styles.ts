export const titleStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
    marginBottom: ['inc30', null, 'inc40'],
};
// TextInput doesn't support styled components, so we have to wrap it.
export const searchBoxStyles = {
    gridColumn: ['span 6', null, 'span 5', 'span 8', '4 / span 6'],
    '& > div': {
        width: '100%',
    },
    marginBottom: ['inc30', null, 'inc70'],
};

export const sortBoxStyles = {
    gridColumn: ['span 6', null, 'span 3', 'span 4', '10 / span 3'],
    marginBottom: ['inc40', null, 'inc70'],
};

export const dataStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column' as 'column', // theme-ui is weird about this.
    alignItems: 'center',
    width: '100%',
    gap: ['inc40', null, 'inc50'],
};

export const loadMoreStyles = {
    marginTop: ['inc70', null, 'inc90'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
    mx: 'auto',
};
