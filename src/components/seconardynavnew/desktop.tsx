import { useState } from 'react';
import theme from '@mdb/flora/theme';

import { ESystemIconNames, Link, SystemIcon } from '@mdb/flora';
import { myData } from '../../data/secondary-nav';
import { StyledSecondaryNavContainer } from './styles';

import SecondaryLinksList from './nav-item';
import DropDownMenu from './dropdown-menu';
import styled from '@emotion/styled';

const linkWrapperStyles = {
    position: 'relative' as 'relative',
    padding: 0,
};

const MainLinkStyles = {
    float: 'left' as 'left',
    marginRight: 'inc90',
    fontSize: 'inc30',
    fontWeight: 500,
};

const SecondaryLinks = styled.ul`
    padding: 0;
    margin: 0;
    overflow: visible;
    li:not(:last-child) {
        margin-right: ${theme.space.inc40};
    }
`;

const MainLink = styled(Link)`
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

const StyledFloraLink = styled(Link)`
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

const DesktopView = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <StyledSecondaryNavContainer>
                <div sx={linkWrapperStyles}>
                    <MainLink sx={MainLinkStyles}>Developer Center</MainLink>
                </div>

                <SecondaryLinks>
                    {myData.map(({ name, slug, dropDownItems }) => (
                        <SecondaryLinksList key={name}>
                            {dropDownItems?.length ? (
                                <>
                                    {' '}
                                    <div sx={linkWrapperStyles}>
                                        <StyledFloraLink
                                            onClick={onClickShowMenu}
                                        >
                                            {name}
                                            {!isOpen && (
                                                <SystemIcon
                                                    sx={{
                                                        paddingLeft: 'inc10',
                                                        display: [
                                                            'none',
                                                            'none',
                                                            'none',
                                                            'inline',
                                                        ],
                                                    }}
                                                    name={
                                                        ESystemIconNames.CHEVRON_DOWN
                                                    }
                                                    size="small"
                                                />
                                            )}
                                            {isOpen && (
                                                <SystemIcon
                                                    sx={{
                                                        paddingLeft: 'inc10',
                                                        display: [
                                                            'none',
                                                            'none',
                                                            'none',
                                                            'inline',
                                                        ],
                                                    }}
                                                    name={
                                                        ESystemIconNames.CHEVRON_UP
                                                    }
                                                    size="small"
                                                />
                                            )}
                                        </StyledFloraLink>
                                    </div>
                                    {isOpen && (
                                        <DropDownMenu items={dropDownItems} />
                                    )}
                                </>
                            ) : (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        <StyledFloraLink href={slug}>
                                            {name}
                                        </StyledFloraLink>
                                    </div>
                                </>
                            )}
                        </SecondaryLinksList>
                    ))}
                </SecondaryLinks>
            </StyledSecondaryNavContainer>
        </>
    );
};

export default DesktopView;
