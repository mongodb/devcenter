import { useEffect, useRef, useState } from 'react';
import theme from '@mdb/flora/theme';

import { ESystemIconNames, Link as FloraLink, SystemIcon } from '@mdb/flora';
import { secondaryNavData } from '../../data/secondary-nav';

import SecondaryLinksList from './nav-item';
import DropDownMenu from './dropdown-menu';
import { StyledSecondaryNavContainer } from './desktop-styles';
import { getURLPath } from '../../utils/format-url-path';

const linkWrapperStyles = {
    position: 'relative' as 'relative',
    padding: 0,
};

const StyledSecondaryLinks = {
    padding: 0,
    margin: 0,
    overflow: 'visible',
    'li:not(:last-child)': {
        marginRight: theme.space.inc90,
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
            borderBottomColor: `${theme.colors.green40}`,
        },
        borderBottom: `${
            isActive
                ? `2px solid ${theme.colors.green40}`
                : 'solid 2px transparent'
        }`,
    },
    ':hover': {
        borderBottomColor: `${theme.colors.green40}`,
    },
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
        setIsOpen(isOpen => !isOpen);
    };
    const dropdownEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkIfClickedOutside = (event: MouseEvent) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (
                isOpen &&
                dropdownEl.current &&
                !dropdownEl.current.contains(event.target as HTMLDivElement)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener('click', checkIfClickedOutside);
        };
    }, [isOpen]);

    return (
        <div
            sx={{
                display: ['none', 'none', 'none', 'block'],
                borderBottom: [
                    null,
                    null,
                    null,
                    'solid 1px #000',
                    'solid 1px #000',
                ],
            }}
        >
            <nav sx={StyledSecondaryNavContainer}>
                <div sx={linkWrapperStyles}>
                    <FloraLink
                        href={getURLPath('/')}
                        sx={MainLinkStyles(activePath === '/' ? true : false)}
                    >
                        Developer Center
                    </FloraLink>
                </div>

                <ul sx={StyledSecondaryLinks}>
                    {secondaryNavData.map(({ name, slug, dropDownItems }) => (
                        <SecondaryLinksList key={name}>
                            {dropDownItems?.length ? (
                                <>
                                    <div sx={linkWrapperStyles}>
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
                                    </div>
                                    {isOpen && (
                                        <div ref={dropdownEl}>
                                            <DropDownMenu
                                                items={dropDownItems}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        <FloraLink
                                            href={getURLPath(slug)}
                                            sx={FloraLinkStyles(
                                                activePath === slug
                                                    ? true
                                                    : false
                                            )}
                                        >
                                            {name}
                                        </FloraLink>
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
