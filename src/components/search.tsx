import React, { useState } from 'react';
import useSWR, { Fetcher } from 'swr';

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

const resultsStyles = {
    gridColumn: '4 / span 9',
    margin: 'auto',
};

const loadingStyles = {
    ...resultsStyles,
};

const errorStyles = {
    ...resultsStyles,
};

interface IsortByOptions {
    [key: string]: string;
}

const sortByOptions: IsortByOptions = {
    'Most Recent': 'recent',
    'Most Popular': 'popular',
    'Highest Rated': 'rated',
};

const fetcher: Fetcher<string, string> = search =>
    fetch('whateverOurLambdaSearchFunctionIs').then(
        res => 'Results: ' + search
    );

const Search: React.FunctionComponent<SearchProps> = ({
    name,
    sortByVisible = false,
}) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('rated');
    const { data, error } = useSWR(
        `/articles?search=${search}&sort=${sortBy}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const Results = () =>
        data ? (
            <div sx={resultsStyles}>{data}</div>
        ) : error ? (
            <div sx={errorStyles}>{error}</div>
        ) : (
            <div sx={loadingStyles}>Loading...</div>
        );

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
                    options={Object.keys(sortByOptions)}
                    value={sortByOptions[sortBy]}
                    onSelect={val => setSortBy(sortByOptions[val])}
                    width="100%"
                />
            )}
            <Results />
        </>
    );
};

export default Search;
