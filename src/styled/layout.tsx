import { css } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '@mdb/flora/theme';

export const globalStyles = css`
    body {
        font-family: ${theme.fonts['euclid-circular-a']};
        margin: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: normal;
        font-style: normal;
    }
`;

export const Main = styled('main')`
    /* ensure content takes up full space between header & footer*/
    margin: 0;

    /* Margin top set for secondary nav on mobile */
    @media only screen and (max-width: ${theme.sizes.breakpoint.large}) {
        margin-top: 70px;
    }

    max-width: 100%;
    min-height: calc(100vh - 300px);
    width: 100%;
`;

export const pageWrapper = {
    paddingBottom: 'inc160',
    px: ['inc40', null, 'inc50', 'inc70'],
    paddingTop: ['inc40', null, 'inc50', 'inc70'],
};
