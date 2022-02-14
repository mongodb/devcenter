import React from 'react';
import styled from '@emotion/styled';

interface IProps {
    children: React.ReactNode;
    key: string;
}

const Link = styled.li`
    padding: 0.5rem 0;
    list-style: none;
    color: red;
    grid-column: span 2;
`;

const SecondaryNavLink: React.FunctionComponent<IProps> = ({key, children}) => {
    return (
        <Link data-testid={key}>
            {children}
        </Link>
    );
};

export default SecondaryNavLink;
