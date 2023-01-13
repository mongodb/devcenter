import { ESystemIconNames, TextInput } from '@mdb/flora';
import { SearchBoxProps } from './types';
import { searchBoxStyles } from './styles';
import { useResetKey } from './utils';

const SearchBox: React.FunctionComponent<SearchBoxProps> = ({
    searchString,
    onSearch,
    placeholder = '',
    extraStyles = {},
    autoFocus,
}) => {
    const resetKeyProps = useResetKey(searchString);

    return (
        <div
            sx={{
                ...searchBoxStyles,
                ...extraStyles,
            }}
        >
            <TextInput
                {...resetKeyProps}
                name="search-text-input"
                label={placeholder}
                iconName={ESystemIconNames.SEARCH}
                onChange={onSearch}
                value={searchString}
                autoFocus={autoFocus}
            />
        </div>
    );
};

export default SearchBox;
