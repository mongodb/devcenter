import React from 'react';
import { StyledList } from './styles';

interface IProps {
    children: React.ReactNode;
}

const SecondaryLinksList: React.FunctionComponent<IProps> = ({ children }) => {
    return <StyledList>{children}</StyledList>;
};

export default SecondaryLinksList;
