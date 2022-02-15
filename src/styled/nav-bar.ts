import styled from '@emotion/styled';
import { colorMap, size } from './theme';

const SecondaryNav = styled('nav')`
    padding: ${size.small} ${size.medium};
    align-items: center;
    background: ${colorMap.greyDarkTwo};
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    justify-content: space-around;
`;

export { SecondaryNav };
