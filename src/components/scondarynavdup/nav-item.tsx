import React from 'react';
import { ListItem } from './styles';

interface IProps {
    children: React.ReactNode;
    key: string;
}

const SecondaryNavLink: React.FunctionComponent<IProps> = ({
    key,
    children,
}) => {
    return <ListItem>{children}</ListItem>;
};

export default SecondaryNavLink;
