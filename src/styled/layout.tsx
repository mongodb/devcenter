import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';

// TODO: <body style="overflow: initial"> is being set somewhere that cannot be located (not in custom CSS)
// use !important for now to avoid scrolling of window when filter overlay or modals are present
export const globalStyles = (hasOverlay: boolean) => `
    * {
        box-sizing: border-box;
    }
    body {
        font-family: ${theme.fonts['euclid-circular-a']};
        margin: 0;
        overflow: ${hasOverlay ? 'hidden' : 'visible'} !important;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    h1,h2,h3,h4,h5,h6 {
        font-weight: normal;
        font-style: normal;
    }
`;

export const layers = {
    backdrop: -1,
    base: 0,
    desktopConsistentNav: 1, // From ConsistentNav
    navSearch: 2, // From ConsistentNav
    tooltip: 3,
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

export const h4Styles = {
    fontFamily: 'heading',
    fontSize: [
        'headingMResponsive',
        'headingMResponsive',
        'headingMResponsive',
        'headingM',
    ],
    lineHeight: [
        'headingMResponsive',
        'headingMResponsive',
        'headingMResponsive',
        'headingM',
    ],
};

export const h5Styles = {
    fontFamily: 'body',
    fontSize: [
        'headingSResponsive',
        'headingSResponsive',
        'headingSResponsive',
        'headingS',
    ],
    lineHeight: [
        'headingSResponsive',
        'headingSResponsive',
        'headingSResponsive',
        'headingS',
    ],
};

export const h6Styles = {
    fontFamily: 'body',
    fontSize: [
        'headingXSResponsive',
        'headingXSResponsive',
        'headingXSResponsive',
        'headingXS',
    ],
    lineHeight: [
        'headingXSResponsive',
        'headingXSResponsive',
        'headingXSResponsive',
        'headingXS',
    ],
};
