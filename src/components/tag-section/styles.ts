export const tagWrapperStyles = (disappearOnMobile: boolean) => {
    return {
        display: [disappearOnMobile ? 'none' : 'flex', null, 'flex'],
        gap: 'inc20',
        flexWrap: 'wrap' as 'wrap',
    };
};

export const tagStyles = {
    px: [null, null, null, 'inc30'],
    py: [null, null, null, 'inc20'],
    fontSize: [null, null, null, 'inc20'],
    zIndex: 1,
};
