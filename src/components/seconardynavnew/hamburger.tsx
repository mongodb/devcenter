import Link from 'next/link';
import { useState } from 'react';
import { myData } from '../../data/secondary-nav';
import theme from '@mdb/flora/theme';
import { Link as FloraLink } from '@mdb/flora';

import { ESystemIconNames, SystemIcon, HorizontalRule } from '@mdb/flora';
import SecondaryLinksList from '../secondarynavdup/nav-item';
import styled from '@emotion/styled';

type SecondaryMenuListProps = {
    isOpen: boolean;
};

const MainLinkStyles = {
    color: 'red',
    fontSize: 'inc30',
    fontWeight: 500,
    padding: '16px 32px 16px',
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
    padding-left: 32px;
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
    padding-left: 32px;
    line-height: normal;
    span {
        color: ${theme.colors.text.default}!important;
        font-size: ${theme.fontSizes.inc20};
        font-family: ${theme.fonts.body};
        font-weight: 300;
        &:hover {
            border-bottom: none !important;
        }
    }
`;

const SecondaryLinks = styled.ul`
    overflow: hidden;
    height: ${(props: SecondaryMenuListProps) => (props.isOpen ? '100%' : '0')};
    padding-left: 32px;
    margin: 0;
`;

const plusOrMinusStylesForDropDowns = {
    display: 'inline',
    position: 'absolute' as 'absolute',
    right: 'inc40',
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
    paddingBottom: 'inc30',
    '.topics-title': {
        paddingBottom: '10px',
    },
};

const secondaryLinkDividerStyle = {
    display: 'block',
    borderTopWidth: 'inc10',
    borderColor: 'black20',
};

const DropDownWrapper = styled.div`
    .dropdown-titles {
        display: inline-block;
        font-size: 20px;
        margin-bottom: 25px;
    }

    background-color: #fff;
    color: #000;
    margin-left: -32px;
`;

const DropDownMenuList = styled.ul`
    list-style-type: none;
    white-space: nowrap;

    li {
        padding-top: 15px;
        padding-bottom: 15px;
    }
`;

const SubLinks = styled.ul`
    background-color: #f5f7fa;
    list-style-type: none;
    padding-left: 32px;
    margin-left: -32px;

    ul {
        list-style-type: none;
        padding-left: 32px;
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
                {/* Topics */}
                <div className="topics-title" onClick={onClickShowMenu}>
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
            <HorizontalRule
                sx={secondaryLinkDividerStyle}
                spacing="none"
                strokeWeight="small"
            />
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
                    {/* Topics titles mobile view */}
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
                                                                sx={aLinkStyles}
                                                                key={name}
                                                            >
                                                                <StyledFloraLink>
                                                                    {name} L3
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
                                </SubLinks>
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
            <Link href={slug} passHref>
                <a sx={aLinkStyles} key={name}>
                    <StyledFloraLinkChevronRight>
                        {name} | Products -> L3
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
            {dropDownItems && isOpenL1 && (
                <ul>
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

export const Hamburger = () => {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const openMobileMenu = () => {
        setMobileMenuIsOpen(!mobileMenuIsOpen);
    };
    return (
        <>
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
                    />
                )}
            </FloraLink>
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
                                <HorizontalRule
                                    sx={secondaryLinkDividerStyle}
                                    spacing="none"
                                    strokeWeight="medium"
                                />
                            </>
                        )}
                    </SecondaryLinksList>
                ))}
            </SecondaryLinks>
        </>
    );
};
