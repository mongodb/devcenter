import React, { memo, useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, ESystemIconNames } from '@mdb/flora';

import { ResultsProps } from './types';
import { dataStyles } from './styles';

import Card, { getCardProps } from '../card';

import { getURLPath } from '../../utils/format-url-path';
import { DEFAULT_PAGE_SIZE } from './utils';
import { hasEmptyFilterAndQuery } from '../../hooks/search/utils';

// TODO: This isn't being memoized correctly.
const SearchResults: React.FunctionComponent<ResultsProps> = memo(
    ({
        results = [],
        isValidating,
        error,
        searchString,
        filters,
        slug,
        pageNumber,
        updatePageMeta = () => {},
        onBack,
        contentType,
        layout = 'list',
        extraStyles = {},
    }) => {
        const maxPage = Math.ceil(
            Math.max(results.length, 1) / DEFAULT_PAGE_SIZE
        );
        const [currentPage, setCurrentPage] = useState(
            Math.min(pageNumber, maxPage)
        );
        const showLoadMoreButton = currentPage < maxPage;
        const resultsToShow = results.slice(0, currentPage * DEFAULT_PAGE_SIZE);

        console.log('results slug', slug);
        const loadMoreHref = hasEmptyFilterAndQuery(searchString, filters)
            ? `/developer${slug}/?page=${currentPage}`
            : '#';

        useEffect(() => {
            setCurrentPage(1);
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
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    width: '100%',
                    ...extraStyles,
                }}
            >
                {isValidating && (
                    <Image
                        alt="Loading..."
                        width={116}
                        height={116}
                        src={
                            getURLPath(
                                '/loading-animation.gif',
                                false
                            ) as string
                        }
                        sx={{
                            marginTop: 'inc100',
                        }}
                    />
                )}

                {!isValidating && (
                    <>
                        {error && (
                            <div>Something went wrong, please try again</div>
                        )}
                        {!error && (
                            <>
                                {!!resultsToShow.length && (
                                    // Needs to be wrapped in a div because Safari isn't the best with grid...
                                    // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
                                    <div>
                                        <div
                                            data-testid="search-results"
                                            sx={dataStyles(layout)}
                                        >
                                            {resultsToShow.map(item => (
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
                                            ))}
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
                                        <Button
                                            hasIcon={true}
                                            iconName={
                                                ESystemIconNames.ARROW_LEFT
                                            }
                                            iconPosition="left"
                                            onClick={onBack}
                                        >
                                            Back to all{' '}
                                            {contentType.toLowerCase()}s
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        );
    }
);

SearchResults.displayName = 'SearchResults';

export default SearchResults;
