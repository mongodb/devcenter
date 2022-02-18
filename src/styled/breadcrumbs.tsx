import { Link, SystemIcon, Eyebrow } from '@mdb/flora';
import theme from '@mdb/flora/theme';
import styled from '@emotion/styled';

export const BreadcrumbsContainer = styled('div')`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.space.elementXSmall};

    // Mobile
    grid-column: span 6;

    // Tablet
    @media only screen and (min-width: ${theme.sizes.breakpoint.medium}) {
        grid-column: span 8;
    }

    // Desktop
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        grid-column: span 12;
    }
`;

export const Breadcrumb = styled('div')`
    align-items: center;
    display: flex;
    gap: ${theme.space.elementXSmall};
`;

export const StyledIcon = styled(SystemIcon)`
    height: ${theme.fontSizes.inc00};
`;

export const StyledLink = styled(Link)`
    div > span.textlink-default-text-class {
        border-bottom: ${theme.borders.inc10} solid ${theme.colors.green60};
        margin-bottom: ${theme.borders.inc10};
        :hover {
            margin-bottom: 0;
        }
    }
`;

// The negative margin is to offset the added 3px from the letter-spacing on the last character that Flora adds.
export const StyledEyebrow = styled(Eyebrow)`
    margin-right: -3px;
`;
