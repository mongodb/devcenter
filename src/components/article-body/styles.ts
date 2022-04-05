import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';

export const GlobalStyledDocumentBody = styled('div')`
    img {
        max-width: 100% !important;
        border-radius: ${theme.radii.inc30} !important;
    }
    figcaption {
        color: ${theme.colors.black50} !important;
        padding-top: ${theme.space.inc20} !important;
        font-size: ${theme.fontSizes.inc00};
        line-height: ${theme.lineHeights.inc10};
    }
`;
