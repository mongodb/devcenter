import { useEffect, useRef, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import theme from '@mdb/flora/theme';
import { UserMenu } from '@leafygreen-ui/mongo-nav';
import { ThemeUICSSObject } from 'theme-ui';

import {
    ESystemIconNames,
    Link as FloraLink,
    SystemIcon,
    TypographyScale,
} from '@mdb/flora';
import { secondaryNavData } from '../../data/secondary-nav';

import SecondaryLinksList from './nav-item';
import DropDownMenu from './dropdown-menu';
import { navWrapperStyles, navContainerStyles } from './desktop-styles';
import { getURLPath } from '../../utils/format-url-path';
import { layers } from '../../styled/layout';
import {
    useLinkTracking,
    trackSecondaryNavLink,
    trackSecondaryNavToggle,
} from './tracking';

const linkWrapperStyles: ThemeUICSSObject = {
    position: 'relative',
    padding: 0,
};

const StyledSecondaryLinks: ThemeUICSSObject | undefined = {
    padding: 0,
    margin: 0,
    overflow: 'visible',
    '> li:not(:last-child)': {
        marginRight: [null, null, null, 'inc30', '40px'],
    },
    whiteSpace: 'nowrap',
};

const hoverLinkStyles = (isActive: boolean) => ({
    borderBottomWidth: 2,
    borderBottomStyle: 'solid',
    color: theme.colors.text.default,
    borderBottomColor: isActive ? 'green40' : 'transparent',
    ':hover': {
        borderBottomColor: 'green40',
    },
});

const MainLinkStyles = (isActive: boolean) => ({
    float: 'left',
    marginRight: [null, null, null, 'inc40', 'inc90'],
    fontWeight: 500,

    'span.textlink-default-text-class': {
        ...hoverLinkStyles(isActive),
        color: theme.colors.text.default,
        ':hover': {
            borderBottomColor: `${theme.colors.green40}`,
        },
    },
    ':hover': {
        borderBottomColor: `${theme.colors.green40}`,
    },
}) as ThemeUICSSObject;

const FloraLinkStyles = (isActive: boolean) => ({
    display: 'inline-block',
    'span.textlink-default-text-class': {
        ...hoverLinkStyles(isActive),
        fontSize: [null, null, null, 'inc10', 'inc20'],
        fontFamily: 'body',
        fontWeight: '300',
    },
});

const DesktopView = ({ activePath }: { activePath: string | undefined }) => {
    const { data: session } = useSession();
    const account = session
        ? {
              firstName: session.firstName,
              lastName: session.lastName,
              email: session.email,
          }
        : null;
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        trackSecondaryNavToggle(!isOpen);
        setIsOpen(isOpen => !isOpen);
    };

    // Keep in state to pass the updated version to tracking handler
    const [dropdownEl, setDropdownEl] = useState<HTMLElement | null>();
    // Also keep in a ref to avoid stale state in click listener
    const dropdownRef = useRef<HTMLElement>();
    dropdownRef.current = dropdownEl || undefined;
    const parentRef = useRef<HTMLDivElement>(null);

    useLinkTracking(parentRef.current, trackSecondaryNavLink);
    useLinkTracking(dropdownEl, trackSecondaryNavLink);

    useEffect(() => {
        const checkIfClickedOutside = (event: MouseEvent) => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (
                isOpen &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as HTMLDivElement)
            ) {
                setIsOpen(false);
                trackSecondaryNavToggle(false);
            }
        };

        document.addEventListener('click', checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener('click', checkIfClickedOutside);
        };
    }, [isOpen]);

    return (
        <div ref={parentRef} sx={navWrapperStyles}>
            <nav sx={navContainerStyles}>
                <div sx={{ ...linkWrapperStyles, whiteSpace: 'nowrap' }}>
                    <FloraLink
                        href={getURLPath('/')}
                        sx={{
                            ...MainLinkStyles(
                                activePath === '/' ? true : false
                            ),
                        }}
                    >
                        <TypographyScale
                            variant="body1"
                            sx={{
                                fontSize: [null, null, null, '16px', '20px'],
                            }}
                        >
                            MongoDB Developer
                        </TypographyScale>
                    </FloraLink>
                </div>

                <ul sx={StyledSecondaryLinks}>
                    {secondaryNavData.map(({ name, slug, dropDownItems }) => (
                        <SecondaryLinksList
                            linkClassName="secondary-nav-link"
                            key={name}
                        >
                            {dropDownItems?.length ? (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        <FloraLink
                                            sx={FloraLinkStyles(
                                                activePath === slug + '/'
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
                                                size="medium"
                                                strokeWeight="large"
                                            />
                                        </FloraLink>
                                    </div>
                                    {isOpen && (
                                        <div ref={ref => setDropdownEl(ref)}>
                                            <DropDownMenu
                                                items={dropDownItems}
                                            />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div sx={linkWrapperStyles}>
                                        {slug.indexOf('http://') == 0 ||
                                        slug.indexOf('https://') == 0 ? (
                                            <FloraLink
                                                target="_blank"
                                                href={slug}
                                                sx={FloraLinkStyles(
                                                    activePath === slug
                                                        ? true
                                                        : false
                                                )}
                                            >
                                                {name}
                                            </FloraLink>
                                        ) : (
                                            <FloraLink
                                                href={getURLPath(slug)}
                                                sx={FloraLinkStyles(
                                                    activePath === slug + '/'
                                                        ? true
                                                        : false
                                                )}
                                            >
                                                {name}
                                            </FloraLink>
                                        )}
                                    </div>
                                </>
                            )}
                        </SecondaryLinksList>
                    ))}
                </ul>
                {account && (
                    <div
                        sx={{
                            marginLeft: 'auto',
                            zIndex: layers.secondaryNav,
                            justifySelf: 'end',
                            px: [null, null, null, 'inc30', '40px'],
                            minWidth: 'inc80',
                        }}
                    >
                        <UserMenu
                            account={account}
                            activePlatform="devHub"
                            onLogout={e => {
                                e.preventDefault();
                                signOut({
                                    callbackUrl: '/developer/api/logout',
                                });
                            }}
                        />
                    </div>
                )}
            </nav>
        </div>
    );
};

export default DesktopView;