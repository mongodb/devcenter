import React, { useState } from 'react';
import {
    TextInput,
    Select,
    ESystemIconNames,
    TypographyScale,
} from '@mdb/flora';

interface SearchProps {
    name: string;
    sortByVisible?: boolean;
}

const titleStyles = {
    gridColumn: '4 / span 9',
    marginBottom: 'inc40',
};
// TextInput doesn't support styled components, so we have to wrap it.
const searchBoxStyles = {
    gridColumn: '4 / span 6',
    marginBottom: 'inc70',
    '& > div': {
        width: '100%',
    },
};

const sortBoxStyles = {
    gridColumn: '10 / span 3',
    width: '100%',
};

const sortByOptions = ['Most Recent', 'Most Popular', 'Highest Rated'];

const Search: React.FunctionComponent<SearchProps> = ({
    name,
    sortByVisible = false,
}) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('Most Recent');

    return (
        <>
            <TypographyScale variant="heading5" sx={titleStyles}>
                All {name} Content
            </TypographyScale>
            <div sx={searchBoxStyles}>
                <TextInput
                    name="search-box"
                    label={`Search ${name} Content`}
                    iconName={ESystemIconNames.SEARCH}
                    value={search}
                    onChange={val => setSearch(val.target.value)}
                />
            </div>
            {sortByVisible && (
                <Select
                    sx={sortBoxStyles}
                    label="Sort by"
                    name="sort-by-box"
                    options={sortByOptions}
                    value={sortBy}
                    onSelect={val => setSortBy(val)}
                    width="100%"
                />
            )}
        </>
    );
};

export default Search;
