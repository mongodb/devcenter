import styled from '@emotion/styled';
import theme from '@mdb/flora/theme';
import { Link } from '@mdb/flora';

export const StyledSecondaryNavContainer = styled('nav')`
    display: block;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: flex;
        justify-content: center;
        max-width: 1200px;
        padding-top: ${theme.space.elementSmall};
        padding-bottom: ${theme.space.elementXSmall};
        padding-left: ${theme.space.elementXLarge};
        position: relative ;
    }
`;

export const StyledFloraLink = styled(Link)`
    display: 'inline-block';
    span {
        color: ${theme.colors.text.default}!important;
        font-size: ${theme.fontSizes.inc20};
        font-family: ${theme.fonts.body};
        font-weight: 300;
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
            @media only screen and (min-width: ${theme.sizes.breakpoint
                    .large}) {
                border-bottom: 2px solid ${theme.colors.green40}!important;
            }
        }
    }
`;

export const MainLinkStyles = {
    float: ['initial', 'initial', 'initial', 'left'] as [
        'initial',
        'initial',
        'initial',
        'left'
    ],
    marginRight: [null, null, null, 'inc90'],
    fontSize: 'inc30',
    fontWeight: 500,
};

export const SecondaryLinks = styled.ul`
    padding: 0;
    margin: 0;
    overflow: visible;
    li:not(:last-child) {
        margin-right: ${theme.space.inc40};
    }
`;

export const StyledList = styled('li')`
    position: relative ;
    padding-left: 0;
    display: block;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        position: initial;
        list-style: none;
        display: inline-block;
    }
`;

export const DropDownWrapper = styled.div`
    .dropdown-titles {
        display: inline-block;
        font-size: 20px;
        margin-bottom: 25px;
    }

    background-color: #fff;
    color: #000;
    padding-left: 32px;
    
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        box-shadow: ${theme.shadows.level01};
        border-bottom-right-radius: ${theme.radii.inc50};
        border-bottom-left-radius: ${theme.radii.inc50};
        background-color: ${theme.colors.blue80};
        color: ${theme.colors.text.inverse};
        left: 40px;
        margin-top: ${theme.space.elementXSmall};
        position: absolute;
        padding: ${theme.space.inc70} ${theme.space.inc90};
        z-index: 1000;
    }
`;

export const DropDownMenuList = styled.ul`
    list-style-type: none;
    padding: 0;
    white-space: nowrap;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        a:not(:last-child) {
            margin-bottom: ${theme.space.inc40};
        }
    }

    li {
        padding-top: 15px;
        padding-bottom: 15px;
    }
`;
