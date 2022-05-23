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
import { DropDownItem, DropDownItem2 } from './dropdown-menu';
import { getURLPath } from '../../utils/format-url-path';

const DropDownButton = ({
    text,
    dropDownItems,
}: {
    text: string;
    dropDownItems: DropDownItem[];
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

const SubNavLink = ({ name, slug, dropDownItems, path, all }: DropDownItem) => {
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
                                                    </li>
                                                )}
                                            </>
                                        )
                                    )}
                                    {!!all && (
                                        <li key={all}>
                                            <a
                                                href={getURLPath(slug)}
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
                    <>
                        <SubNavLink
                            name={name}
                            slug={slug}
                            all={all}
                            path={path}
                            dropDownItems={dropDownItems}
                        />
                    </>
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
                <FloraLink
                    sx={{
                        ...MainLinkStyles,
                        ...(mobileMenuIsOpen && {
                            borderBottom: 'solid #00ED64 2px',
                        }),
                    }}
                    onClick={openMobileMenu}
                >
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
            </SecondaryLinks>
        </div>
    );
};

export default MobileView;
