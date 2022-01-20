import Link from 'next/link';
import React from 'react';
import { StyledNavList } from '../../styled/nav-button';

interface IProps {
    path: string;
    label: string;
}

const NavButton: React.FunctionComponent<IProps> = ({
    path,
    label,
}: IProps) => {
    return (
        <StyledNavList>
            <Link href={path} passHref>
                <span data-testid={label}>{label}</span>
            </Link>
        </StyledNavList>
    );
};

export default NavButton;
