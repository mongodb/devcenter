import React from 'react';
import { DeveloperTopicsTab, Button } from '../../styled/developer-topics';

interface IProps {
    open: boolean;
    setIsOpen: any;
    text: string;
}

const SecondaryNavDropdown: React.FunctionComponent<IProps> = ({
    text,
    open,
    setIsOpen,
}: IProps) => {
    const handleOpening = () => {
        setIsOpen(!open);
    };
    return (
        <DeveloperTopicsTab>
            <Button onClick={handleOpening}>{text}</Button>
        </DeveloperTopicsTab>
    );
};

export default SecondaryNavDropdown;
