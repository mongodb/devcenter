import React, { useState } from 'react';
import useSWR, { Fetcher } from 'swr';

import {
    TextInput,
    Select,
    ESystemIconNames,
    TypographyScale,
} from '@mdb/flora';

import { ContentPiece } from '../interfaces/content-piece';

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

const dataStyles = {
    ...resultsStyles,
    display: 'flex',
    flexDirection: 'column' as 'column', // theme-ui is weird about this.
    alignItems: 'start',
    width: '100%',
};

interface IsortByOptions {
    [key: string]: string;
}

const sortByOptions: IsortByOptions = {
    'Most Recent': 'recent',
    'Most Popular': 'popular',
    'Highest Rated': 'rated',
};

const contentPieces: ContentPiece[] = [
    { name: 'Some Article', description: 'Description of the article.' },
    { name: 'Some Podcast', description: 'Description of the podcase.' },
    { name: 'Some How To', description: 'Description of the how to.' },
];

const fetcher: Fetcher<ContentPiece[], string> = queryString =>
    fetch('whateverOurLambdaSearchFunctionIs').then(res => contentPieces);

const Search: React.FunctionComponent<SearchProps> = ({
    name,
    sortByVisible = false,
}) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState('rated');

    const { data, error, isValidating } = useSWR(
        `?search=${search}&sort=${sortBy}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    const ResultsSection = () =>
        data ? (
            <div sx={dataStyles}>
                {data.map(piece => (
                    <div key={piece.name}>
                        <TypographyScale variant="heading6">
                            {piece.name}
                        </TypographyScale>
                        <TypographyScale variant="body2">
                            {piece.description}
                        </TypographyScale>
                    </div>
                ))}
            </div>
        ) : error ? (
            <div sx={errorStyles}>Could not load results</div>
        ) : isValidating ? (
            <div sx={loadingStyles}>Loading...</div>
        ) : null;

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
            <ResultsSection />
        </>
    );
};

export default Search;
