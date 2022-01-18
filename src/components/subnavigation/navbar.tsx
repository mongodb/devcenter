import NavButton from './nav-button';
import DeveloperTopics from './developer-topics';
import navButtons from '../../data/navbuttons';
import React, { useState } from 'react';
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
            <DeveloperTopicsMenu />
        </Context.Provider>
    );
};

export default NavBar;
