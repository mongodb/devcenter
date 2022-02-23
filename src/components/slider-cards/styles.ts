export const SliderCardStyle = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
    gridTemplateColumns: [
        'repeat(1, 1fr)',
        'repeat(1, 1fr)',
        'repeat(2, 1fr)',
        'repeat(3, 1fr)',
        'repeat(3, 1fr)',
    ],
    display: 'grid',
    // margin: 'auto',
    // display: 'flex',
    // flexDirection: 'column' as 'column', // theme-ui is weird about this.
    // alignItems: 'center',
    gap: ['inc40', null, 'inc50'],
};
