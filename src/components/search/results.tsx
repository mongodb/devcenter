import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, TypographyScale } from '@mdb/flora';

import { ResultsProps } from './types';
import { dataStyles, resultsStyles } from './styles';

import Card, { getCardProps } from '../card';

import { getURLPath } from '../../utils/format-url-path';
import { DEFAULT_PAGE_SIZE } from './utils';
import { hasEmptyFilterAndQuery } from '../../hooks/search/utils';

const DefaultNoResultsFooter = <TypographyScale>No Results</TypographyScale>;

// TODO: This isn't being memoized correctly.
const SearchResults: React.FunctionComponent<ResultsProps> = ({
    results = [],
    isValidating,
    error,
    updatePageMeta = () => null,
    searchString,
    filters,
    sortBy,
    slug,
    pageNumber,
    noResultsFooter = DefaultNoResultsFooter,
    layout = 'list',
    extraStyles = {},
}) => {
    const maxPage = Math.ceil(Math.max(results.length, 1) / DEFAULT_PAGE_SIZE);

    // Some of this pagination logic will have to be moved
    // to useSearch when the backend rebuild is completed
    const [startPage, setStartPage] = useState(pageNumber);
    const [currentPage, setCurrentPage] = useState(pageNumber);

    const showLoadMoreButton = currentPage < maxPage;
    const resultsToShow = results.slice(
        (startPage - 1) * DEFAULT_PAGE_SIZE,
        currentPage * DEFAULT_PAGE_SIZE
    );

    const loadMoreHref = hasEmptyFilterAndQuery(searchString, filters)
        ? `/developer${slug}/?page=${currentPage + 1}`
        : '#';

    useEffect(() => {
        if (!hasEmptyFilterAndQuery(searchString, filters) || sortBy) {
            setStartPage(1);
            setCurrentPage(1);
        }
    }, [pageNumber, filters, searchString, sortBy]);

    useEffect(() => {
        setCurrentPage(startPage);
    }, [results]);

    const onLoadMore = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setCurrentPage(currentPage + 1);

        // If search query and filters are empty, then assume
        // we are traversing all content with pagination.
        if (hasEmptyFilterAndQuery(searchString, filters)) {
            updatePageMeta(currentPage + 1);
        }
    };

    const extraCardStyles =
        layout === 'list' ? { width: '100%' } : { height: '100%' };

    return (
        <div
            sx={{
                ...resultsStyles,
                ...extraStyles,
            }}
        >
            {isValidating && (
                <Image
                    alt="Loading..."
                    width={116}
                    height={116}
                    src={getURLPath('/loading-animation.gif', false) as string}
                    sx={{
                        marginTop: 'inc100',
                    }}
                />
            )}

            {!isValidating && (
                <>
                    {error && <div>Something went wrong, please try again</div>}
                    {!error && (
                        <>
                            {!!resultsToShow.length && (
                                // Needs to be wrapped in a div because Safari isn't the best with grid...
                                // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
                                <div sx={{ width: '100%' }}>
                                    <div
                                        data-testid="search-results"
                                        sx={dataStyles(layout)}
                                    >
                                        {resultsToShow.map(item => {
                                            console.log(item);
                                            return (
                                                <Card
                                                    key={item.slug}
                                                    sx={extraCardStyles}
                                                    hideTagsOnMobile={
                                                        layout === 'list'
                                                    }
                                                    {...getCardProps(
                                                        item,
                                                        layout === 'list'
                                                            ? 'list'
                                                            : 'medium'
                                                    )}
                                                />
                                            );
                                        })}
                                    </div>

                                    {showLoadMoreButton && (
                                        <div
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: [
                                                    'inc70',
                                                    null,
                                                    'inc90',
                                                ],
                                            }}
                                        >
                                            {!isValidating && results && (
                                                <a
                                                    href={loadMoreHref}
                                                    onClick={onLoadMore}
                                                >
                                                    <Button variant="secondary">
                                                        Load more
                                                    </Button>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {!resultsToShow.length && (
                                <div
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <div>
                                        <Image
                                            src={
                                                getURLPath(
                                                    '/no-results.png',
                                                    false
                                                ) as string
                                            }
                                            alt="No Results"
                                            height={500}
                                            width={500}
                                        />
                                    </div>
                                    {noResultsFooter}
                                </div>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    );
};

SearchResults.displayName = 'SearchResults';

export default SearchResults;
