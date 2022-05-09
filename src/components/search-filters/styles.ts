export const titleStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 500,
};

export const itemsStyles = (title: string | undefined) => ({
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: title === 'Products' ? 'inc50' : 'inc30', // Bigger space between L1s.
    marginTop: 'inc30',
});
