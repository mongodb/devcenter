import SecondaryNavLink from './nav-item';
import navButtons from '../../data/navbuttons';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { colorMap, size } from '../../styled/theme';

export const SecondaryNav = styled('nav')`
    padding: ${size.medium};
    align-items: center;
    background: ${colorMap.greyDarkTwo};
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    justify-content: space-around;
`;

const DropDownWrapper = styled.ul`
    position: absolute;
    top: 40px; // Needs to be the height of the navbar
    left: 0;
    padding: 15px;
    background-color: #ccc;
    min-width: 300px;
`;

const ListItem = styled.li`
    padding: 0.5rem 0;
    list-style: none;
`;

const DropDown = ({ items }: any) =>
    items.map(({ text, path }: any) => (
        <ListItem key={text}>
            <Link href={path}>
                {text}
            </Link>
        </ListItem>
    ));

const CallToActionDropDown = ({ text, dropdownItems }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <button className="button-item" onClick={onClickShowMenu}>{text}</button>
            {isOpen && (
                <DropDownWrapper>
                    <DropDown items={dropdownItems} />
                </DropDownWrapper>
            )}
        </>
    );
};

const NavBar: React.FunctionComponent = () => {
    return (
        <>
            <SecondaryNav>
                <span>University</span>
                {navButtons.map(({ text, path, dropdown, dropdownItems }) => (
                    <SecondaryNavLink key={text}>
                        {dropdown ? (
                            <CallToActionDropDown
                                text={text}
                                dropdownItems={dropdownItems}
                            />
                        ) : (
                            <Link href={path}>{text}</Link>
                        )}
                    </SecondaryNavLink>
                ))}
            </SecondaryNav>
        </>
    );
};

export default NavBar;
