import { Select } from '@mdb/flora';
import { sortBoxStyles } from './styles';
import { defaultSortByType, SortBoxProps, SortByType } from './types';

const SortBox: React.FunctionComponent<SortBoxProps> = ({
    onSort,
    sortBy,
    extraStyles = {},
    contentType,
}) => {
    let options: SortByType[] = ['Newest', 'Highest Rated'];
    let defaultSort: SortByType = defaultSortByType;

    if (contentType === 'Video') {
        options = ['Upcoming', 'Recently Aired', 'Highest Rated'];
        defaultSort = 'Upcoming';
    }

    return (
        <Select
            sx={{
                ...sortBoxStyles,
                ...extraStyles,
            }}
            label="Sort by"
            name="sort-by-dropdown"
            options={options}
            value={sortBy || defaultSort}
            onSelect={(value?: string) => onSort((value || '') as SortByType)}
        />
    );
};

export default SortBox;
