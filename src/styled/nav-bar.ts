import styled from '@emotion/styled';
import { colorMap } from './theme';

const NavbarWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    background: ${colorMap.greyDarkTwo};
    height: 64px;
`;

export { NavbarWrapper };
