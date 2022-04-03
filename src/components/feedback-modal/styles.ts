import theme from '@mdb/flora/theme';

export const checkboxListStyles = {
    marginBottom: 'inc50',
    display: 'flex',
    flexDirection: 'column' as 'column',
    gap: 'inc30',
};

export const modalWrapperStyles = {
    bg: 'white',
    padding: 'inc70',
    borderRadius: 'inc20',
    width: [
        `calc(${theme.sizes.base} * 35.5)`,
        null,
        null,
        `calc(${theme.sizes.base} * 60)`,
    ],
};
