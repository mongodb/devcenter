import styled from '@emotion/styled';
import { colorMap } from './theme';

const StyledButton = styled('button')`
    background: none;
    border: none;
    color: ${colorMap.devWhite};
    cursor: pointer;
`;

const DeveloperTopicsTab = styled('div')`
    align-items: center;
    display: flex;
    justify-content: center;
`;

export { StyledButton, DeveloperTopicsTab };
