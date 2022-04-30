import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { Link } from '@mdb/flora';

export const StyledSecondaryNavContainer = styled('nav')`
    display: block;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: flex;
        padding-top: ${theme.space.elementSmall};
        padding-bottom: ${theme.space.elementXSmall};
        padding-left: ${theme.space.elementXLarge};
    }
`;

export const StyledFloraLink = styled(Link)`
    display: 'inline-block';
    span {
        color: ${theme.colors.text.default}!important;
        font-size: ${theme.fontSizes.inc20};
        font-family: ${theme.fonts.body};
        font-weight: 500;
        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            font-weight: 300;
        }
    }
    span:hover {
        border-bottom: none !important;
        @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
            border-bottom: 2px solid ${theme.colors.green40}!important;
        }
    }
`;

export const MainLink = styled(Link)`
    .textlink-default-text-class {
        color: ${theme.colors.text.default}!important;
        :hover {
            border-bottom: none !important;
            @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
                border-bottom: 2px solid ${theme.colors.green40}!important;
            }
        }
    }
`;

export const MainLinkStyles = {
        float: ['initial', 'initial', 'initial', 'left'] as ['initial', 'initial', 'initial', 'left'],
        marginRight: [null, null, null, 'inc90'],
        fontSize: 'inc30',
        fontWeight: 500,
    };

export const SecondaryLinks = styled.ul`
    float: initial;
    overflow: hidden;
    height: ${(props: SecondaryMenuListProps) => (props.isOpen ? '100%' : '0')};
    padding: 0;
    margin: 0;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        float: left;
        overflow: visible;
        li:not(:last-child) {
            margin-right: ${theme.space.inc90};
        }
    }
`;

export const StyledList = styled('li')`
    padding-left: 0;
    display: block;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        position: relative;
        list-style: none;
        display: inline-block;
    }
`;

type SecondaryMenuListProps = {
    isOpen: boolean;
};

export const DropDownWrapper = styled.div`
    .dropdown-titles {
        display: inline-block;
        font-size: 20px;
        margin-bottom: 25px;
    }
    background-color: #fff;
    color: #000;
    float: initial;
    position: initial;
    padding: 0;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        background-color: ${theme.colors.blue80};
        color: ${theme.colors.text.inverse};
        //margin top is same as padding bottom of secondary nav
        margin-top: ${theme.space.elementXSmall};
        position: absolute;
        box-shadow: ${theme.shadows.level01};
        border-bottom-right-radius: ${theme.radii.inc50};
        border-bottom-left-radius: ${theme.radii.inc50};
        padding: ${theme.space.inc70} ${theme.space.inc90};
    }
`;

export const DropDownMenuList = styled.ul`
    list-style-type: none ;
    padding: 0;
    white-space: nowrap;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        left: 0;
        a:not(:last-child) {
            margin-bottom: ${theme.space.inc40};
        }
    }

    li {
        padding-top: 15px;
        padding-bottom: 15px;
    }
`;
