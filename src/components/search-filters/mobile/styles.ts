export const filtersModal = {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    zIndex: 998,
    bg: 'black00',

    boxSizing: 'border-box' as 'border-box',
    overflow: 'scroll',
    display: 'flex',
    flexDirection: 'column' as 'column',
};

export const titleSection = {
    fontWeight: 500,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const buttonSection = {
    display: 'flex',
    gap: 'inc20',
    boxShadow: 'level02',
    width: '100%',
    position: 'fixed' as 'fixed',
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    py: 'inc50',
    zIndex: 999,
    bg: 'black00',
    marginTop: 'auto',
};
