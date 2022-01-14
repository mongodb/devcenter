import StyledGrid, { StyledGridColumn } from '../styled/grid';
import { GridProps } from '../interfaces/components/grid';

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

export default Grid;
export { StyledGridColumn as GridColumm }; // All the functionality is in the styling, so just pass this on.
