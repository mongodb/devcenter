import React, { useState } from 'react';

import {
    SecondaryMenuList,
    SecondaryNavMainLink,
    StyledFloraLink,
    StyledSecondaryNavContainer,
} from './styles';
import secondaryNavData from '../../data/secondary-nav';
import SecondaryNavLink from './nav-item';
import DropDownMenu from './dropdown-menu';

const ShowDropDownButton = ({ path, text, dropdownItems }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClickShowMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <StyledFloraLink onClick={onClickShowMenu}>{text}</StyledFloraLink>
            {isOpen && <DropDownMenu items={dropdownItems} />}
        </>
    );
};

const SecondaryNavBarDup: React.FunctionComponent = () => {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
    const openMobileMenu = () => {
        setMobileMenuIsOpen(!mobileMenuIsOpen);
    };
    return (
        <>
            <StyledSecondaryNavContainer>
                <SecondaryNavMainLink onClick={openMobileMenu}>
                    University
                    <span className="chevron-icon"></span>
                </SecondaryNavMainLink>
                <SecondaryMenuList isOpen={mobileMenuIsOpen}>
                    {secondaryNavData.map(({ text, path, dropdownItems }) => (
                        <SecondaryNavLink key={text}>
                            {dropdownItems?.length ? (
                                <ShowDropDownButton
                                    path={path}
                                    text={text}
                                    dropdownItems={dropdownItems}
                                />
                            ) : (
                                <StyledFloraLink href={path}>
                                    {text}
                                    <span>++++</span>
                                </StyledFloraLink>
                            )}
                        </SecondaryNavLink>
                    ))}
                </SecondaryMenuList>
            </StyledSecondaryNavContainer>
        </>
    );
};

export default SecondaryNavBarDup;
