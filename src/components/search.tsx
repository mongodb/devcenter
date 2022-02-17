import React, { useState } from 'react';
import useSWR, { Fetcher } from 'swr';

import {
    Button,
    TextInput,
    Select,
    ESystemIconNames,
    TypographyScale,
} from '@mdb/flora';

import { ContentPiece } from '../interfaces/content-piece';

const titleStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
    marginBottom: ['inc30', null, 'inc40'],
};
// TextInput doesn't support styled components, so we have to wrap it.
const searchBoxStyles = {
    gridColumn: ['span 6', null, 'span 5', 'span 8', '4 / span 6'],
    '& > div': {
        width: '100%',
    },
    marginBottom: ['inc30', null, 'inc70'],
};

const sortBoxStyles = {
    gridColumn: ['span 6', null, 'span 3', 'span 4', '10 / span 3'],
    width: '100%',
    marginBottom: ['inc40', null, 'inc70'],
};

const dataStyles = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column' as 'column', // theme-ui is weird about this.
    alignItems: 'center',
    width: '100%',
    gap: ['inc40', null, 'inc50'],
};

const loadMoreStyles = {
    marginTop: ['inc70', null, 'inc90'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', '4 / span 9'],
    mx: 'auto',
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

type SortByType = 'recent' | 'popular' | 'rated';
interface ResultsPageProps {
    pageNumber: number;
    search: string;
    sortBy: SortByType;
}

const ResultsPage: React.FunctionComponent<ResultsPageProps> = ({
    search,
    sortBy,
    pageNumber,
}) => {
    const { data, error, isValidating } = useSWR(
        `?search=${search}&sort=${sortBy}&page=${pageNumber}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    );

    return data ? (
        <>
            {data.map(piece => (
                <div sx={{ width: '100%' }} key={piece.name}>
                    <TypographyScale variant="heading6">
                        {piece.name + ' ' + pageNumber}
                    </TypographyScale>
                    <TypographyScale variant="body2">
                        {piece.description}
                    </TypographyScale>
                </div>
            ))}
        </>
    ) : error ? (
        <div>Could not load results</div>
    ) : isValidating ? (
        <div>Loading...</div>
    ) : null;
};

interface SearchProps {
    name: string;
    sortByVisible?: boolean;
}

const Search: React.FunctionComponent<SearchProps> = ({
    name,
    sortByVisible = false,
}) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortByType>('rated');

    const [pagesCount, setPagesCount] = useState(1);

    const resultsPages: JSX.Element[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        resultsPages.push(
            <ResultsPage search={search} sortBy={sortBy} pageNumber={i} />
        );
    }

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
                    onChange={val => {
                        setPagesCount(1);
                        setSearch(val.target.value);
                    }}
                />
            </div>
            {sortByVisible && (
                <Select
                    sx={sortBoxStyles}
                    label="Sort by"
                    name="sort-by-box"
                    options={Object.keys(sortByOptions)}
                    value={sortByOptions[sortBy]}
                    onSelect={val => {
                        setPagesCount(1);
                        setSortBy(sortByOptions[val] as SortByType);
                    }}
                    width="100%"
                />
            )}
            <div sx={dataStyles}>{resultsPages}</div>
            <div sx={loadMoreStyles}>
                <Button
                    onClick={() => setPagesCount(pagesCount + 1)}
                    variant="secondary"
                    size="large"
                >
                    Load more
                </Button>
            </div>
        </>
    );
};

export default Search;
