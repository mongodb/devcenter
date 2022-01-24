import styled from '@emotion/styled';
import { colorMap, size } from './theme';

const DeveloperTopicsMenuWrapper = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colorMap.greyLightOne};
    height: 200px;
    color: black;
    position: absolute;
    top: 152px;
    left: 0;
    right: 0;
    margin: auto;
    max-width: ${size.maxContentWidth};
    width: 100%;
`;

export { DeveloperTopicsMenuWrapper };
