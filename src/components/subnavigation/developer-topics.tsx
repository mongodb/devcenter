import React, { useContext } from 'react';
import {
    DeveloperTopicsTab,
    StyledButton,
} from '../../styled/developer-topics';
import { Context } from './navbar';

const DeveloperTopics: React.FunctionComponent = () => {
    const { open, setIsOpen } = useContext(Context);
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
