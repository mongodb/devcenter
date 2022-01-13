import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { colorMap, size, fontSize, screenSize, lineHeight } from './theme';

const FOOTER_LOGO_WIDTH = '152px';

const globalStyles = css`
    html {
        box-sizing: border-box;
        height: 100%;
    }
    *,
    *::before,
    *::after {
        box-sizing: inherit;
    }
    body {
        background: ${colorMap.pageBackground};
        color: ${colorMap.devWhite};
        font-family: akzidenz, -apple-system, BlinkMacSystemFont, 'Segoe UI',
            Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
            'Segoe UI Symbol';
        font-size: ${fontSize.default};
        line-height: ${lineHeight.medium};
        margin: 0;
        padding: 0;
    }
    main > section {
        padding: ${size.large} 120px;
        @media ${screenSize.upToLarge} {
            padding: ${size.medium};
        }
    }
    img {
        max-width: 100%;
    }
`;

const GlobalWrapper = styled('div')`
    background: ${colorMap.pageBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100vh;
    width: 100%;
`;

const Main = styled('main')`
    /* ensure content takes up full space between header & footer*/
    margin: 0 auto;
    max-width: ${size.maxWidth};
    min-height: calc(100vh - 300px);
    width: 100%;
`;

const MaxWidthFooterContainer = styled('div')`
    border-top: 1px solid ${colorMap.greyDarkTwo};
    margin: 0 auto;
    max-width: ${size.maxWidth};
    div {
        max-width: 100%;
        /* We expand the nav but want the logo to remain at a fixed width */
        & > a > img {
            max-width: ${FOOTER_LOGO_WIDTH};
        }
    }
    width: 100%;
`;

export { globalStyles, GlobalWrapper, Main, MaxWidthFooterContainer };
