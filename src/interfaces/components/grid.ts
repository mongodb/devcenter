import { ElementType } from 'react';

type columnCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type alignment = 'start' | 'center' | 'end' | 'initial';

export interface GridProps {
    as?: ElementType<any> & string;
    id?: string;
    className?: string;
    children: React.ReactNode;
    columnGutter?: number;
    rowGutter?: number;
    verticalAlign?: alignment;
    horizontalAlign?: alignment;
}

export interface GridColumnProps {
    as?: ElementType<any> & string;
    children: React.ReactNode;
    phoneColumns?: columnCount;
    tabletColumns?: columnCount;
    desktopColumns?: columnCount;
    phoneRows?: number; // non-negative integer.
    tabletRows?: number; // non-negative integer.
    desktopRows?: number; // non-negative integer.
}
