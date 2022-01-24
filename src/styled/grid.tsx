import styled from '@emotion/styled';

import { screenSize, size } from './theme';
import { GridProps, GridColumnProps } from '../interfaces/components/grid';

const BASE_GRID_PHONE = 4;
const BASE_GRID_TABLET = 8;
const BASE_GRID_DESKTOP = 12;
const GUTTER_BASE = 16;

const StyledGrid = styled.div<GridProps>`
    align-items: ${({ verticalAlign }) =>
        verticalAlign ? verticalAlign : 'start'};
    display: grid;
    justify-items: ${({ horizontalAlign }) =>
        horizontalAlign ? horizontalAlign : 'start'};
    @media ${screenSize.upToLarge} {
        grid-template-columns: repeat(${BASE_GRID_TABLET}, 1fr);
        margin-left: ${size.xlarge};
        margin-right: ${size.xlarge};
    }
    @media ${screenSize.upToMedium} {
        grid-template-columns: repeat(${BASE_GRID_PHONE}, 1fr);
        margin-left: ${size.default};
        margin-right: ${size.default};
    }
    grid-template-columns: repeat(${BASE_GRID_DESKTOP}, 1fr);
    grid-column-gap: ${({ columnGutter }) =>
        columnGutter ? columnGutter : GUTTER_BASE}px;
    grid-row-gap: ${({ rowGutter }) => (rowGutter ? rowGutter : '0')}px;
    margin-left: ${size.xlarge};
    margin-right: ${size.xlarge};
`;

const StyledGridColumn = styled.div<GridColumnProps>`
    @media ${screenSize.upToLarge} {
        grid-column: span
            ${({ tabletColumns }) =>
                tabletColumns ? tabletColumns : BASE_GRID_TABLET};
        grid-row-end: span
            ${({ tabletRows }) => (tabletRows ? tabletRows : '1')};
    }
    @media ${screenSize.upToMedium} {
        grid-column: span
            ${({ phoneColumns }) =>
                phoneColumns ? phoneColumns : BASE_GRID_PHONE};
        grid-row-end: span ${({ phoneRows }) => (phoneRows ? phoneRows : '1')};
    }
    grid-column: span
        ${({ desktopColumns }) =>
            desktopColumns ? desktopColumns : BASE_GRID_DESKTOP};
    grid-row-end: span ${({ desktopRows }) => (desktopRows ? desktopRows : '1')};
    width: 100%;
`;

export default StyledGrid;
export { StyledGridColumn };
