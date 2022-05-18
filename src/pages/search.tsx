import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import debounce from 'lodash.debounce';
import NextImage from 'next/image';
import {
    GridLayout,
    TextInput,
    ESystemIconNames,
    Button,
    Link,
    TypographyScale,
} from '@mdb/flora';
import useSWR from 'swr';

import Hero from '../components/hero';
import { DesktopFilters, MobileFilters } from '../components/search-filters';
import { pageWrapper } from '../styled/styles';

import { FilterItem } from '../components/search-filters';
import { fetcher } from '../components/search/utils';
import { getFilters } from '../page-templates/content-type/utils';
import {
    resultsStringAndTagsStyles,
    desktopFiltersStyles,
} from '../page-templates/content-type/styles';
import { searchBoxStyles } from '../components/search/styles';
import FilterTag from '../page-templates/content-type/filter-tag';

import { Tag } from '../interfaces/tag';
import noResults from '../../public/no-results.png';
import Results from '../components/search/results';
import { useRouter } from 'next/router';

export interface SearchProps {
    l1Items: FilterItem[];
    languageItems: FilterItem[];
    technologyItems: FilterItem[];
    contributedByItems: FilterItem[];
    contentTypeItems: FilterItem[];
    expertiseLevelItems: FilterItem[];
}

const Search: NextPage<SearchProps> = ({
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
    contentTypeItems,
    expertiseLevelItems,
}) => {
    const router = useRouter();
    const { isReady, query } = router;

    const [allFilters, setAllFilters] = useState<FilterItem[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [resultstoShow, setResultsToShow] = useState<number>(10);
    const { data, error, isValidating } = useSWR(
        () => `s=${searchString}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );
    const [filterTagsExpanded, setFilterTagsExpanded] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Populate the search/filters with query params on page load/param change.
    useEffect(() => {
        if (isReady) {
            const {
                s,
                product,
                language,
                technology,
                contributedBy,
                contentType,
                expertiseLevel,
            } = query;
            if (s && typeof s === 'string' && s !== searchString) {
                setSearchString(s);
            }
            let allNewFilters: FilterItem[] = [];
            if (product) {
                // Gotta look for L1s and L2s that match.
                const products =
                    typeof product === 'object' ? product : [product];
                let productFilters: FilterItem[] = [];

                products.forEach(prod => {
                    const filterProduct = l1Items.find(
                        l1 =>
                            l1.name === prod ||
                            l1.subItems.find(l2 => l2.name === prod)
                    );
                    if (filterProduct) {
                        if (filterProduct.name !== prod) {
                            // This means it's an L2 match.
                            productFilters.push(
                                filterProduct.subItems.find(
                                    l2 => l2.name === prod
                                ) as FilterItem
                            );
                        } else {
                            productFilters.push(filterProduct);
                        }
                    }
                });
                allNewFilters = allNewFilters.concat(productFilters);
            }
            if (contentType) {
                // Gotta look for content types and dig down into the subcategories of Code Examples.
                const contentTypes =
                    typeof contentType === 'object'
                        ? contentType
                        : [contentType];
                let contentTypeFilters: FilterItem[] = [];

                contentTypes.forEach(ct => {
                    const filterContentType = contentTypeItems.find(
                        l1 =>
                            l1.name === ct ||
                            l1.subItems.find(l2 => l2.name === ct)
                    );
                    if (filterContentType) {
                        if (filterContentType.name !== ct) {
                            // This means it's an L2 match.
                            contentTypeFilters.push(
                                filterContentType.subItems.find(
                                    l2 => l2.name === ct
                                ) as FilterItem
                            );
                        } else {
                            contentTypeFilters.push(filterContentType);
                        }
                    }
                });
                allNewFilters = allNewFilters.concat(contentTypeFilters);
            }
            // For the rest, just map it to the corresponding item.
            if (language) {
                // Technically can either come in as a string of a string[], so convert to a string[]
                // and loop over by default.
                const languages =
                    typeof language === 'object' ? language : [language];
                const languageFilters = languageItems.filter(lang =>
                    languages.includes(lang.name)
                );
                allNewFilters = allNewFilters.concat(languageFilters);
            }
            if (technology) {
                const technologies =
                    typeof technology === 'object' ? technology : [technology];
                const technologyFilters = technologyItems.filter(tech =>
                    technologies.includes(tech.name)
                );
                allNewFilters = allNewFilters.concat(technologyFilters);
            }
            if (contributedBy) {
                const contributedBys =
                    typeof contributedBy === 'object'
                        ? contributedBy
                        : [contributedBy];
                const contributedByFilters = contributedByItems.filter(
                    contrib => contributedBys.includes(contrib.name)
                );
                allNewFilters = allNewFilters.concat(contributedByFilters);
            }
            if (expertiseLevel) {
                const expertiseLevels =
                    typeof expertiseLevel === 'object'
                        ? expertiseLevel
                        : [expertiseLevel];
                const expertiseLevelFilters = expertiseLevelItems.filter(exp =>
                    expertiseLevels.includes(exp.name)
                );
                allNewFilters = allNewFilters.concat(expertiseLevelFilters);
            }
            setAllFilters(allNewFilters);
        }
    }, [isReady]); // Missing query dependency, but that's ok because we only need this on first page load.

    const onFilter = useCallback((filters: FilterItem[]) => {
        setResultsToShow(10);
        setAllFilters(filters);
        const product = filters
            .filter(
                filter =>
                    filter.type === 'L1Product' || filter.type === 'L2Product'
            )
            .map(filter => filter.name);
        const language = filters
            .filter(filter => filter.type === 'ProgrammingLanguage')
            .map(filter => filter.name);
        const technology = filters
            .filter(filter => filter.type === 'Technology')
            .map(filter => filter.name);
        const contentType = filters
            .filter(
                filter =>
                    filter.type === 'ContentType' || filter.type === 'CodeLevel'
            )
            .map(filter => filter.name);
        const contributedBy = filters
            .filter(filter => filter.type === 'AuthorType')
            .map(filter => filter.name);
        const expertiseLevel = filters
            .filter(filter => filter.type === 'ExpertiseLevel')
            .map(filter => filter.name);

        const query = {
            s: searchString,
            product,
            language,
            technology,
            contentType,
            contributedBy,
            expertiseLevel,
        };
        router.replace({ pathname: '/search', query }, undefined, {
            scroll: false,
            shallow: true,
        });
    }, []);

    const clearFilters = () => {
        onFilter([]);
    };

    const onSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setResultsToShow(10);
        setSearchString(event.target.value);
        // Have to preserve the filters here as well.
        const product = allFilters
            .filter(
                filter =>
                    filter.type === 'L1Product' || filter.type === 'L2Product'
            )
            .map(filter => filter.name);
        const language = allFilters
            .filter(filter => filter.type === 'ProgrammingLanguage')
            .map(filter => filter.name);
        const technology = allFilters
            .filter(filter => filter.type === 'Technology')
            .map(filter => filter.name);
        const contentType = allFilters
            .filter(
                filter =>
                    filter.type === 'ContentType' || filter.type === 'CodeLevel'
            )
            .map(filter => filter.name);
        const contributedBy = allFilters
            .filter(filter => filter.type === 'AuthorType')
            .map(filter => filter.name);
        const expertiseLevel = allFilters
            .filter(filter => filter.type === 'ExpertiseLevel')
            .map(filter => filter.name);

        router.replace(
            {
                pathname: '/search',
                query: {
                    s: event.target.value,
                    product,
                    language,
                    technology,
                    contentType,
                    contributedBy,
                    expertiseLevel,
                },
            },
            undefined,
            { scroll: false, shallow: true }
        );
    };

    const debouncedOnSearch = useMemo(
        () => debounce(onSearch, 400), // Not sure what this value should be.
        [allFilters]
    );
    // Stop the invocation of the debounced function
    // after unmounting
    useEffect(() => {
        return () => {
            debouncedOnSearch.cancel();
        };
    }, []);

    const onFilterTabClose = (filterTag: FilterItem) => {
        const newFilters = allFilters.filter(filter => filter !== filterTag);
        onFilter(newFilters);
    };

    const hasFiltersSet = !!allFilters.length;

    const tagInFilters = (tag: Tag) => {
        return allFilters.some(
            filter => filter.name === tag.name && filter.type === tag.type
        );
    };

    const filteredData = (() => {
        if (!data) {
            return [];
        } else if (!hasFiltersSet) {
            return data;
        } else {
            return data.filter(({ tags }) => {
                return tags.some(tag => tagInFilters(tag));
            });
        }
    })();

    const numberOfResults = filteredData.length;
    const shownData = filteredData.slice(0, resultstoShow);
    const fullyLoaded = resultstoShow >= numberOfResults;

    ///////////////////////////////////////
    // COMPUTED ELEMENTS
    ///////////////////////////////////////
    if (allFilters.length <= 5 && filterTagsExpanded) {
        setFilterTagsExpanded(false);
    }

    const emptyState = (
        <div
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <div>
                <NextImage src={noResults}></NextImage>
            </div>
            <Button
                hasIcon={true}
                iconName={ESystemIconNames.ARROW_LEFT}
                iconPosition="left"
                onClick={() => {
                    setAllFilters([]);
                    setSearchString('');
                }}
            >
                Back to all content
            </Button>
        </div>
    );

    const filterTags = (
        <div
            sx={{
                gap: 'inc30',
                flexWrap: 'wrap',
                display: ['none', null, null, 'flex'],
            }}
        >
            {allFilters.length > 5 ? (
                filterTagsExpanded ? (
                    <>
                        {allFilters.map(filter => (
                            <FilterTag
                                key={`${filter.name} ${filter.type}`}
                                filter={filter}
                                closeIcon={true}
                                onClick={onFilterTabClose}
                            />
                        ))}
                        <FilterTag
                            filter={{
                                name: 'Show less',
                                count: 0,
                                subItems: [],
                            }}
                            onClick={() => setFilterTagsExpanded(false)}
                        />
                    </>
                ) : (
                    <>
                        {allFilters.slice(0, 5).map(filter => (
                            <FilterTag
                                key={`${filter.name} ${filter.type}`}
                                filter={filter}
                                closeIcon={true}
                                onClick={onFilterTabClose}
                            />
                        ))}
                        <FilterTag
                            filter={{
                                name: `+${allFilters.length - 5}`,
                                count: 0,
                                subItems: [],
                            }}
                            onClick={() => setFilterTagsExpanded(true)}
                        />
                    </>
                )
            ) : (
                allFilters.map(filter => (
                    <FilterTag
                        key={`${filter.name} ${filter.type}`}
                        filter={filter}
                        closeIcon={true}
                        onClick={onFilterTabClose}
                    />
                ))
            )}
            <Link onClick={clearFilters}>Clear all filters</Link>
        </div>
    );

    const resultsStringAndTags = (
        <div sx={resultsStringAndTagsStyles}>
            {(data || isValidating) && (
                <TypographyScale variant="heading5">
                    {!allFilters.length && !searchString
                        ? 'All Content'
                        : isValidating
                        ? ''
                        : numberOfResults === 1
                        ? '1 Result'
                        : `${numberOfResults} Results`}
                    {!isValidating && !!searchString && !allFilters.length
                        ? ` for "${searchString}"`
                        : ''}
                </TypographyScale>
            )}
            {hasFiltersSet && filterTags}
            <div
                sx={{
                    display: ['block', null, null, 'none'],
                    width: ['100%', null, 'unset'],
                    '&>div': { width: '100%' },
                }}
            >
                <Button
                    sx={{
                        justifyContent: 'center',
                    }}
                    iconName={ESystemIconNames.FILTER_HAMBURGER}
                    iconStrokeWeight="medium"
                    hasIcon={true}
                    iconPosition="right"
                    onClick={() => setMobileFiltersOpen(true)}
                >
                    Filter{!!allFilters.length && ` (${allFilters.length})`}
                </Button>
            </div>
        </div>
    );

    return (
        <>
            <Hero name="Search" />
            <div sx={pageWrapper}>
                <GridLayout
                    sx={{
                        rowGap: 0,
                    }}
                >
                    <DesktopFilters
                        sx={desktopFiltersStyles}
                        onFilter={onFilter}
                        allFilters={allFilters}
                        l1Items={l1Items}
                        languageItems={languageItems}
                        technologyItems={technologyItems}
                        contributedByItems={contributedByItems}
                        contentTypeItems={contentTypeItems}
                        expertiseLevelItems={expertiseLevelItems}
                    />
                    <div
                        sx={{
                            gridColumn: ['span 6', null, 'span 8', 'span 9'],
                        }}
                    >
                        <div sx={searchBoxStyles}>
                            <TextInput
                                // The key prop will force it to rerender on external searchString changes.
                                key={searchString}
                                name="search-text-input"
                                label="Search All"
                                iconName={ESystemIconNames.SEARCH}
                                value={searchString}
                                onChange={debouncedOnSearch}
                                autoFocus={true}
                            />
                        </div>
                        {resultsStringAndTags}
                        {!!filteredData.length || isValidating || error ? (
                            <>
                                <Results
                                    data={shownData}
                                    isLoading={isValidating}
                                    hasError={error}
                                />
                                {!fullyLoaded && (
                                    <div
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            marginTop: ['inc70', null, 'inc90'],
                                        }}
                                    >
                                        {!isValidating && data && (
                                            <Button
                                                onClick={() =>
                                                    setResultsToShow(
                                                        resultstoShow + 10
                                                    )
                                                }
                                                variant="secondary"
                                            >
                                                Load more
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </>
                        ) : (
                            emptyState
                        )}
                    </div>
                </GridLayout>
            </div>
            {mobileFiltersOpen && (
                <MobileFilters
                    onFilter={onFilter}
                    allFilters={allFilters}
                    l1Items={l1Items}
                    languageItems={languageItems}
                    technologyItems={technologyItems}
                    contributedByItems={contributedByItems}
                    contentTypeItems={contentTypeItems}
                    expertiseLevelItems={expertiseLevelItems}
                    closeModal={() => setMobileFiltersOpen(false)}
                />
            )}
        </>
    );
};

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
    // Pop contentTypeItems out of here becasue we don't filter by it for these pages.
    const filters = await getFilters();

    return {
        props: filters,
    };
};

export default Search;
