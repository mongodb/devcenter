import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { TypographyScale, GridLayout } from '@mdb/flora';

export const HeroGrid = styled(GridLayout)`
    row-gap: ${theme.space.inc30};
`;

export const LeftContainer = styled('div')`
    // Mobile
    grid-column: span 6;

    // Tablet/Desktop
    @media (min-width: ${theme.sizes.breakpoint.medium}) {
        grid-column: span 5;
    }
`;

export const HeroContainer = styled('div')`
    background: ${theme.colors.purple10};

    // Mobile
    padding: ${theme.space.inc40};

    // Tablet
    @media (min-width: ${theme.sizes.breakpoint.medium}) {
        padding: ${theme.space.inc50};
    }

    // Desktop
    @media (min-width: ${theme.sizes.breakpoint.large}) {
        padding: ${theme.space.inc70};
    }
`;

export const Title = styled(TypographyScale)`
    // Mobile/Tablet
    margin-bottom: ${theme.space.inc20};

    // Desktop
    @media (min-width: ${theme.sizes.breakpoint.large}) {
        margin-bottom: ${theme.space.inc40};
    }
`;

export const CTAContainer = styled('div')`
    // Mobile
    display: none;

    // Tablet
    @media (min-width: ${theme.sizes.breakpoint.medium}) {
        align-items: end;
        display: flex;
        flex-direction: column;
        gap: ${theme.space.inc30};
        grid-column: span 3;
        justify-content: end;
        width: 100%;
        > a {
            width: calc(${theme.space.base} * 23);
        }
    }

    // Desktop
    @media (min-width: ${theme.sizes.breakpoint.large}) {
        align-items: center;
        gap: ${theme.space.inc50};
        grid-column: span 7;
        flex-direction: row;
    }
`;
