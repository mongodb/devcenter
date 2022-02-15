import React, { useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import SecondaryNavLink from './nav-item';
import secondaryNavData from '../../data/secondary-nav';
import { colorMap, screenSize, size } from '../../styled/theme';

const SecondaryNavWrapper = styled('nav')`
    background: ${colorMap.greyDarkTwo};

    .secondary-nav-logo {
        display: inline-block;
        float: left;
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
    margin: 0;

    @media ${screenSize.upToLarge} {
        float: initial;
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
                <span className="secondary-nav-logo">University</span>
                <SecondaryMenuList>
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
                </SecondaryMenuList>
            </SecondaryNavWrapper>
        </>
    );
};

export default SecondaryNavBar;
