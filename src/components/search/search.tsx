import React from 'react';
import {
    Button,
    TextInput,
    ESystemIconNames,
    TypographyScale,
    Checkbox,
} from '@mdb/flora';

import { titleStyles, searchBoxStyles, linkStyleOverride } from './styles';
import { SearchProps } from './types';
import Results from './results';
import ExpandingLink from '../expanding-link';
import useSearch from '../../hooks/search';
import EmptyState from './empty-state';

const Search: React.FunctionComponent<SearchProps> = ({
    titleElement = 'h5',
    className,
    tagSlug = '',
    contentType = '',
    title,
    resultsLayout = 'list',
    titleLink,
    placeholder,
}) => {
    const {
        data,
        error,
        isValidating,
        resultsToShow,
        numberOfResults,
        setResultsToShow,
        allFilters,
        setAllFilters,
        onSearch,
        searchString,
        fullyLoaded,
    } = useSearch(contentType, tagSlug);

    const onCheckToggle = (checked: boolean, filter: string) => {
        if (checked) {
            setAllFilters([
                { name: filter, type: 'CodeLevel', count: 0, subItems: [] },
            ]);
        } else {
            setAllFilters([]);
        }
    };

    // To compensate for the Code Level filters.
    const extraSearchBoxStyles =
        contentType === 'Code Example' ? { marginBottom: 0 } : {};

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
            <div sx={{ ...searchBoxStyles, ...extraSearchBoxStyles }}>
                <TextInput
                    name="search-text-input"
                    label={placeholder}
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
            {!!numberOfResults || isValidating || error ? (
                <>
                    <Results
                        data={data}
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
                <EmptyState />
            )}
        </div>
    );
};

export default Search;
