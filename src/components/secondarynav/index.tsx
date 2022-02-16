import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import SecondaryNavLink from './nav-item';
import secondaryNavData from '../../data/secondary-nav';
import { colorMap, screenSize, size } from '../../styled/theme';

type SecondaryMenuListProps = {
    isOpen: boolean;
};

const SecondaryNavWrapper = styled('nav')`
    background: ${colorMap.greyDarkTwo};

    .secondary-nav-logo {
        border: none;
        background-color: transparent;
        cursor: pointer;
        display: inline-block;
        float: left;
        color: inherit;
        font-size: ${size.medium};
        font-weight: bold;
        margin-right: ${size.medium};
        margin-left: ${size.medium};
        padding: 2rem 20px;

        @media ${screenSize.upToLarge} {
            display: block;
            float: initial;
            margin-bottom: 0;
        }
    }
`;

const SecondaryMenuList = styled.ul`
    float: left;
    height: ${(props: SecondaryMenuListProps) => (props.isOpen ? '100%' : '0')};
    margin: 0;

    @media ${screenSize.upToLarge} {
        float: initial;
        overflow: hidden;
    }
`;

const DropDownMenuList = styled.ul`
    background-color: #ccc;
    columns: 2;
    left: 0;
    min-width: 300px;
    margin-top: 0;
    position: absolute;
    padding: 15px;
    top: 96px; // Needs to be the height of the navbar

    @media ${screenSize.upToLarge} {
        columns: initial;
        float: initial;
        position: initial;
        padding: 0;
    }
`;

const DropdownListItem = styled.li`
    display: inline-block;
    list-style: none;
    padding: 1rem 0;

    @media ${screenSize.upToLarge} {
        display: block;
    }
`;

const DropDownMenu = ({ items }: any) => (
    <DropDownMenuList>
        {items.map(({ text, path }: any) => (
            <DropdownListItem key={text}>
                <Link href={path}>{text}</Link>
            </DropdownListItem>
        ))}
    </DropDownMenuList>
);

const ShowDropDownButton = ({ text, dropdownItems }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="button-item" onClick={onClickShowMenu}>
                {text}
            </button>
            {isOpen && <DropDownMenu items={dropdownItems} />}
        </>
    );
};

const SecondaryNavBar: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <SecondaryNavWrapper>
                <button onClick={openMobileMenu} className="secondary-nav-logo">
                    University
                </button>
                <SecondaryMenuList isOpen={isOpen}>
                    {secondaryNavData.map(
                        ({ text, path, dropdownItems }) => (
                            <SecondaryNavLink key={text}>
                                {dropdownItems?.length ? (
                                    <ShowDropDownButton
                                        text={text}
                                        dropdownItems={dropdownItems}
                                    />
                                ) : (
                                    <Link href={path}>{text}</Link>
                                )}
                            </SecondaryNavLink>
                        )
                    )}
                </SecondaryMenuList>
            </SecondaryNavWrapper>
        </>
    );
};

export default SecondaryNavBar;
