import styled from '@emotion/styled';
import { colorMap } from './theme';

const DeveloperTopicsMenuWrapper = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    left: 25%;
    background: ${colorMap.greyLightOne};
    position: absolute;
    z-index: 10;
    height: 200px;
    color: black;
`;

export { DeveloperTopicsMenuWrapper };
