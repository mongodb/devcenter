import { ESystemIconNames, TextInput } from '@mdb/flora';
import { SearchBoxProps } from './types';
import { searchBoxStyles } from './styles';

const SearchBox: React.FunctionComponent<SearchBoxProps> = ({
    searchString,
    onSearch,
    placeholder = '',
    extraStyles = {},
    autoFocus,
}) => (
    <div
        sx={{
            ...searchBoxStyles,
            ...extraStyles,
        }}
    >
        <TextInput
            key={searchString}
            name="search-text-input"
            label={placeholder}
            iconName={ESystemIconNames.SEARCH}
            onChange={onSearch}
            value={searchString}
            autoFocus={autoFocus}
        />
    </div>
);

export default SearchBox;
