import { css } from '@emotion/react';
import styled from '@emotion/styled';

import theme from '@mdb/flora/theme';

const globalStyles = css`
    body {
        font-family: ${theme.fonts['euclid-circular-a']};
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

const Main = styled('main')`
    /* ensure content takes up full space between header & footer*/
    margin: 0;
    max-width: 100%;
    min-height: calc(100vh - 300px);
    width: 100%;
`;

export { globalStyles, Main };
