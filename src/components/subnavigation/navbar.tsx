import NavButton from './nav-button';
import DeveloperTopics from './developer-topics';
import navButtons from '../../data/navbuttons';
import React, { useEffect, useState, useRef } from 'react';
import { NavbarWrapper } from '../../styled/nav-bar';
import DeveloperTopicsMenu from './developer-topics-menu';

interface ContextProps {
    open: boolean;
    setIsOpen: (open: boolean) => void;
}

export const Context = React.createContext<ContextProps>({
    open: false,
    setIsOpen: (open: boolean) => {
        /**/
    },
});

const NavBar: React.FunctionComponent = () => {
    const [open, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null); // Pass this ref down to the DeveloperTopicsMenu so we can tell when we've clicked outside of it.

    useEffect(() => {
        if (!open) return; // If it's not open, no need to define the function to close it.

        const closeMenu = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        // When the component is rendered, check if open, and add event listener to check for click outside of the menu.
        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener('click', closeMenu); // Remove the event listener on cleanup so we're not listening for clicks when it's closed.
        };
    });

    return (
        <Context.Provider value={{ open, setIsOpen }}>
            <NavbarWrapper>
                <NavButton
                    key="dev-center-home"
                    path="/"
                    label="Developer Center Home"
                />
                <DeveloperTopics />
                {navButtons.map((button: any) => (
                    <NavButton
                        key={button.path}
                        path={button.path}
                        label={button.label}
                    />
                ))}
            </NavbarWrapper>
            <DeveloperTopicsMenu ref={ref} />
        </Context.Provider>
    );
};

export default NavBar;
