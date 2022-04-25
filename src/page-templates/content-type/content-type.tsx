import { useState } from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import {
    GridLayout,
    TypographyScale,
    TextInput,
    ESystemIconNames,
    Link,
    Button,
} from '@mdb/flora';

import { PillCategory } from '../../types/pill-category';
import { fetcherv2 } from '../../components/search/utils';
import Results from '../../components/search/results';
import Hero from '../../components/hero';
import RequestContentModal, {
    requestContentModalStages,
} from '../../components/request-content-modal';
import { CTAContainerStyles } from '../../components/hero/styles';

import FilterTag from './filter-tag';
import { FilterItem, DesktopFilters } from '../../components/search-filters';

const languageItems = [
    {
        name: 'C',
        category: 'language',
    },
    {
        name: 'CSharp',
        category: 'language',
    },
    {
        name: 'C++',
        category: 'language',
    },
    {
        name: 'Go',
        category: 'language',
    },
    {
        name: 'Java',
        category: 'language',
    },
    {
        name: 'Javascript',
        category: 'language',
    },
    {
        name: 'Kotlin',
        category: 'language',
    },
    {
        name: 'PHP',
        category: 'language',
    },
    {
        name: 'Python',
        category: 'language',
    },
];

const technologyItems = [
    {
        name: 'Docker',
        category: 'technology',
    },
    {
        name: 'Azure',
        category: 'technology',
    },
    {
        name: 'AWS',
        category: 'technology',
    },
    {
        name: 'GCP',
        category: 'technology',
    },
    {
        name: 'FastAPI',
        category: 'technology',
    },
    {
        name: 'Android',
        category: 'technology',
    },
    {
        name: 'iOS',
        category: 'technology',
    },
];

const expertiseLevelItems = [
    {
        name: 'Introductory',
        category: 'expertise',
    },
    {
        name: 'Expert',
        category: 'expertise',
    },
];

const contributedByItems = [
    {
        name: 'MongoDB',
        category: 'contributed',
    },
    {
        name: 'Community',
        category: 'contributed',
    },
    {
        name: 'Students',
        category: 'contributed',
    },
    {
        name: 'Champions',
        category: 'contributed',
    },
    {
        name: 'Partners',
        category: 'contributed',
    },
];

const atlasItems = [
    {
        name: 'DataAPI',
        category: 'l2',
    },
    {
        name: 'Monitoring',
        category: 'l2',
    },
];

const l1Items = [
    {
        name: 'Atlas',
        subItems: atlasItems,
        category: 'l1',
    },
    {
        name: 'Realm',
        category: 'l1',
    },
];

interface ContentTypePageProps {
    contentType: PillCategory;
}

const filterGroupContainer = {
    gridColumn: ['span 6', null, 'span 8', 'span 3'],
    display: ['none', null, null, 'flex'],
    flexDirection: 'column' as 'column',
    gap: 'inc50',
};

const pageWrapper = {
    paddingBottom: 'inc160',
    px: ['inc40', null, 'inc50', 'inc70'],
    paddingTop: ['inc40', null, 'inc50', 'inc70'],
};

const searchBoxStyles = {
    '& > div': {
        width: '100%',
    },
    marginBottom: ['inc30', null, 'inc70'],
};

const ContentTypePage: NextPage<ContentTypePageProps> = ({ contentType }) => {
    ///////////////////////////////////////
    // HOOKS
    ///////////////////////////////////////
    const [allFilters, setAllFilters] = useState<FilterItem[]>([]);
    const languageFilters = allFilters.filter(
        filter => filter.category === 'language'
    );
    const l1Filters = allFilters.filter(filter => filter.category === 'l1');

    const l2Filters = allFilters.filter(filter => filter.category === 'l2');
    const technologyFilters = allFilters.filter(
        filter => filter.category === 'technology'
    );
    const contributedFilters = allFilters.filter(
        filter => filter.category === 'contributed'
    );

    const [searchString, setSearchString] = useState<string>('');

    const [resultstoShow, setResultsToShow] = useState<number>(10);

    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');

    const { data, error, isValidating } = useSWR(
        () => searchString || ' ',
        fetcherv2,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );

    const [filterTagsExpanded, setFilterTagsExpanded] = useState(false);

    ///////////////////////////////////////
    // HANDLERS
    ///////////////////////////////////////

    const clearFilters = () => {
        setAllFilters([]);
    };

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResultsToShow(10);
        setSearchString(event.target.value);
    };

    const onFilter = (filters: FilterItem[]) => {
        setResultsToShow(10);
        setAllFilters(filters);
    };

    const onFilterTabClose = (filterTag: FilterItem) => {
        setAllFilters(allFilters.filter(filter => filter !== filterTag));
    };

    ///////////////////////////////////////
    // COMPUTED VALUES
    ///////////////////////////////////////
    const hasFiltersSet = !!allFilters.length;

    const filteredData = (() => {
        if (!data) {
            return [];
        } else if (!hasFiltersSet) {
            return data.filter(({ tags }) => tags.contentType === contentType);
        } else {
            return data.filter(({ tags }) => {
                return (
                    tags.contentType === contentType &&
                    (!!l1Filters.find(
                        filter => filter.name === tags.l1Product
                    ) ||
                        !!contributedFilters.find(
                            filter => filter.name === tags.authorType
                        ) ||
                        l2Filters.some(
                            filter => tags.l2Product.indexOf(filter.name) >= 0
                        ) ||
                        languageFilters.some(
                            filter =>
                                tags.programmingLanguage.indexOf(filter.name) >=
                                0
                        ) ||
                        technologyFilters.some(
                            filter => tags.technology.indexOf(filter.name) >= 0
                        ))
                );
            });
        }
    })();

    const numberOfResults = filteredData.length;
    const shownData = filteredData.slice(0, resultstoShow);
    const fullyLoaded = resultstoShow >= numberOfResults;

    const requestButtonText = `Request ${
        /^[aeiou]/gi.test(contentType) ? 'an' : 'a'
    } ${contentType}`; // Regex to tell if it starts with a vowel.

    ///////////////////////////////////////
    // COMPUTED ELEMENTS
    ///////////////////////////////////////
    const CTAElement = (
        <div sx={CTAContainerStyles}>
            <Button
                variant="secondary"
                onClick={() => setRequestContentModalStage('text')}
                size="large"
            >
                {requestButtonText}
            </Button>
        </div>
    );

    if (allFilters.length <= 5 && filterTagsExpanded) {
        setFilterTagsExpanded(false);
    }

    const filterTags = (
        <div
            sx={{
                display: 'flex',
                gap: 'inc30',
                flexWrap: 'wrap',
            }}
        >
            {allFilters.length > 5 ? (
                filterTagsExpanded ? (
                    <>
                        {allFilters.map(filter => (
                            <FilterTag
                                key={filter.name}
                                filter={filter}
                                closeIcon={true}
                                onClick={onFilterTabClose}
                            />
                        ))}
                        <FilterTag
                            filter={{
                                name: 'Show less',
                                category: '',
                            }}
                            onClick={() => setFilterTagsExpanded(false)}
                        />
                    </>
                ) : (
                    <>
                        {allFilters.slice(0, 5).map(filter => (
                            <FilterTag
                                key={filter.name}
                                filter={filter}
                                closeIcon={true}
                                onClick={onFilterTabClose}
                            />
                        ))}
                        <FilterTag
                            filter={{
                                name: `+${allFilters.length - 5}`,
                                category: '',
                            }}
                            onClick={() => setFilterTagsExpanded(true)}
                        />
                    </>
                )
            ) : (
                allFilters.map(filter => (
                    <FilterTag
                        key={filter.name}
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
        <div
            sx={{
                marginBottom: 'inc50',
                display: 'flex',
                flexDirection: 'column',
                gap: 'inc30',
            }}
        >
            {(data || isValidating) && (
                <TypographyScale variant="heading6">
                    {isValidating
                        ? 'Loading...'
                        : numberOfResults === 1
                        ? '1 Result'
                        : `${numberOfResults} Results`}
                    {!isValidating && !!searchString && !allFilters.length
                        ? ` for "${searchString}"`
                        : ''}
                </TypographyScale>
            )}
            {hasFiltersSet && filterTags}
        </div>
    );

    return (
        <>
            <Hero
                crumbs={[]}
                name={`${contentType}s`}
                description="Some description"
                ctas={CTAElement}
            />
            <div sx={pageWrapper}>
                <GridLayout
                    sx={{
                        rowGap: 0,
                    }}
                >
                    <DesktopFilters
                        sx={filterGroupContainer}
                        onFilter={onFilter}
                        allFilters={allFilters}
                        l1Items={l1Items}
                        languageItems={languageItems}
                        technologyItems={technologyItems}
                        contributedByItems={contributedByItems}
                    />
                    <div
                        sx={{
                            gridColumn: ['span 6', null, 'span 8', 'span 9'],
                        }}
                    >
                        <div sx={searchBoxStyles}>
                            <TextInput
                                name="search-text-input"
                                label={`Search ${contentType}s`}
                                iconName={ESystemIconNames.SEARCH}
                                value={searchString}
                                onChange={onSearch}
                            />
                        </div>
                        {filteredData && (
                            <>
                                {resultsStringAndTags}
                                <Results
                                    data={[shownData]}
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
                        )}
                    </div>
                </GridLayout>
            </div>
            <RequestContentModal
                setModalStage={setRequestContentModalStage}
                modalStage={requestContentModalStage}
                contentCategory={contentType}
            />
        </>
    );
};

export default ContentTypePage;
