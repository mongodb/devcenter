import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { Link } from '@mdb/flora';

export const StyledSecondaryNavContainer = styled('nav')`
    display: inline-flex;
    box-sizing: border-box;
    margin-left: ${theme.space.inc70};
    padding-top: ${theme.space.elementSmall};
    padding-bottom: ${theme.space.elementXSmall};
    position: relative;
`;
export const StyledList = styled('li')`
    padding-left: 0;
    display: block;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        list-style: none;
        display: inline-block;
    }
`;

export const DropDownWrapper = styled.div`
    .dropdown-titles {
        display: inline-block;
        font-size: ${theme.fontSizes.inc40};
        margin-bottom: ${theme.space.inc40};
    }

    background-color: #fff;
    color: #000;
    padding-left: ${theme.space.inc50};

    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        box-shadow: ${theme.shadows.level01};
        border-bottom-right-radius: ${theme.radii.inc50};
        border-bottom-left-radius: ${theme.radii.inc50};
        background-color: ${theme.colors.blue80};
        color: ${theme.colors.text.inverse};
        left: 0;
        margin-top: ${theme.space.elementXSmall};
        position: absolute;
        padding: ${theme.space.inc70} ${theme.space.inc90};
        z-index: 2;
    }
`;
