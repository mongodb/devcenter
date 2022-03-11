import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { Link } from '@mdb/flora';

export const StyledSecondaryNavContainer = styled('nav')`
    padding-left: ${theme.space.elementMedium};
    padding-right: ${theme.space.elementMedium};
    display: block;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        padding-top: ${theme.space.elementSmall};
        padding-bottom: ${theme.space.elementXSmall};
        padding-left: ${theme.space.elementXLarge};
    }
`;

export const StyledFloraLink = styled(Link)`
    font-size: ${theme.fontSizes.inc30};
    font-family: ${theme.fonts.body};
    font-weight: 300;
    span:hover {
        border-bottom: 2px solid ${theme.colors.green40}!important;
    }
`;

export const SecondaryNavMainLink = styled(StyledFloraLink)`
    display: block;
    float: initial;
    margin-bottom: 0;
    font-weight: 500;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: inline-block;
        float: left;
        margin-right: ${theme.space.inc90};
    }
`;
type SecondaryMenuListProps = {
    isOpen: boolean;
};

export const SecondaryMenuList = styled.ul`
    float: initial;
    overflow: hidden;
    height: ${(props: SecondaryMenuListProps) => (props.isOpen ? '100%' : '0')};
    padding: 0;
    margin: 0;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        float: left;
        overflow: visible;     
    }
`;

export const DropDownMenuList = styled.ul`
    columns: initial;
    float: initial;
    position: initial;
    padding: 0;

    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        columns: 2;
        left: 0;
        min-width: 300px;
        margin-top: 0;
        position: absolute;
        padding: 15px;
       
    }
`;


export const ListItem = styled('li')`
    padding-left: 0;
    display: block;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        position: relative;
        list-style: none;
        display: inline-block;
        margin-right: ${theme.space.inc90};
    }
`;
