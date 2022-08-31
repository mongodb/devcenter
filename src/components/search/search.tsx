import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
    Button,
    TextInput,
    ESystemIconNames,
    TypographyScale,
    Checkbox,
    Select,
} from '@mdb/flora';

import {
    titleStyles,
    searchBoxStyles,
    linkStyleOverride,
    sortBoxStyles,
    searchBoxSortBarWrapperStyles,
} from './styles';
import { SearchProps } from './types';
import Results from './results';
import ExpandingLink from '../expanding-link';
import useSearch from '../../hooks/search';
import { createInitialSearchData } from '../../hooks/search/utils';
import EmptyState from './empty-state';
import { sortByOptions, DEFAULT_PAGE_SIZE } from './utils';
import { SearchItem } from './types';
import { Grid } from 'theme-ui';

const Search: React.FunctionComponent<SearchProps> = ({
    titleElement = 'h5',
    className,
    tagSlug = '',
    contentType = '',
    title,
    resultsLayout = 'list',
    titleLink,
    placeholder,
    pageNumber,
    pageSlug,
    updatePageTitle,
    initialSearchContent,
}) => {
    const router = useRouter();
    const totalInitialResults = initialSearchContent
        ? initialSearchContent.length
        : DEFAULT_PAGE_SIZE;
    const initialMaxPage = Math.ceil(totalInitialResults / DEFAULT_PAGE_SIZE);
    const [currentPage, setCurrentPage] = useState(
        pageNumber && pageNumber > initialMaxPage ? initialMaxPage : pageNumber
    );

    const [initialSearchData, setInitialSearchData] = useState(
        createInitialSearchData(
            initialSearchContent as SearchItem[],
            currentPage // page provided by query parameters
        )
    );

    const {
        data,
        error,
        isValidating,
        resultsToShow,
        numberOfResults,
        setResultsToShow,
        size,
        setSize,
        allFilters,
        setAllFilters,
        onSearch,
        searchString,
        fullyLoaded,
        onSort,
        sortBy,
    } = useSearch(pageNumber, contentType, tagSlug, undefined);

    const getResultData = () => {
        return initialSearchData ? initialSearchData : data;
    };

    const getResultIsValidating = () => {
        return initialSearchData ? false : isValidating;
    };

    const clearPagination = () => {
        setInitialSearchData(undefined);
        setCurrentPage(1);
        updatePageTitle(1);

        const query = pageSlug
            ? {
                  slug: pageSlug.slice(1),
              }
            : {};
        router.replace(
            {
                pathname: router.pathname,
                query: query,
            },
            undefined,
            {
                scroll: false,
                shallow: true,
            }
        );
    };

    const onCheckToggle = (checked: boolean, filter: string) => {
        clearPagination();
        if (checked) {
            setAllFilters([
                { name: filter, type: 'CodeLevel', count: 0, subItems: [] },
            ]);
        } else {
            setAllFilters([]);
        }
    };

    const onLoadMore = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault(); // If JS is enabled, do not follow href.

        // If search query and filters are empty, then assume
        // we are traversing all content with pagination.
        if ((!searchString || searchString == '') && allFilters.length == 0) {
            const nextPage = currentPage + 1;

            setCurrentPage(nextPage);
            updatePageTitle(nextPage);

            // Need to pass slug for dynamic pages.
            // https://github.com/vercel/next.js/discussions/8207
            const query = pageSlug
                ? {
                      slug: pageSlug.slice(1),
                      page: nextPage,
                  }
                : { page: nextPage };

            router.replace(
                {
                    pathname: router.pathname,
                    query: query,
                },
                undefined,
                {
                    scroll: false,
                    shallow: true,
                }
            );
        }
        setSize(size + 1);
        setInitialSearchData(undefined);
    };

    const hasInitialData = typeof initialSearchData !== 'undefined';
    const showLoadMoreButton = hasInitialData
        ? currentPage < initialMaxPage
        : !fullyLoaded;
    const isLoading = !hasInitialData ? isValidating : false;

    // To compensate for the Code Level filters.
    const extraSearchBoxStyles =
        contentType === 'Code Example' ? { marginBottom: 0 } : {};

    const path = pageSlug?.join('/');

    return (
        <div role="search" className={className}>
            <div sx={titleStyles}>
                <TypographyScale
                    variant="heading5"
                    customElement={titleElement}
                >
                    {title}
                </TypographyScale>
                {titleLink && (
                    <ExpandingLink
                        {...titleLink}
                        hoverStyleOverrides={linkStyleOverride}
                    />
                )}
            </div>
            <Grid
                columns={[1, null, 8, 3]}
                sx={{ ...searchBoxSortBarWrapperStyles }}
            >
                <div
                    sx={{
                        ...searchBoxStyles,
                        ...extraSearchBoxStyles,
                    }}
                >
                    <TextInput
                        name="search-text-input"
                        label={placeholder}
                        iconName={ESystemIconNames.SEARCH}
                        value={searchString}
                        onChange={e => {
                            clearPagination();
                            onSearch(e);
                        }}
                    />
                </div>
                <Select
                    sx={sortBoxStyles}
                    label="Sort by"
                    name="sort-by-dropdown"
                    options={Object.keys(sortByOptions)}
                    value={sortBy}
                    onSelect={e => {
                        clearPagination();
                        onSort(e);
                    }}
                    width="100%"
                    height="100%"
                />
            </Grid>

            {contentType === 'Code Example' && (
                <div
                    sx={{
                        display: 'flex',
                        gap: 'inc40',
                        marginBottom: ['inc30', null, 'inc70'],
                        marginTop: ['inc30', null, 'inc40'],
                    }}
                >
                    <Checkbox
                        name="Snippet"
                        label="Code Snippets"
                        onToggle={checked => onCheckToggle(checked, 'Snippet')}
                        checked={
                            !!allFilters.find(filt => filt.name === 'Snippet')
                        }
                    />
                    <Checkbox
                        name="Full Application"
                        label="Full Applications"
                        onToggle={checked =>
                            onCheckToggle(checked, 'Full Application')
                        }
                        checked={
                            !!allFilters.find(
                                filt => filt.name === 'Full Application'
                            )
                        }
                    />
                </div>
            )}
            <div sx={{}}></div>
            {!!getResultData().length || getResultIsValidating() || error ? (
                <>
                    <Results
                        data={getResultData()}
                        isLoading={isLoading}
                        hasError={error}
                        layout={resultsLayout}
                    />
                    {showLoadMoreButton && (
                        <div
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: ['inc70', null, 'inc90'],
                            }}
                        >
                            {!getResultIsValidating() && getResultData() && (
                                <a
                                    href={
                                        (!searchString || searchString == '') &&
                                        allFilters.length == 0
                                            ? `/developer${path}/?page=${
                                                  currentPage + 1
                                              }`
                                            : '#'
                                    }
                                    onClick={onLoadMore}
                                >
                                    <Button variant="secondary">
                                        Load more
                                    </Button>
                                </a>
                            )}
                        </div>
                    )}
                </>
            ) : (
                <EmptyState />
            )}
        </div>
    );
};

export default Search;
