import { useState } from 'react';
import { ESystemIconNames, TextInput } from '@mdb/flora';
import { SearchBoxProps } from './types';
import { searchBoxStyles } from './styles';
import { useEffect } from 'react';

/*
    This is a workaround due to a shortcoming of flora's TextInput component.
    TextInput isn't able to act as a fully controlled component, so the only
    way to clear it is by passing a key prop which effectively force-rerenders it.
    However, if the key is always passed, it will be rerendered on every search.
    Therefore, the idea here is to "flicker" the key value on and off to reset
    and facilitate the back button clearing the search input in the 404 state,
    while also preventing rerender on every search
*/

const useResetKey = (searchString?: string) => {
    const [searchStringReset, setSearchStringReset] = useState(false);

    useEffect(() => {
        if (searchString === '') {
            setSearchStringReset(true);
        }
    }, [searchString]);

    useEffect(() => {
        setSearchStringReset(false);
    }, [searchStringReset]);

    // Flicker the key value on mount to populate sitewide search field initially
    useEffect(() => {
        setSearchStringReset(true);
    }, []);

    return searchStringReset ? { key: searchString } : {};
};

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
                // The below line allows the back button on no resutls to clear the
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
