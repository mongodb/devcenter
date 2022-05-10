import Link from 'next/link';
import { useState } from 'react';
import { secondaryNavData } from '../../data/secondary-nav';
import { Link as FloraLink } from '@mdb/flora';

import { ESystemIconNames, SystemIcon } from '@mdb/flora';
import SecondaryLinksList from './nav-item';
import {
    aLinkStyles,
    chevronStylesForMainLink,
    DropDownStyles,
    MainLinkStyles,
    plusOrMinusStylesForDropDowns,
    SecondaryLinks,
    StylesDropDownMenuList,
    StylesDropDownWrapper,
    StylesFloraLink,
    StylesFloraLinkChevronRight,
    StylesSubLinks,
} from './mobile-styles';

const DropDownButton = ({
    text,
    dropDownItems,
}: {
    text: string;
    dropDownItems: unknown[];
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div sx={DropDownStyles}>
                {/* Level 1 */}
                <div onClick={onClickShowMenu}>
                    {text}
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
                </div>
            </div>
            {isOpen && <DropDownMenu items={dropDownItems} />}
        </>
    );
};

type NavLinks = {
    name: string;
    slug: string;
    dropDownItems: [];
    path?: string;
    all?: string;
    l1Product?: boolean;
    keyValue?: string;
};

const SubNavLink = ({
    name,
    slug,
    dropDownItems,
    path,
    all,
    keyValue,
}: NavLinks) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li key={keyValue}>
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
                                        }: NavLinks) => (
                                            <>
                                                {l1Product ? (
                                                    <li key={name}>
                                                        <MobileViewL1ProductLinks
                                                            name={name}
                                                            slug={slug}
                                                            dropDownItems={
                                                                dropDownItems
                                                            }
                                                            l1Product={
                                                                l1Product
                                                            }
                                                        />
                                                    </li>
                                                ) : (
                                                    <li key={name}>
                                                        <Link
                                                            href={slug}
                                                            passHref
                                                        >
                                                            <a
                                                                sx={{
                                                                    ...aLinkStyles,
                                                                    display:
                                                                        'flex',
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
                                                                <SystemIcon
                                                                    sx={{
                                                                        paddingLeft:
                                                                            'inc10',
                                                                        display:
                                                                            'inline',
                                                                    }}
                                                                    name={
                                                                        ESystemIconNames.CHEVRON_RIGHT
                                                                    }
                                                                    size="small"
                                                                />
                                                            </a>
                                                        </Link>
                                                    </li>
                                                )}
                                            </>
                                        )
                                    )}
                                    <li key={all}>
                                        <Link href={slug} passHref>
                                            <a
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
                                                <SystemIcon
                                                    sx={{
                                                        paddingLeft: 'inc10',
                                                        display: 'inline',
                                                    }}
                                                    name={
                                                        ESystemIconNames.CHEVRON_RIGHT
                                                    }
                                                    size="small"
                                                />
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </>
                        </>
                    )}
                </>
            )}
        </li>
    );
};

// Need help with items typeing
const DropDownMenu = ({ items }: any) => {
    return (
        // StylesDropDownMenuList
        <div sx={StylesDropDownWrapper}>
            <ul sx={StylesDropDownMenuList}>
                {items.map(
                    ({ name, slug, all, path, dropDownItems }: NavLinks) => (
                        <>
                            <SubNavLink
                                keyValue={name}
                                name={name}
                                slug={slug}
                                all={all}
                                path={path}
                                dropDownItems={dropDownItems}
                            />
                        </>
                    )
                )}
                <li key="all topics">
                    <Link href="all-topics" passHref>
                        <a sx={aLinkStyles}>
                            <FloraLink sx={StylesFloraLink}>
                                All Topics
                            </FloraLink>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

const MobileViewL1ProductLinks = ({ name, slug, dropDownItems }: NavLinks) => {
    const [isOpenL1, setIsOpenL1] = useState(false);
    const onClickShowL1Menu = () => {
        setIsOpenL1(!isOpenL1);
    };
    return (
        <>
            <div sx={{ display: 'flex', alignItems: 'center' }}>
                <Link href={slug} passHref>
                    <a
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
                </Link>
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
                            <Link href={slug} passHref>
                                <a sx={aLinkStyles} key={name}>
                                    {name}
                                </a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

const MobileView = () => {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const openMobileMenu = () => {
        setMobileMenuIsOpen(!mobileMenuIsOpen);
    };
    return (
        <div
            sx={{
                boxSizing: 'border-box',
                background: '#fff',
                backgroundColor: 'white',
                display: ['block', 'block', 'block', 'none'],
                position: 'fixed',
                overflowY: 'auto',
                width: '100%',
                zIndex: '10',
            }}
        >
            <div sx={{ display: 'grid', gridTemplateColumns: '240px 1fr' }}>
                <FloraLink sx={MainLinkStyles} onClick={openMobileMenu}>
                    MongoDB Developer
                    {!mobileMenuIsOpen && (
                        <SystemIcon
                            sx={chevronStylesForMainLink}
                            className="chevron-icon"
                            name={ESystemIconNames.CHEVRON_DOWN}
                            size="small"
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
                <div
                    sx={{
                        height: '68px',
                        width: '100%',
                        borderBottom: 'solid 2px #00684A',
                    }}
                ></div>
            </div>
            <SecondaryLinks isOpen={mobileMenuIsOpen}>
                {secondaryNavData.map(({ name, slug, dropDownItems }) => (
                    <SecondaryLinksList key={name}>
                        {dropDownItems?.length ? (
                            <DropDownButton
                                text={name}
                                dropDownItems={dropDownItems}
                            />
                        ) : (
                            <>
                                <div sx={DropDownStyles}>
                                    <FloraLink
                                        sx={{
                                            ...StylesFloraLink,
                                            paddingLeft: 0,
                                        }}
                                        href={slug}
                                    >
                                        {name}
                                    </FloraLink>
                                </div>
                            </>
                        )}
                    </SecondaryLinksList>
                ))}
            </SecondaryLinks>
        </div>
    );
};

export default MobileView;
