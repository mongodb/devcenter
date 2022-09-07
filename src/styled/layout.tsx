import styled from '@emotion/styled';

import theme from '@mdb/flora/theme';

export const globalStyles = (hasOverlay: boolean) => ({
    body: {
        fontFamily: theme.fonts['euclid-circular-a'],
        margin: 0,
        overflow: hasOverlay ? 'hidden' : 'visible',
    },
    a: {
        textDecoration: 'none',
        color: 'inherit',
    },
    'h1,h2,h3,h4,h5,h6': {
        fontWeight: 'normal',
        fontStyle: 'normal',
    },
});

export const layers = {
    backdrop: -1,
    base: 0,
    desktopConsistentNav: 1, // From ConsistentNav
    navSearch: 2, // From ConsistentNav
    textArea: 10, // From Flora
    secondaryNav: 11,
    desktopConsistentNavDropdown: 12,
    mobileOverlay: 13,
    mobileConsistentNav: 999, // From ConsistentNav
    mobileNavMenu: 1000, // From ConsistentNav
    modal: 9999, // From Flora (Lightbox)
};

export const Main = styled('main')`
    /* ensure content takes up full space between header & footer*/
    margin: 0;

    max-width: 100%;
    min-height: calc(100vh - 300px);
    width: 100%;
`;

export const pageWrapper = {
    paddingBottom: 'inc160',
    px: ['inc40', null, 'inc50', 'inc70'],
    paddingTop: ['inc40', null, 'inc50', 'inc70'],
};
