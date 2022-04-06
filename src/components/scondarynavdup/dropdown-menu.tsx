import React from 'react';
import { DropDownMenuList, DropDownWrapper } from './styles';

const aLinkStyles = () => {
    return {
        display: 'block',
        fontSize: 'inc20',
        fontFamily: 'euclid-circular-a',
        fontWeight: 300,
        paddingTop: ['inc40', 'inc40', 'inc40', 0],
        paddingBottom: ['inc40', 'inc40', 'inc40', 0],
        paddingLeft: ['inc70', 'inc70', 'inc70', 0],
        '&:hover': {
            color: 'text.selected',
        },
    };
};

const DropDownMenu = ({ items }: any) => (
    <DropDownWrapper>
        <DropDownMenuList>
            {items.map(({ text, path }: any) => (
                <a sx={aLinkStyles()} key={text} href={path}>
                    {text}
                </a>
            ))}
        </DropDownMenuList>
    </DropDownWrapper>
);

export default DropDownMenu;
