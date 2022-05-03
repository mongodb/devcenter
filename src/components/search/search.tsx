import React, { useState } from 'react';
import useSWRInfinite from 'swr/infinite';
import { Grid } from 'theme-ui';

import {
    Button,
    TextInput,
    Select,
    ESystemIconNames,
    TypographyScale,
} from '@mdb/flora';

import {
    titleStyles,
    searchBoxStyles,
    sortBoxStyles,
    loadMoreStyles,
    linkStyleOverride,
} from './styles';
import { SearchProps, SortByType } from './types';
import { fetcher, sortByOptions } from './utils';
import Results from './results';
import ExpandingLink from '../expanding-link';
import { ContentItem } from '../../interfaces/content-item';

const Search: React.FunctionComponent<SearchProps> = ({
    className,
    slug = '',
    contentType = '',
    title,
    hideSortBy = false,
    filters = [],
    resultsLayout = 'list',
    titleLink,
}) => {
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortByType>('recent');

    const getKey = (pageIndex: number, previousPageData: ContentItem[]) => {
        if (previousPageData && !previousPageData.length) return null;
        return `topic=${slug}&contentType=${contentType}&search=${search}&sort=${sortBy}&page=${pageIndex}&filters=${filters.join(
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
    };
    const onSort = (val: string) => {
        setSize(1);
        setSortBy(sortByOptions[val] as SortByType);
    };

    const fullyLoaded =
        data && data.length > 0 && data[data.length - 1].length < 10;

    return (
        <form role="search" className={className}>
            <Grid columns={[6, 6, 8, 12, 9]} sx={{ rowGap: 0 }}>
                <div sx={titleStyles}>
                    <TypographyScale variant="heading5">
                        {title}
                    </TypographyScale>
                    {titleLink && (
                        <ExpandingLink
                            {...titleLink}
                            hoverStyleOverrides={linkStyleOverride}
                        />
                    )}
                </div>
                <div sx={searchBoxStyles}>
                    <TextInput
                        name="search-text-input"
                        label="Search Content"
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
                        height="84px" // Select and TextInput borders function differently...
                    />
                )}

                <Results
                    data={data}
                    isLoading={isValidating}
                    hasError={error}
                    layout={resultsLayout}
                />
                {!fullyLoaded && (
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
                )}
            </Grid>
        </form>
    );
};

export default Search;
