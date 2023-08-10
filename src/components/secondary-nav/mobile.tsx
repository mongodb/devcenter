import { useContext, useRef, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { UserMenu } from '@lg-private/mongo-nav';
import {
    ESystemIconNames,
    SystemIcon,
    Link as FloraLink,
    TypographyScale,
} from '@mdb/flora';

import { secondaryNavData } from '../../data/secondary-nav';
import { OverlayContext } from '../../contexts/overlay';
import SecondaryLinksList from './nav-item';
import {
    navWrapperStyles,
    aLinkStyles,
    chevronStylesForMainLink,
    userMenuStyles,
    DropDownStyles,
    MainLinkStyles,
    plusOrMinusStylesForDropDowns,
    secondaryLinkStyles,
    StylesDropDownMenuList,
    StylesDropDownWrapper,
    StylesFloraLink,
    StylesFloraLinkChevronRight,
    StylesSubLinks,
} from './mobile-styles';
import { DropDownItem, DropDownItem2 } from './dropdown-menu';
import { getURLPath } from '../../utils/format-url-path';
import { layers } from '../../styled/layout';
import {
    useLinkTracking,
    trackSecondaryNavLink,
    trackSecondaryNavToggle,
} from './tracking';

const SubNavLink = ({ name, dropDownItems, path, all }: DropDownItem) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li>
            <span
                sx={{
                    display: 'inline',
                }}
            >
                {/* Level 2 */}
                <FloraLink sx={StylesFloraLink} onClick={onClickShowMenu}>
                    {name}
                    {!isOpen && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns}
                            name={ESystemIconNames.PLUS}
                            size="small"
                            color="success"
                        />
                    )}
                    {isOpen && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns}
                            name={ESystemIconNames.MINUS}
                            size="small"
                            color="success"
                        />
                    )}
                </FloraLink>
            </span>
            {dropDownItems && (
                <>
                    {isOpen && (
                        <>
                            {/* Dropdown link mobile view */}
                            <>
                                <ul sx={StylesSubLinks}>
                                    {dropDownItems?.map(
                                        ({
                                            name,
                                            slug,
                                            l1Product,
                                            dropDownItems,
                                        }: DropDownItem2) => (
                                            <>
                                                {l1Product ? (
                                                    <li key={name}>
                                                        <MobileViewL1ProductLinks
                                                            name={name}
                                                            slug={slug}
                                                            dropDownItems={
                                                                dropDownItems
                                                            }
                                                        />
                                                    </li>
                                                ) : (
                                                    <li key={name}>
                                                        <a
                                                            href={getURLPath(
                                                                slug
                                                            )}
                                                            sx={{
                                                                ...aLinkStyles,
                                                                display: 'flex',
                                                                alignItems:
                                                                    'center',
                                                            }}
                                                            key={name}
                                                        >
                                                            {/* Level 3 */}
                                                            <FloraLink
                                                                sx={
                                                                    StylesFloraLink
                                                                }
                                                            >
                                                                {name}
                                                            </FloraLink>
                                                        </a>
                                                    </li>
                                                )}
                                            </>
                                        )
                                    )}
                                    {!!all && (
                                        <li key={all}>
                                            <a
                                                href={getURLPath(path)}
                                                sx={{
                                                    ...aLinkStyles,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                                key={name}
                                            >
                                                <FloraLink
                                                    className="all-link"
                                                    sx={StylesFloraLink}
                                                >
                                                    {all}
                                                </FloraLink>
                                            </a>
                                        </li>
                                    )}
                                </ul>
                            </>
                        </>
                    )}
                </>
            )}
        </li>
    );
};

const DropDownMenu = ({ items }: { items: DropDownItem[] }) => {
    return (
        // StylesDropDownMenuList
        <div sx={StylesDropDownWrapper}>
            <ul sx={StylesDropDownMenuList}>
                {items.map(({ name, slug, all, path, dropDownItems }: any) => (
                    <SubNavLink
                        key={`${name} (${slug})`}
                        name={name}
                        slug={slug}
                        all={all}
                        path={path}
                        dropDownItems={dropDownItems}
                    />
                ))}
                <li key="all topics">
                    <a href={getURLPath('topics')} sx={aLinkStyles}>
                        <FloraLink sx={StylesFloraLink}>All Topics</FloraLink>
                    </a>
                </li>
            </ul>
        </div>
    );
};

const MobileViewL1ProductLinks = ({
    name,
    slug,
    dropDownItems,
}: DropDownItem2) => {
    const [isOpenL1, setIsOpenL1] = useState(false);
    const onClickShowL1Menu = () => {
        setIsOpenL1(!isOpenL1);
    };
    return (
        <>
            <div sx={{ display: 'flex', alignItems: 'center' }}>
                <a
                    href={getURLPath(slug)}
                    sx={{
                        ...aLinkStyles,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    key={name}
                >
                    <FloraLink sx={StylesFloraLinkChevronRight}>
                        {name}
                    </FloraLink>
                    <SystemIcon
                        sx={{
                            paddingLeft: 'inc10',
                            display: 'inline',
                        }}
                        name={ESystemIconNames.CHEVRON_RIGHT}
                        size="small"
                    />
                </a>
                <span onClick={onClickShowL1Menu}>
                    {!isOpenL1 && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns}
                            name={ESystemIconNames.PLUS}
                            size="small"
                            color="success"
                        />
                    )}
                    {isOpenL1 && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns}
                            name={ESystemIconNames.MINUS}
                            size="small"
                            color="success"
                        />
                    )}
                </span>
            </div>
            {dropDownItems && isOpenL1 && (
                <ul>
                    {/* Product Level 4 */}
                    {dropDownItems.map(({ name }: { name: string }) => (
                        <li sx={{ marginLeft: 'inc40' }} key={name}>
                            <a
                                href={getURLPath(slug)}
                                sx={aLinkStyles}
                                key={name}
                            >
                                {name}
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

const MobileView = () => {
    const { data: session } = useSession();
    const account = session
        ? {
              firstName: session.firstName,
              lastName: session.lastName,
              email: session.email,
          }
        : null;
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const { setHasOverlay } = useContext(OverlayContext);
    const openMobileMenu = () => {
        trackSecondaryNavToggle(!mobileMenuIsOpen);
        setMobileMenuIsOpen(!mobileMenuIsOpen);
        setHasOverlay(!mobileMenuIsOpen);
    };

    const parentRef = useRef<HTMLDivElement>(null);
    useLinkTracking(parentRef.current, trackSecondaryNavLink);

    return (
        <div ref={parentRef} sx={navWrapperStyles(mobileMenuIsOpen)}>
            <div
                sx={{
                    position: 'sticky',
                    zIndex: layers.secondaryNav,
                    bg: '#ffffff',
                    top: 0,
                    display: 'inline-flex',
                    width: '100%',
                    gap: 'inc30',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '2px solid #00684A',
                    ...(mobileMenuIsOpen && {
                        borderImage:
                            'linear-gradient(to right, #00ED64 240px, #00684A 0) 1',
                    }),
                }}
            >
                <FloraLink
                    sx={{
                        ...MainLinkStyles,
                        width: 'auto',
                        marginLeft: 'inc50',
                    }}
                    href={getURLPath('/')}
                >
                    <TypographyScale variant="body1">
                        MongoDB Developer
                    </TypographyScale>
                </FloraLink>

                {account && (
                    <div
                        sx={userMenuStyles}
                        className="secondary-nav-user-menu-mobile"
                    >
                        <UserMenu
                            account={account}
                            activePlatform="devHub"
                            onLogout={e => {
                                e.preventDefault();
                                signOut({
                                    callbackUrl: '/developer/api/logout/',
                                });
                            }}
                        />
                    </div>
                )}
                <FloraLink
                    sx={{
                        ...MainLinkStyles,
                        width: 'auto',
                        padding: 'inc40',
                        marginRight: 'inc20',
                    }}
                    onClick={openMobileMenu}
                >
                    {!mobileMenuIsOpen && (
                        <SystemIcon
                            sx={chevronStylesForMainLink}
                            className="chevron-icon"
                            name={ESystemIconNames.CHEVRON_DOWN}
                            size="small"
                            strokeWeight="large"
                        />
                    )}
                    {mobileMenuIsOpen && (
                        <SystemIcon
                            sx={chevronStylesForMainLink}
                            className="chevron-icon"
                            name={ESystemIconNames.CHEVRON_UP}
                            size="small"
                            strokeWeight="large"
                        />
                    )}
                </FloraLink>
            </div>
            <ul sx={secondaryLinkStyles(mobileMenuIsOpen)}>
                {secondaryNavData.map(({ name, slug, dropDownItems }) => (
                    <SecondaryLinksList
                        linkClassName="secondary-nav-link"
                        key={name}
                    >
                        {dropDownItems?.length ? (
                            <>
                                {/* Level 1 */}
                                <div sx={DropDownStyles}>
                                    <div>{name}</div>
                                </div>
                                <DropDownMenu items={dropDownItems} />
                            </>
                        ) : (
                            <>
                                <div sx={DropDownStyles}>
                                    {slug.indexOf('http://') == 0 ||
                                    slug.indexOf('https://') == 0 ? (
                                        <FloraLink
                                            sx={{
                                                ...StylesFloraLink,
                                                paddingLeft: 0,
                                            }}
                                            target="_blank"
                                            href={getURLPath(slug)}
                                        >
                                            {name}
                                        </FloraLink>
                                    ) : (
                                        <FloraLink
                                            sx={{
                                                ...StylesFloraLink,
                                                paddingLeft: 0,
                                            }}
                                            href={getURLPath(slug)}
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
        </div>
    );
};

export default MobileView;
