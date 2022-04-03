import React from 'react';
import { DropDownMenuList, StyledFloraLink } from './styles';

const DropDownMenu = ({ items }: any) => (
    <DropDownMenuList>
        {items.map(({ text, path }: any) => (
            <StyledFloraLink key={text} href={path}>
                {text}
            </StyledFloraLink>
        ))}
    </DropDownMenuList>
);

export default DropDownMenu;
