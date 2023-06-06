import { Select } from '@mdb/flora';
import { sortBoxStyles } from './styles';
import { defaultSortByType, SortBoxProps, SortByType } from './types';
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
        // 'Closest Upcoming' is reserved for events.
        options={Object.keys(sortByOptions).filter(
            mode => mode !== 'Closest Upcoming'
        )}
        value={sortBy || defaultSortByType}
        onSelect={(value?: string) => onSort((value || '') as SortByType)}
    />
);

export default SortBox;
