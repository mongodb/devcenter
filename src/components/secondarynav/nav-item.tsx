import React from 'react';
import styled from '@emotion/styled';
import { screenSize, size } from '../../styled/theme';

interface IProps {
    children: React.ReactNode;
    key: string;
}

const ListItem = styled.li`
    position: relative;
    padding: 2rem 5rem 2rem 0;
    list-style: none;
    display: inline-block;
    
    @media ${screenSize.upToLarge} {
        padding-left: 0;
        display: block;
    }

    a {
        color: #fff;
        text-decoration: none;
        text-align: center;
        display: block;

        @media ${screenSize.upToLarge} {
            text-align: left;
        }
    }

    .button-item {
        font-size: inherit;
        color: #fff;
        border: none;
        background-color: transparent;
        padding: 0;
        width: 100%;

        @media ${screenSize.upToLarge} {
            text-align: left;
        }

        &:hover {
            cursor: pointer;
        }
    }
`;

const SecondaryNavLink: React.FunctionComponent<IProps> = ({
    key,
    children,
}) => {
    return <ListItem data-testid={key}>{children}</ListItem>;
};

export default SecondaryNavLink;
