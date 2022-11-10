import { useState } from 'react';
import { ESystemIconNames, TextInput } from '@mdb/flora';
import { SearchBoxProps } from './types';
import { searchBoxStyles } from './styles';

const SearchBox: React.FunctionComponent<SearchBoxProps> = ({
    onSearch,
    placeholder = '',
    extraStyles = {},
}) => {
    // Keep track of search box value ourselves instead of in useSearch
    // to avoid lag when typing due to the debouncer
    const [value, setValue] = useState('');

    return (
        <div
            sx={{
                ...searchBoxStyles,
                ...extraStyles,
            }}
        >
            <TextInput
                name="search-text-input"
                label={placeholder}
                iconName={ESystemIconNames.SEARCH}
                value={value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(event.target.value);
                    onSearch(event); // Debounced callback from useSearch() which will execute the search
                }}
            />
        </div>
    );
};

export default SearchBox;
