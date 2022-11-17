import { Select } from '@mdb/flora';
import { sortBoxStyles } from './styles';
import { defaultSortByType, SortBoxProps } from './types';
import { sortByOptions } from './utils';

const SortBox: React.FunctionComponent<SortBoxProps> = ({
    onSort,
    sortBy,
    extraStyles = {},
}) => (
    <Select
        sx={{
            ...sortBoxStyles,
            ...extraStyles,
        }}
        label="Sort by"
        name="sort-by-dropdown"
        options={Object.keys(sortByOptions)}
        value={sortBy || defaultSortByType}
        onSelect={onSort}
    />
);

export default SortBox;
