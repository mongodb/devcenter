import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import SecondaryNavLink from './nav-item';
import secondaryNavData from '../../data/secondary-nav';
import { colorMap, screenSize, size } from '../../styled/theme';

const SecondaryNavWrapper = styled('nav')`
    align-items: center;
    background: ${colorMap.greyDarkTwo};
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    justify-content: space-around;

    .secondarynav-logo {
        font-size: ${size.medium};
        font-weight: bold;
        display: inline-block;
        margin-right: ${size.medium};
        margin-left: ${size.medium};

        @media ${screenSize.upToLarge} {
            margin-top: ${size.medium};
        }
    }
`;

const DropDownWrapper = styled.ul`
    @media ${screenSize.upToLarge} {
        position: initial;
        padding: 0;
    }
    margin-top: 0;
    position: absolute;
    top: 96px; // Needs to be the height of the navbar
    left: 0;
    padding: 15px;
    background-color: #ccc;
    min-width: 300px;
`;

const DropdownListItem = styled.li`
    padding: 1rem 0;
    list-style: none;
`;

const DropDownMenu = ({ items }: any) => (
    <DropDownWrapper>
        {items.map(({ text, path }: any) => (
            <DropdownListItem key={text}>
                <Link href={path}>{text}</Link>
            </DropdownListItem>
        ))}
    </DropDownWrapper>
);

const ShowDropDownButton = ({ text, dropdownItems }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const onMouseOverShowMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="button-item" onClick={onMouseOverShowMenu}>
                {text}
            </button>
            {isOpen && <DropDownMenu items={dropdownItems} />}
        </>
    );
};

const SecondaryNavBar: React.FunctionComponent = () => {
    return (
        <>
            <SecondaryNavWrapper>
                <span className="secondarynav-logo">University</span>
                {secondaryNavData.map(
                    ({ text, path, dropdown, dropdownItems }) => (
                        <SecondaryNavLink key={text}>
                            {dropdown ? (
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
            </SecondaryNavWrapper>
        </>
    );
};

export default SecondaryNavBar;
