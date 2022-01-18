import styled from '@emotion/styled';
import { colorMap } from './theme';

const NavbarWrapper = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    position: relative;
    transform: translateZ(0);
    z-index: 2;
    background: ${colorMap.greyDarkTwo};
    div {
        & > span {
            font-size: medium;
            font-family: Akzidenz-Grotesk Std;
        }
        & > button {
            font-size: medium;
            font-family: Akzidenz-Grotesk Std;
        }
    }
`;

export { NavbarWrapper };
