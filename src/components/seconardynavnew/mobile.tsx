import Link from 'next/link';
import { useState } from 'react';
import { myData } from '../../data/secondary-nav';
import theme from '@mdb/flora/theme';
import { Link as FloraLink } from '@mdb/flora';

import { ESystemIconNames, SystemIcon } from '@mdb/flora';
import SecondaryLinksList from './nav-item';
import styled from '@emotion/styled';

type SecondaryMenuListProps = {
    isOpen: boolean;
};

const MainLinkStyles = {
    borderBottom: 'solid #00ED64 2px',
    color: 'red',
    fontSize: 'inc30',
    fontWeight: 500,
    paddingLeft: 'inc50',
    paddingTop: 'inc30',
    paddingBottom: 'inc30',
    '.textlink-default-text-class': {
        color: '#000!important',
        fontSize: '18px!important',
        '&:hover': {
            borderBottom: '2px solid transparent!important',
        },
    },
};

const StyledFloraLink = styled(FloraLink)`
    display: 'inline-block';
    padding-left: ${theme.space.inc40};
    line-height: normal;
    span {
        color: ${theme.colors.text.default}!important;
        font-size: ${theme.fontSizes.inc20};
        font-family: ${theme.fonts.body};
        font-weight: 300;
        &:hover {
            border-bottom: 2px solid transparent !important;
        }
    }
`;

const StyledFloraLinkChevronRight = styled(FloraLink)`
    display: 'flex';
    padding-left: ${theme.space.inc40};
    line-height: normal;
    span {
        color: ${theme.colors.text.default}!important;
        font-size: ${theme.fontSizes.inc20};
        font-family: ${theme.fonts.body};
        font-weight: 300;
        &:hover {
            border-bottom: solid 2px transparent !important;
        }
    }
`;

const SecondaryLinks = styled.ul`
    overflow: hidden;
    height: ${(props: SecondaryMenuListProps) =>
        props.isOpen ? '100vh' : '0'};
    padding-left: ${theme.space.inc40};
    padding-right: ${theme.space.inc40};
    padding-top: ${theme.space.inc40};
    margin: 0;
    /* L1 */
    > li {
        padding-bottom: ${theme.space.inc30};
        position: relative;

        &:first-child {
            min-height: 30px;
        }
        &:not(:last-child) {
            border-bottom: solid #e7eeec 1px;
        }
    }
`;

const plusOrMinusStylesForDropDowns = {
    position: 'absolute' as 'absolute',
    right: '0',
};

const aLinkStyles = {
    display: 'inline-block',
    alignItems: 'center',
    fontSize: 'inc20',
    fontFamily: 'euclid-circular-a',
    fontWeight: 300,

    '&:hover': {
        color: 'text.selected',
        textDecoration: 'none',
    },
};

const chevronStylesForMainLink = {
    display: 'inline',
    position: 'absolute' as 'absolute',
    right: 'inc40',
    stroke: 'icon.system.success',
};

const DropDownStyles = {
    position: 'relative' as 'relative',
};

const DropDownWrapper = styled.div`
    .dropdown-titles {
        display: inline-block;
        font-size: ${theme.fontSizes.inc40};
        margin-bottom: ${theme.space.inc40};
    }

    background-color: #fff;
    color: #000;
`;

const DropDownMenuList = styled.ul`
    list-style-type: none;
    white-space: nowrap;
    padding-top: ${theme.space.inc30};
    padding-left: 0;
    /* L2 */
    li:not(:last-child) {
        padding-bottom: ${theme.space.inc30};
    }
`;

// L2
const SubLinks = styled.ul`
    background-color: #f5f7fa;
    list-style-type: none;
    padding-top: ${theme.space.inc40};
    padding-bottom: ${theme.space.inc40};
    margin-left: -${theme.space.inc40};
    margin-right: -${theme.space.inc40};
    /* L3 */
    > li {
        padding-left: ${theme.space.inc50};

        &:not(:last-child) {
            padding-bottom: ${theme.space.inc50};
        }
    }

    ul {
        list-style-type: none;
        padding-left: ${theme.space.inc40};
        padding-top: ${theme.space.inc40};
        /* L4 */
        > li:not(:last-child) {
            padding-bottom: ${theme.space.inc60};
        }
        > li:last-child {
            color: #006cfa;
        }
    }
`;

const DropDownButton = ({ path, text, dropdownItems }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div sx={DropDownStyles}>
                {/* Level 1 */}
                <div onClick={onClickShowMenu}>
                    {text} L1
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
            {isOpen && <DropDownMenu items={dropdownItems} />}
        </>
    );
};

const SubNavLink = ({ name, slug, dropDownItems, path, all }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li key={name}>
            <>
                <span
                    sx={{
                        display: 'inline',
                    }}
                >
                    {/* Level 2 */}
                    <StyledFloraLink onClick={onClickShowMenu}>
                        {name} L2
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
                    </StyledFloraLink>
                </span>
            </>
            {dropDownItems && (
                <>
                    {isOpen && (
                        <>
                            {/* Dropdown link mobile view */}
                            <>
                                {' '}
                                <div sx={{ backgroundColor: 'red' }}>
                                    <SubLinks>
                                        {dropDownItems?.map(
                                            ({
                                                name,
                                                slug,
                                                l1Product,
                                                dropDownItems,
                                            }: any) => (
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
                                                        <li>
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
                                                                    <StyledFloraLink>
                                                                        {name}{' '}
                                                                        L3
                                                                    </StyledFloraLink>
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
                                        <li>
                                            <Link href={slug} passHref>
                                                <a sx={aLinkStyles} key={name}>
                                                    <StyledFloraLink>
                                                        {all} L3
                                                    </StyledFloraLink>
                                                </a>
                                            </Link>
                                        </li>
                                    </SubLinks>
                                </div>
                            </>
                        </>
                    )}
                </>
            )}
        </li>
    );
};

const DropDownMenu = ({ items }: any) => {
    return (
        <DropDownWrapper>
            <DropDownMenuList>
                {items.map(({ name, slug, all, path, dropDownItems }: any) => (
                    <>
                        <SubNavLink
                            key={name}
                            name={name}
                            slug={slug}
                            all={all}
                            path={path}
                            dropDownItems={dropDownItems}
                        />
                    </>
                ))}
                <li>
                    <Link href="all-topics" passHref>
                        <a sx={aLinkStyles} key="All Topics">
                            <StyledFloraLink>All Topics</StyledFloraLink>
                        </a>
                    </Link>
                </li>
            </DropDownMenuList>
        </DropDownWrapper>
    );
};

const MobileViewL1ProductLinks = ({ name, slug, dropDownItems }: any) => {
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
                        <StyledFloraLinkChevronRight>
                            {name} | Products{` ->`} L3
                        </StyledFloraLinkChevronRight>
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
                    {dropDownItems.map(({ name }: any) => (
                        <li sx={{ marginLeft: 'inc40' }} key={name}>
                            <Link href={slug} passHref>
                                <a sx={aLinkStyles} key={name}>
                                    {name} | Products L4
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
                {myData.map(({ name, slug, dropDownItems }) => (
                    <SecondaryLinksList key={name}>
                        {dropDownItems?.length ? (
                            <DropDownButton
                                path={slug}
                                text={name}
                                dropdownItems={dropDownItems}
                            />
                        ) : (
                            <>
                                <div sx={DropDownStyles}>
                                    <StyledFloraLink href={slug}>
                                        {name} L1
                                    </StyledFloraLink>
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
