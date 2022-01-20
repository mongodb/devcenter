import styled from '@emotion/styled';
import { colorMap, layer } from './theme';

const DeveloperTopicsMenuWrapper = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    left: 25%;
    background: ${colorMap.greyLightOne};
    position: absolute;
    z-index: ${layer.superFront};
    height: 200px;
    color: black;
`;

export { DeveloperTopicsMenuWrapper };
