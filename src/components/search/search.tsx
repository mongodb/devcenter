import React, { useState } from 'react';
import useSWRInfinite from 'swr/infinite';

import {
    Button,
    TextInput,
    Select,
    ESystemIconNames,
    TypographyScale,
} from '@mdb/flora';

import { ContentPiece } from '../../interfaces/content-piece';

import Results from './results';
import {
    titleStyles,
    searchBoxStyles,
    sortBoxStyles,
    loadMoreStyles,
} from './styles';
import { SearchProps, SortByType } from './types';
import { fetcher, sortByOptions } from './utils';

const Search: React.FunctionComponent<SearchProps> = ({
    name,
    hideSortBy = false,
    filters = [],
}) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortByType>('recent');

    const getKey = (pageIndex: number, previousPageData: ContentPiece[]) => {
        if (previousPageData && !previousPageData.length) return null;
        return `?search=${search}&sort=${sortBy}&page=${pageIndex}&filters=${filters.join(
            ','
        )}`;
    };
    const { data, size, setSize, error, isValidating } = useSWRInfinite(
        getKey,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
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
                    onChange={val => {
                        setSize(1);
                        setSearch(val.target.value);
                    }}
                />
            </div>
            {!hideSortBy && (
                <Select
                    sx={sortBoxStyles}
                    label="Sort by"
                    name="sort-by-box"
                    options={Object.keys(sortByOptions)}
                    value={sortByOptions[sortBy]}
                    onSelect={val => {
                        setSize(1);
                        setSortBy(sortByOptions[val] as SortByType);
                    }}
                    width="100%"
                />
            )}
            <Results data={data} isLoading={isValidating} hasError={error} />
            <div sx={loadMoreStyles}>
                <Button onClick={() => setSize(size + 1)} variant="secondary">
                    Load more
                </Button>
            </div>
        </>
    );
};

export default Search;
