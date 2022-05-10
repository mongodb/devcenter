import { useState } from 'react';
import theme from '@mdb/flora/theme';

import { ESystemIconNames, Link as FloraLink, SystemIcon } from '@mdb/flora';
import { secondaryNavData } from '../../data/secondary-nav';

import SecondaryLinksList from './nav-item';
import DropDownMenu from './dropdown-menu';
import styled from '@emotion/styled';
import { StyledSecondaryNavContainer } from './desktop-styles';
import Link from 'next/link';

const linkWrapperStyles = {
    position: 'relative' as 'relative',
    padding: 0,
};

const StyledSecondaryLinks = {
    padding: 0,
    margin: 0,
    overflow: 'visible',
    'li:not(:last-child)': {
        marginRight: theme.space.inc40,
    },
};

const MainLinkStyles = (isActive: boolean) => ({
    float: 'left' as 'left',
    marginRight: 'inc90',
    fontSize: 'inc30',
    fontWeight: 500,

    'span.textlink-default-text-class': {
        color: theme.colors.text.default,
        ':hover': {
            borderBottom: `2px solid ${theme.colors.green40}`,
        },
    },
    borderBottom: `${isActive ? `2px solid ${theme.colors.green40}` : 'none'}`,
});

const FloraLinkStyles = (isActive: boolean) => ({
    display: 'inline-block',
    'span.textlink-default-text-class': {
        borderBottom: `${
            isActive ? `2px solid ${theme.colors.green40}` : 'none'
        }`,
        color: theme.colors.text.default,
        fontSize: [
            theme.fontSizes.inc20,
            theme.fontSizes.inc20,
            theme.fontSizes.inc20,
            theme.fontSizes.inc10,
            theme.fontSizes.inc20,
        ],
        fontFamily: theme.fonts.body,
        fontWeight: '300',
        '&:hover': {
            borderBottom: `2px solid ${theme.colors.green40}`,
        },
    },
});

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
                    <Link href="/" passHref>
                        <FloraLink
                            href="/developer"
                            sx={MainLinkStyles(
                                activePath === '/' ? true : false
                            )}
                        >
                            Developer Center
                        </FloraLink>
                    </Link>
                </div>

                <ul sx={StyledSecondaryLinks}>
                    {secondaryNavData.map(({ name, slug, dropDownItems }) => (
                        <SecondaryLinksList key={name}>
                            {dropDownItems?.length ? (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        <Link href={slug} passHref>
                                            <FloraLink
                                                sx={FloraLinkStyles(
                                                    activePath === slug
                                                        ? true
                                                        : false
                                                )}
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
                                            </FloraLink>
                                        </Link>
                                    </div>
                                    {isOpen && (
                                        <DropDownMenu items={dropDownItems} />
                                    )}
                                </>
                            ) : (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        <Link href={slug} passHref>
                                            <FloraLink
                                                sx={FloraLinkStyles(
                                                    activePath === slug
                                                        ? true
                                                        : false
                                                )}
                                            >
                                                {name}
                                            </FloraLink>
                                        </Link>
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
