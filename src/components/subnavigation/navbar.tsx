import SecondaryNavLink from './nav-button';
import SecondaryNavDropdown from './developer-topics';
import navButtons from '../../data/navbuttons';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { NavbarWrapper } from '../../styled/nav-bar';
import DeveloperTopicsMenu from './developer-topics-menu';
import useOutsideClick from './hooks/use-outside-click';

const NavBar: React.FunctionComponent = () => {
    const [open, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null); // Pass this ref down to the DeveloperTopicsMenu so we can tell when we've clicked outside of it.

    useOutsideClick(ref, () => {
        if (open) {
            setIsOpen(false);
        }
    });

    return (
        <>
            <NavbarWrapper>
                <h3>University</h3>
                {navButtons.map(({ text, path, dropdown }) => (
                    <SecondaryNavLink key={text}>
                        {dropdown ? (
                            <SecondaryNavDropdown
                                open={open}
                                setIsOpen={setIsOpen}
                                text={text}
                            />
                        ) : (
                            <Link href={path}>{text}</Link>
                        )}
                    </SecondaryNavLink>
                ))}
            </NavbarWrapper>
            {open && <DeveloperTopicsMenu ref={ref} />}
        </>
    );
};

export default NavBar;
