import { useState } from 'react';
import theme from '@mdb/flora/theme';

import { ESystemIconNames, Link, SystemIcon } from '@mdb/flora';
import { secondaryNavData } from '../../data/secondary-nav';

import SecondaryLinksList from './nav-item';
import DropDownMenu from './dropdown-menu';
import styled from '@emotion/styled';
import { StyledSecondaryNavContainer } from './desktop-styles';

type StyledFloraLinkProps = {
    isActive: boolean;
};

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

const StyledSecondaryLinks = {
    padding: 0,
    margin: 0,
    overflow: 'visible',
    'li:not(:last-child)': {
        marginRight: theme.space.inc40,
    },
};

const MainLink = styled(Link)`
    .textlink-default-text-class {
        color: ${theme.colors.text.default}!important;
        border-bottom: ${(props: StyledFloraLinkProps) =>
            props.isActive
                ? `2px solid ${theme.colors.green40}!important`
                : 'none'};
        :hover {
            border-bottom: 2px solid ${theme.colors.green40}!important;
        }
    }
`;

const StyledFloraLink = styled(Link)`
    display: 'inline-block';
    span {
        border-bottom: ${(props: StyledFloraLinkProps) =>
            props.isActive
                ? `2px solid ${theme.colors.green40}!important`
                : 'none'};
        color: ${theme.colors.text.default}!important;
        font-size: ${theme.fontSizes.inc20};
        font-family: ${theme.fonts.body};
        font-weight: 300;
        @media only screen and (max-width: 1050px) {
            font-size: ${theme.fontSizes.inc10};
        }
    }
    span:hover {
        border-bottom: 2px solid ${theme.colors.green40}!important;
    }
`;

const DesktopView = ({ activePath }: { activePath: string | undefined }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            sx={{
                display: ['none', 'none', 'none', 'block'],
                borderBottom: 'solid 1px black30',
            }}
        >
            <nav sx={StyledSecondaryNavContainer}>
                <div sx={linkWrapperStyles}>
                    <MainLink
                        href="/developer"
                        isActive={activePath === '/' ? true : false}
                        sx={MainLinkStyles}
                    >
                        Developer Center
                    </MainLink>
                </div>

                <ul sx={StyledSecondaryLinks}>
                    {secondaryNavData.map(({ name, slug, dropDownItems }) => (
                        <SecondaryLinksList key={name}>
                            {dropDownItems?.length ? (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        <StyledFloraLink
                                            isActive={
                                                activePath === slug
                                                    ? true
                                                    : false
                                            }
                                            onClick={onClickShowMenu}
                                        >
                                            {name}
                                            <SystemIcon
                                                sx={{
                                                    paddingLeft: 'inc20',
                                                    display: 'inline',
                                                }}
                                                name={
                                                    isOpen
                                                        ? ESystemIconNames.CHEVRON_UP
                                                        : ESystemIconNames.CHEVRON_DOWN
                                                }
                                                size="small"
                                                strokeWeight="large"
                                            />
                                        </StyledFloraLink>
                                    </div>
                                    {isOpen && (
                                        <DropDownMenu items={dropDownItems} />
                                    )}
                                </>
                            ) : (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        <StyledFloraLink
                                            isActive={
                                                activePath === slug
                                                    ? true
                                                    : false
                                            }
                                            href={slug}
                                        >
                                            {name}
                                        </StyledFloraLink>
                                    </div>
                                </>
                            )}
                        </SecondaryLinksList>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default DesktopView;
