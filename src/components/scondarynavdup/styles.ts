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
        font-weight: 300;
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
            @media only screen and (min-width: ${theme.sizes.breakpoint
                    .large}) {
                border-bottom: 2px solid ${theme.colors.green40}!important;
            }
        }
    }
`;

export const MainLinkStyles = () => {
    return {
        float: ['initial', 'initial', 'initial', 'left'],
        marginRight: [null, null, null, 'inc90'],
        fontSize: 'inc30',
        fontWeight: 500,
    };
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
    float: initial;
    position: initial;
    padding: 0;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        margin-top: 0;
        position: absolute;
        box-shadow: ${theme.shadows.level01};
        border-bottom-right-radius: ${theme.radii.inc50};
        border-bottom-left-radius: ${theme.radii.inc50};
        padding: ${theme.space.inc70} ${theme.space.inc90};
    }
`;

export const DropDownMenuList = styled.ul`
    padding: 0;
    white-space: nowrap;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        columns: 2;
        left: 0;
        a:not(:last-child) {
            margin-bottom: ${theme.space.inc40};
        }
    }
`;
