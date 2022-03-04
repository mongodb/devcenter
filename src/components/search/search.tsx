import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import useSWRInfinite from 'swr/infinite';

import {
    Button,
    TextInput,
    Select,
    ESystemIconNames,
    TypographyScale,
    GridLayout,
} from '@mdb/flora';

import { ContentPiece } from '../../interfaces/content-piece';

import {
    titleStyles,
    searchBoxStyles,
    sortBoxStyles,
    loadMoreStyles,
} from './styles';
import { SearchProps, SortByType } from './types';
import { fetcher, sortByOptions } from './utils';

const DynamicResults = dynamic(() => import('./results'), {
    loading: () => <p>...</p>,
});

const Search: React.FunctionComponent<SearchProps> = ({
    name,
    hideSortBy = false,
    filters = [],
}) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortByType>('recent');
    const [showResults, setShowResults] = useState(false);

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

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSize(1);
        setSearch(event.target.value);
        setShowResults(true);
    };
    const onSort = (val: string) => {
        setSize(1);
        setSortBy(sortByOptions[val] as SortByType);
        setShowResults(true);
    };

    return (
        <form role="search" sx={{ padding: ['inc40', null, 'inc50', 'inc70'] }}>
            <GridLayout sx={{ rowGap: 0 }}>
                <TypographyScale variant="heading5" sx={titleStyles}>
                    All {name} Content
                </TypographyScale>
                <div sx={searchBoxStyles}>
                    <TextInput
                        name="search-text-input"
                        label={`Search ${name} Content`}
                        iconName={ESystemIconNames.SEARCH}
                        value={search}
                        onChange={onSearch}
                    />
                </div>
                {!hideSortBy && (
                    <Select
                        sx={sortBoxStyles}
                        label="Sort by"
                        name="sort-by-dropdown"
                        options={Object.keys(sortByOptions)}
                        value={sortByOptions[sortBy]}
                        onSelect={onSort}
                        width="100%"
                    />
                )}
                {showResults && (
                    <>
                        <DynamicResults
                            data={data}
                            isLoading={isValidating}
                            hasError={error}
                        />
                        <div sx={loadMoreStyles}>
                            {!isValidating && data && (
                                <Button
                                    onClick={() => setSize(size + 1)}
                                    variant="secondary"
                                >
                                    Load more
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </GridLayout>
        </form>
    );
};

export default Search;
