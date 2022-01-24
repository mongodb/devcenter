import StyledGrid, { StyledGridColumn } from '../styled/grid';
import { GridColumnProps, GridProps } from '../interfaces/components/grid';
/**
 * Component used to create a grid for its child components.
 * @param props.as (optional) -  The type of tag that the grid element will be.
 * @param props.children - Child components of this component (can be passed inside this component).
 * @param props.columnGutter (optional) -  Overrides the default value of 16px for space between columns.
 * @param props.rowGutter (optional) -  Overrides the default value of 0px for space between rows.
 * @param props.verticalAlign (optional) -  Pass this 'align-items' attribute to the grid element.
 * @param props.horizontalAlign (optional) -  Passes this as 'justify-items' attribute to the grid element.
 * @param props.className (optional) -  Passes this as 'className' to the grid element.
 * @param props.id (optional) - Passes this as 'id' to the grid element.
 */
const Grid = ({
    as,
    children,
    columnGutter,
    rowGutter,
    verticalAlign,
    horizontalAlign,
    className,
    id,
}: GridProps) => (
    <StyledGrid
        as={as}
        id={id}
        className={className}
        columnGutter={columnGutter}
        rowGutter={rowGutter}
        verticalAlign={verticalAlign}
        horizontalAlign={horizontalAlign}
    >
        {children}
    </StyledGrid>
);

/**
 * Component used to create a grid column to be used as a child of the Grid component.
 * @param props.as (optional) -  The type of tag that the grid element will be.
 * @param props.children - Child components of this component (can be passed inside this component).
 * @param props.phoneColumns (optional) - Override default columns (4) that this component spans for phone screens.
 * @param props.tabletColumns (optional) - Override default columns (8) that this component spans for tablet screens.
 * @param props.desktopColumns (optional) - Override default columns (12) that this component spans for desktop screens.
 * @param props.phoneRows (optional) - Set how many rows tall this column is for phone screens (default is 1).
 * @param props.tabletRows (optional) - Set how many rows tall this column is for tablet screens (default is 1).
 * @param props.desktopRows (optional) - Set how many rows tall this column is for desktop screens (default is 1).
 */
const GridColumn = ({
    as,
    children,
    phoneColumns,
    tabletColumns,
    desktopColumns,
    phoneRows,
    tabletRows,
    desktopRows,
}: GridColumnProps) => (
    <StyledGridColumn
        as={as}
        phoneColumns={phoneColumns}
        tabletColumns={tabletColumns}
        desktopColumns={desktopColumns}
        phoneRows={phoneRows}
        tabletRows={tabletRows}
        desktopRows={desktopRows}
    >
        {children}
    </StyledGridColumn>
);

export default Grid;
export { GridColumn };
