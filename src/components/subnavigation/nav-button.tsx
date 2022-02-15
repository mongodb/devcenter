import React from 'react';
import styled from '@emotion/styled';

interface IProps {
    children: React.ReactNode;
    key: string;
}

const ListItem = styled.li`
    position: relative;
    padding: 0.5rem 0;
    list-style: none;
    grid-column: span 2;

    > a {
        color: #fff;
        text-decoration: none;
    }
`;

const SecondaryNavLink: React.FunctionComponent<IProps> = ({key, children}) => {
    return (
        <ListItem data-testid={key}>
            {children}
        </ListItem>
    );
};

export default SecondaryNavLink;
