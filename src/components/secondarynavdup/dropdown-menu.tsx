import { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import theme from '@mdb/flora/theme';
import {
    Link as FloraLink,
    TypographyScale,
    ESystemIconNames,
    SystemIcon,
} from '@mdb/flora';
import { DropDownMenuList, DropDownWrapper, StyledFloraLink } from './styles';

const aLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 'inc20',
    fontFamily: 'euclid-circular-a',
    fontWeight: 300,
    paddingTop: ['inc40', 'inc40', 'inc40', 0],
    paddingBottom: ['inc40', 'inc40', 'inc40', 0],
    paddingLeft: ['inc70', 'inc70', 'inc70', 0],
    '&:hover': {
        color: 'text.selected',
    },
};

const plusOrMinusStylesForDropDowns = {
    display: ['inline', 'inline', 'inline', 'none'],
    position: 'absolute' as 'absolute',
    right: ['inc40', 'inc50', 'inc50', 0],
};

const SubLinks = styled.ul`
    list-style-type: none;
    ul {
        list-style-type: none;
        padding: 0;
    }
    padding: 0;
    @media only screen and (min-width: ${theme.sizes.breakpoint.large}) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
    }
`;

const SubNavLink = ({ name, slug, dropDownItems, path, all }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    const [isOpenL1, setIsOpenL1] = useState(false);
    const onClickShowL1Menu = () => {
        setIsOpenL1(!isOpenL1);
    };

    return (
        <li key={name}>
            {slug ? (
                <Link href={slug} passHref>
                    <a className="dropdown-titles" sx={aLinkStyles} key={name}>
                        {name}
                    </a>
                </Link>
            ) : (
                <>
                    <span
                        sx={{
                            display: ['inline', 'inline', 'inline', 'none'],
                        }}
                    >
                        {/* Titles mobile view */}
                        <StyledFloraLink onClick={onClickShowMenu}>
                            {name}
                            {!isOpen && (
                                <SystemIcon
                                    sx={{
                                        paddingLeft: 'inc10',
                                        display: [
                                            'none',
                                            'none',
                                            'none',
                                            'inline',
                                        ],
                                    }}
                                    name={ESystemIconNames.CHEVRON_DOWN}
                                    size="small"
                                />
                            )}
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
                                    sx={{
                                        paddingLeft: 'inc10',
                                        display: [
                                            'none',
                                            'none',
                                            'none',
                                            'inline',
                                        ],
                                    }}
                                    name={ESystemIconNames.CHEVRON_UP}
                                    size="small"
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
                    {/* Titles desktop view */}
                    <TypographyScale
                        sx={{
                            display: ['none', 'none', 'none', 'block'],
                        }}
                        inverse
                        variant="body1"
                    >
                        {name}
                    </TypographyScale>
                </>
            )}
            {dropDownItems && (
                <>
                    <div sx={{ display: ['block', 'block', 'block', 'none'] }}>
                        {isOpen && (
                            <>
                                {/* Dropdown link mobile view */}
                                <SubLinks>
                                    {dropDownItems?.map(
                                        ({ name, slug, l1Product, dropDownItems }: any) => (
                                            <li key={name}>
                                                <Link href={slug} passHref>
                                                    <a
                                                        sx={aLinkStyles}
                                                        key={name}
                                                    >
                                                        {l1Product ? (
                                                            <StyledFloraLink
                                                                onClick={
                                                                    onClickShowL1Menu
                                                                }
                                                            >
                                                                {name}
                                                                {!isOpen && (
                                                                    <SystemIcon
                                                                        sx={{
                                                                            paddingLeft:
                                                                                'inc10',
                                                                            display:
                                                                                [
                                                                                    'none',
                                                                                    'none',
                                                                                    'none',
                                                                                    'inline',
                                                                                ],
                                                                        }}
                                                                        name={
                                                                            ESystemIconNames.CHEVRON_DOWN
                                                                        }
                                                                        size="small"
                                                                    />
                                                                )}
                                                                {!isOpenL1 && (
                                                                    <SystemIcon
                                                                        sx={
                                                                            plusOrMinusStylesForDropDowns
                                                                        }
                                                                        name={
                                                                            ESystemIconNames.PLUS
                                                                        }
                                                                        size="small"
                                                                        color="success"
                                                                    />
                                                                )}
                                                                {isOpenL1 && (
                                                                    <SystemIcon
                                                                        sx={{
                                                                            paddingLeft:
                                                                                'inc10',
                                                                            display:
                                                                                [
                                                                                    'none',
                                                                                    'none',
                                                                                    'none',
                                                                                    'inline',
                                                                                ],
                                                                        }}
                                                                        name={
                                                                            ESystemIconNames.CHEVRON_UP
                                                                        }
                                                                        size="small"
                                                                    />
                                                                )}
                                                                {isOpenL1 && (
                                                                    <SystemIcon
                                                                        sx={
                                                                            plusOrMinusStylesForDropDowns
                                                                        }
                                                                        name={
                                                                            ESystemIconNames.MINUS
                                                                        }
                                                                        size="medium"
                                                                        color="success"
                                                                    />
                                                                )}
                                                            </StyledFloraLink>
                                                        ) : (
                                                            <SystemIcon
                                                                sx={{
                                                                    paddingLeft:
                                                                        'inc10',
                                                                    display: [
                                                                        'inline',
                                                                        'inline',
                                                                        'inline',
                                                                        'none',
                                                                    ],
                                                                }}
                                                                name={
                                                                    ESystemIconNames.CHEVRON_RIGHT
                                                                }
                                                                size="small"
                                                            />
                                                        )}
                                                    </a>
                                                </Link>
                                                {dropDownItems && <ul>
                                                    {dropDownItems.map(({name}:any) => (<li key={name}>{name}</li>))}
                                                </ul>}
                                            </li>
                                        )
                                    )}
                                </SubLinks>
                                <Link href={path} passHref>
                                    {all}
                                </Link>
                            </>
                        )}
                    </div>
                    <div sx={{ display: ['none', 'none', 'none', 'block'] }}>
                        <>
                            {/* Dropdown link desktop view */}
                            <SubLinks>
                                {dropDownItems?.map(
                                    ({
                                        name,
                                        slug,
                                        dropDownItems,
                                        l1Product,
                                    }: any) => (
                                        <li key={name}>
                                            <Link href={slug} passHref>
                                                <a sx={aLinkStyles} key={name}>
                                                    {l1Product ? (
                                                        <strong>{name}</strong>
                                                    ) : (
                                                        name
                                                    )}
                                                </a>
                                            </Link>
                                            {dropDownItems && (
                                                <ul>
                                                    {dropDownItems?.map(
                                                        ({
                                                            name,
                                                            slug,
                                                        }: any) => (
                                                            <li key={name}>
                                                                <Link
                                                                    href={slug}
                                                                    passHref
                                                                >
                                                                    <a
                                                                        sx={
                                                                            aLinkStyles
                                                                        }
                                                                        key={
                                                                            name
                                                                        }
                                                                    >
                                                                        {name}dgd
                                                                    </a>
                                                                </Link>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                )}
                            </SubLinks>
                            <Link href={path} passHref>
                                <FloraLink
                                    inverse
                                    linkIcon="chevron"
                                    linkIconDisableExpand={true}
                                >
                                    {all}
                                </FloraLink>
                            </Link>
                        </>
                    </div>
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
                    <SubNavLink
                        key={name}
                        name={name}
                        slug={slug}
                        all={all}
                        path={path}
                        dropDownItems={dropDownItems}
                    />
                ))}
            </DropDownMenuList>
        </DropDownWrapper>
    );
};

export default DropDownMenu;
