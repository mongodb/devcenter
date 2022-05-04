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
    fontSize: 'inc30',
    fontWeight: 500,
    paddingLeft: '32px',
};

const StyledFloraLink = styled(FloraLink)`
    display: 'inline-block';
    padding-left: 32px;
    span {
        color: ${theme.colors.text.default}!important;
        font-size: ${theme.fontSizes.inc20};
        font-family: ${theme.fonts.body};
        font-weight: 300;
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
    display: 'inline',
    alignItems: 'center',
    fontSize: 'inc20',
    fontFamily: 'euclid-circular-a',
    fontWeight: 300,
    paddingTop: 'inc40',
    paddingBottom: 'inc40',
    '&:hover': {
        color: 'text.selected',
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
    paddingTop: 'inc30',
    paddingBottom: 'inc30',
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
    padding: 0;
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
                <div onClick={onClickShowMenu}>
                    {text}
                    {!isOpen && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns}
                            name={ESystemIconNames.PLUS}
                            size="medium"
                            color="success"
                        />
                    )}
                    {isOpen && (
                        <SystemIcon
                            sx={plusOrMinusStylesForDropDowns}
                            name={ESystemIconNames.MINUS}
                            size="medium"
                            color="success"
                        />
                    )}
                </div>
            </div>
            {isOpen && <DropDownMenu items={dropdownItems} />}
            <HorizontalRule
                sx={secondaryLinkDividerStyle}
                spacing="none"
                strokeWeight="medium"
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
                        {name}
                        {!isOpen && (
                            <SystemIcon
                                sx={plusOrMinusStylesForDropDowns}
                                name={ESystemIconNames.PLUS}
                                size="medium"
                                color="success"
                            />
                        )}
                        {isOpen && (
                            <SystemIcon
                                sx={plusOrMinusStylesForDropDowns}
                                name={ESystemIconNames.MINUS}
                                size="medium"
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
                                                        {/* L1 Products Dropdown links */}
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
                                                        {/* Non L1 Dropdown links */}
                                                        <Link
                                                            href={slug}
                                                            passHref
                                                        >
                                                            <a
                                                                sx={aLinkStyles}
                                                                key={name}
                                                            >
                                                                {/* L1 Links */}
                                                                <StyledFloraLink>
                                                                    {name}
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
                                <Link href={path} passHref>
                                    <a sx={aLinkStyles} key={name}>
                                        {/* L1 Links */}
                                        <StyledFloraLink>{all}</StyledFloraLink>
                                    </a>
                                </Link>
                            </>
                        </>
                    )}
                </>
            )}
            {/* Add all topics buttons to last column */}
            {name.includes('Expertise Levels') && (
                <>
                    <span
                        sx={{
                            display: 'block',
                            marginTop: '25px',
                        }}
                    >
                        <Link href="example.com" passHref>
                            <a sx={aLinkStyles} key={name}>
                                {/* L1 Links */}
                                <StyledFloraLink>All Topics</StyledFloraLink>
                            </a>
                        </Link>
                    </span>
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
                    <StyledFloraLink>{name}</StyledFloraLink>
                    <SystemIcon
                        sx={{
                            paddingLeft: 'inc10',
                            display: 'inline',
                        }}
                        name={ESystemIconNames.CHEVRON_RIGHT}
                        size="medium"
                    />
                </a>
            </Link>
            <span onClick={onClickShowL1Menu}>
                {!isOpenL1 && (
                    <SystemIcon
                        sx={plusOrMinusStylesForDropDowns}
                        name={ESystemIconNames.PLUS}
                        size="medium"
                        color="success"
                    />
                )}
                {isOpenL1 && (
                    <SystemIcon
                        sx={plusOrMinusStylesForDropDowns}
                        name={ESystemIconNames.MINUS}
                        size="medium"
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

export const Hamburger = () => {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const openMobileMenu = () => {
        setMobileMenuIsOpen(!mobileMenuIsOpen);
    };
    return (
        <>
            <FloraLink sx={MainLinkStyles} onClick={openMobileMenu}>
                Developer Center
                {!mobileMenuIsOpen && (
                    <SystemIcon
                        sx={chevronStylesForMainLink}
                        className="chevron-icon"
                        name={ESystemIconNames.CHEVRON_DOWN}
                        size="medium"
                    />
                )}
                {mobileMenuIsOpen && (
                    <SystemIcon
                        sx={chevronStylesForMainLink}
                        className="chevron-icon"
                        name={ESystemIconNames.CHEVRON_UP}
                        size="medium"
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
                                {/* Outter links Documentation, Articles, Tutorials, Quick starts, etc  */}
                                <div sx={DropDownStyles}>
                                    <StyledFloraLink href={slug}>
                                        {name}
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
