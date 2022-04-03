import React from 'react';
import { ListItem } from './styles';

interface IProps {
    children: React.ReactNode;
}

const SecondaryNavLink: React.FunctionComponent<IProps> = ({ children }) => {
    return <ListItem>{children}</ListItem>;
};

export default SecondaryNavLink;
