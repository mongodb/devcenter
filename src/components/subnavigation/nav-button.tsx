import Link from 'next/link';
import React from 'react';

interface IProps {
    path: string;
    label: string;
}

const NavButton: React.FunctionComponent<IProps> = ({
    path,
    label,
}: IProps) => {
    return (
        <Link href={path} passHref>
            <span data-testid={label}>{label}</span>
        </Link>
    );
};

export default NavButton;
