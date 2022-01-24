import styled from '@emotion/styled';
import { colorMap, size } from './theme';

const DeveloperTopicsMenuWrapper = styled('div')`
    align-items: center;
    background: ${colorMap.greyLightOne};
    color: ${colorMap.devBlack};
    display: flex;
    height: 200px;
    justify-content: center;
    left: 0;
    margin: auto;
    max-width: ${size.maxWidth};
    right: 0;
    width: 100%;
`;

export { DeveloperTopicsMenuWrapper };
