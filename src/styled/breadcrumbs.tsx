import { Link, SystemIcon, Eyebrow } from '@mdb/flora';
import theme from '@mdb/flora/theme';
import styled from '@emotion/styled';

export const BreadcrumbsContainer = styled('div')`
    display: flex;
    align-items: center;
    > *:not(:last-child) {
        margin-right: ${theme.space.elementXSmall};
    }
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
