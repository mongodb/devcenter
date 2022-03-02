export const sectionHeadingTopStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

export const sectionHeadingBottomStyles = {
    display: ['flex', null, 'none'],
    justifyContent: 'center',
    alignItems: 'center',
};

export const cardSectionListStyles = {
    marginTop: ['inc30', null, null, 'inc40'],
    paddingBottom: ['inc30', null, '0'],
    gap: 'inc40',
    overflow: ['auto', null, 'visible'],
};

export const cardListStyles = {
    width: ['max-content', null, 'auto'],
    maxWidth: ['75vw', null, '100%'],
    height: '100%',
};

export const featuredCardSectionListStyles = {
    ...cardSectionListStyles,
    gridTemplateColumns: ['repeat(3, 1fr)', null, 'repeat(6, 1fr)'],
};

export const bigFeaturedCardStyles = {
    ...cardListStyles,
    gridColumn: ['span 1', null, 'span 6', 'span 4'],
    gridRow: [null, null, null, 'span 2'],
};
export const smallFeaturedCardStyles = {
    ...cardListStyles,
    gridColumn: ['span 1', null, 'span 3', 'span 2'],
};
