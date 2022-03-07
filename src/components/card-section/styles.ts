import theme from '@mdb/flora/theme';

export const sectionHeadingTopStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
};

export const sectionHeadingBottomStyles = {
    display: ['flex', null, 'none'],
    justifyContent: 'center',
    alignItems: 'center',
};

export const cardSectionListStyles = (direction: 'row' | 'column') => {
    return {
        marginTop: ['inc30', null, null, 'inc40'],
        paddingBottom: ['inc30', null, '0'],
        gap: [direction === 'column' ? 'inc30' : 'inc40', null, null, 'inc40'],
        overflow: ['auto', null, 'visible'],
    };
};

export const cardListStyles = (direction: 'row' | 'column') => {
    const height =
        direction === 'row'
            ? { height: '100%' }
            : { gridColumn: [null, null, 'span 3'] };
    return {
        width: ['75vw', null, direction === 'row' ? 'auto' : '100%'],
        ...height,
    };
};

export const featuredCardSectionListStyles = {
    ...cardSectionListStyles('row'),
    gridTemplateColumns: ['repeat(3, 1fr)', null, 'repeat(6, 1fr)'],
};

export const bigFeaturedCardStyles = {
    ...cardListStyles('row'),
    gridColumn: ['span 1', null, 'span 6', 'span 4'],
    gridRow: [null, null, null, 'span 2'],
};
export const smallFeaturedCardStyles = {
    ...cardListStyles('row'),
    gridColumn: ['span 1', null, 'span 3', 'span 2'],
};

// This is all to complement Flora's animation on the link arrow and force it not to push itself left.
export const linkStyles = {
    position: 'relative' as 'relative',
    transitionDuration: theme.motion.linkAnimation,
    transitionProperty: 'right',
    right: '0',
    marginRight: `calc(${theme.sizes.inc70} - ${theme.sizes.inc50})`,
    '&:hover': {
        right: [
            null,
            null,
            `calc(${theme.sizes.inc50} - ${theme.sizes.inc70})`,
        ],
    },
};
