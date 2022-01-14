import { ElementType } from 'react';

type columnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type alignment = 'start' | 'center' | 'end' | 'initial';

export interface GridProps {
    as?: ElementType<any> & string; // The element you want the grid to be.
    id?: string;
    className?: string;
    children: React.ReactNode;
    columnGutter?: number; // Override the default value of 16px for space between columns.
    rowGutter?: number; // Override the default value of 0px for space between rows.
    verticalAlign?: alignment; // Passes 'align-items' attribute to the grid.
    horizontalAlign?: alignment; // Passes 'justify-items' attribute to the grid.
}

export interface GridColumnProps {
    as?: string;
    children: React.ReactNode;
    phoneColumns?: columnCount; // Override default columns (4) for phone screens.
    tabletColumns?: columnCount; // Override default columns (8) for phone screens.
    desktopColumns?: columnCount; // Override default columns (12) for phone screens.
}
