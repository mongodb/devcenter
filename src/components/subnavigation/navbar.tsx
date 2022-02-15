import SecondaryNavLink from './nav-button';
import navButtons from '../../data/navbuttons';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { SecondaryNav } from '../../styled/nav-bar';
import styled from '@emotion/styled';

const NavBar: React.FunctionComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };

    const DropDownWrapper = styled.ul`
        position: absolute;
        top: 28px;
        left: 0;
        padding: 15px;
        background-color: #ccc;
        min-width: 300px;
    `;

    const ListItem = styled.li`
        padding: 0.5rem 0;
        list-style: none;

        > a {
            color: #fff;
            text-decoration: none;
        }
    `;

    const DropDown = ({ items, ...props }: any) =>
        items.map(({ text, path }: any) => <ListItem key={text}><Link href={path} {...props}>{text}</Link></ListItem>);

    return (
        <>
            <SecondaryNav>
                <span>University</span>
                {navButtons.map(({ text, path, dropdown, dropdownItems }) => (
                    <SecondaryNavLink key={text}>
                        {dropdown ? (
                            <>
                                <button onClick={onClickShowMenu}>
                                    {text}
                                </button>
                                {isOpen && <DropDownWrapper><DropDown items={dropdownItems} /></DropDownWrapper>}
                            </>
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
