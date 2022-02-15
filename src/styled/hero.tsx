import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { TypographyScale } from '@mdb/flora';

export const LeftContainer = styled('div')`
    grid-column: span 6;
`;

export const HeroContainer = styled('div')`
    background: ${theme.colors.purple10};
    padding: ${theme.space.inc70};
`;

export const Title = styled(TypographyScale)`
    margin-top: ${theme.space.inc30};
    margin-bottom: ${theme.space.inc40};
`;

export const CTAContainer = styled('div')`
    width: 100%;
    grid-column: span 6;
    justify-self: end;
    display: flex;
    align-items: center;
    margin: auto;
    justify-content: end;
    > *:not(:last-child) {
        margin-right: ${theme.space.inc50};
    }
`;
