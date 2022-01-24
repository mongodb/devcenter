import styled from '@emotion/styled';
import { colorMap } from './theme';

const NavbarWrapper = styled('div')`
    background: ${colorMap.greyDarkTwo};
    display: flex;
    flex-direction: row;
    height: 64px;
    justify-content: space-around;
    width: 100%;
`;

export { NavbarWrapper };
