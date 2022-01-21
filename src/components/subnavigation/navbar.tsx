import NavButton from './nav-button';
import DeveloperTopics from './developer-topics';
import navButtons from '../../data/navbuttons';
import React, { useRef, useState } from 'react';
import { NavbarWrapper } from '../../styled/nav-bar';
import DeveloperTopicsMenu from './developer-topics-menu';
import useOutsideClick from './hooks/use-outside-click';

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

    useOutsideClick(ref, () => {
        if (open) {
            setIsOpen(false);
        }
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
            {open && <DeveloperTopicsMenu ref={ref} />}
        </Context.Provider>
    );
};

export default NavBar;
