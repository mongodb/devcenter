import styled from '@emotion/styled';
import { size } from './theme';

const NavbarWrapper = styled('nav')`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    > span {
        cursor: pointer;
        padding: ${size.default};
    }
    width: 100%;
`;

export { NavbarWrapper };
