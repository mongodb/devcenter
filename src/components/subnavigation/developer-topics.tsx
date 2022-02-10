import React from 'react';
import {
    DeveloperTopicsTab,
    StyledButton,
} from '../../styled/developer-topics';

interface IProps {
    open: boolean;
    setIsOpen: any;
}

const DeveloperTopics: React.FunctionComponent<IProps> = ({
    open,
    setIsOpen,
}: IProps) => {
    const handleOpening = () => {
        setIsOpen(!open);
    };
    return (
        <DeveloperTopicsTab>
            <StyledButton onClick={handleOpening}>
                Developer Topics
            </StyledButton>
        </DeveloperTopicsTab>
    );
};

export default DeveloperTopics;
