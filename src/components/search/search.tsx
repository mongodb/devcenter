import React, { useState } from 'react';
import NextImage from 'next/image';
import useSWR from 'swr';

import {
    Button,
    TextInput,
    ESystemIconNames,
    TypographyScale,
    Checkbox,
} from '@mdb/flora';

import { titleStyles, searchBoxStyles, linkStyleOverride } from './styles';
import { SearchProps } from './types';
import { fetcher } from './utils';
import Results from './results';
import ExpandingLink from '../expanding-link';

import noResults from '../../../public/no-results.png';

const Search: React.FunctionComponent<SearchProps> = ({
    className,
    tagSlug = '',
    contentType = '',
    title,
    resultsLayout = 'list',
    titleLink,
}) => {
    const [searchString, setSearchString] = useState('');
    const [resultsToShow, setResultsToShow] = useState(10);

    const [codeLevelFilters, setCodeLevelFilters] = useState<string[]>([]);

    const { data, error, isValidating } = useSWR(
        () =>
            `s=${searchString}&contentType=${contentType}&tagSlug=${encodeURIComponent(
                tagSlug
            )}`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResultsToShow(10);
        setSearchString(event.target.value);
    };

    const onCheckToggle = (checked: boolean, filter: string) => {
        if (checked) {
            setCodeLevelFilters([...codeLevelFilters, filter]);
        } else {
            setCodeLevelFilters(
                codeLevelFilters.filter(filt => filt !== filter)
            );
        }
    };

    const resultsData = data || [];
    const filteredResultsData =
        contentType === 'Code Example' && !!codeLevelFilters.length
            ? resultsData.filter(item =>
                  item.tags.find(
                      tag =>
                          tag.type === 'CodeLevel' &&
                          codeLevelFilters.includes(tag.name)
                  )
              )
            : resultsData;
    const numberOfResults = filteredResultsData.length;
    const shownData = resultsData.slice(0, resultsToShow);
    const fullyLoaded = resultsToShow >= numberOfResults;

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
            <TypographyScale>No Results</TypographyScale>
        </div>
    );

    // To compensate for the Code Level filters.
    const extraSearchBoxStyles =
        contentType === 'Code Example' ? { marginBottom: 0 } : {};

    return (
        <form role="search" className={className}>
            <div sx={titleStyles}>
                <TypographyScale variant="heading5">{title}</TypographyScale>
                {titleLink && (
                    <ExpandingLink
                        {...titleLink}
                        hoverStyleOverrides={linkStyleOverride}
                    />
                )}
            </div>
            <div sx={{ ...searchBoxStyles, ...extraSearchBoxStyles }}>
                <TextInput
                    name="search-text-input"
                    label="Search Content"
                    iconName={ESystemIconNames.SEARCH}
                    value={searchString}
                    onChange={onSearch}
                />
            </div>
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
                        checked={codeLevelFilters.includes('Snippet')}
                    />
                    <Checkbox
                        name="Full Application"
                        label="Full Applications"
                        onToggle={checked =>
                            onCheckToggle(checked, 'Full Application')
                        }
                        checked={codeLevelFilters.includes('Full Application')}
                    />
                </div>
            )}
            <div sx={{}}></div>
            {!!numberOfResults || isValidating || error ? (
                <>
                    <Results
                        data={shownData}
                        isLoading={isValidating}
                        hasError={error}
                        layout={resultsLayout}
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
                                        setResultsToShow(resultsToShow + 10)
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
        </form>
    );
};

export default Search;
