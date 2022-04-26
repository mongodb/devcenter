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
import {
    FilterItem,
    DesktopFilters,
    MobileFilters,
} from '../../components/search-filters';
import { Tag } from '../../interfaces/tag';

const languageItems: FilterItem[] = [
    {
        name: 'C',
        type: 'ProgrammingLanguage',
    },
    {
        name: 'CSharp',
        type: 'ProgrammingLanguage',
    },
    {
        name: 'C++',
        type: 'ProgrammingLanguage',
    },
    {
        name: 'Go',
        type: 'ProgrammingLanguage',
    },
    {
        name: 'Java',
        type: 'ProgrammingLanguage',
    },
    {
        name: 'Javascript',
        type: 'ProgrammingLanguage',
    },
    {
        name: 'Kotlin',
        type: 'ProgrammingLanguage',
    },
    {
        name: 'PHP',
        type: 'ProgrammingLanguage',
    },
    {
        name: 'Python',
        type: 'ProgrammingLanguage',
    },
];

const technologyItems: FilterItem[] = [
    {
        name: 'Docker',
        type: 'Technology',
    },
    {
        name: 'Azure',
        type: 'Technology',
    },
    {
        name: 'AWS',
        type: 'Technology',
    },
    {
        name: 'GCP',
        type: 'Technology',
    },
    {
        name: 'FastAPI',
        type: 'Technology',
    },
    {
        name: 'Android',
        type: 'Technology',
    },
    {
        name: 'iOS',
        type: 'Technology',
    },
];

const expertiseLevelItems: FilterItem[] = [
    {
        name: 'Introductory',
        type: 'ExpertiseLevel',
    },
    {
        name: 'Expert',
        type: 'ExpertiseLevel',
    },
];

const contributedByItems: FilterItem[] = [
    {
        name: 'MongoDB',
        type: 'AuthorType',
    },
    {
        name: 'Community',
        type: 'AuthorType',
    },
    {
        name: 'Students',
        type: 'AuthorType',
    },
    {
        name: 'Champions',
        type: 'AuthorType',
    },
    {
        name: 'Partners',
        type: 'AuthorType',
    },
];

const atlasItems: FilterItem[] = [
    {
        name: 'DataAPI',
        type: 'L2Product',
    },
    {
        name: 'Monitoring',
        type: 'L2Product',
    },
];

const l1Items: FilterItem[] = [
    {
        name: 'Atlas',
        subItems: atlasItems,
        type: 'L1Product',
    },
    {
        name: 'Realm',
        type: 'L1Product',
    },
];

interface ContentTypePageProps {
    contentType: PillCategory;
}

const desktopFiltersStyles = {
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
    console.log(data);
    const [filterTagsExpanded, setFilterTagsExpanded] = useState(false);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
    // const languageFilters = allFilters.filter(
    //     filter => filter.type === 'language'
    // );
    // const l1Filters = allFilters.filter(filter => filter.type === 'l1');

    // const l2Filters = allFilters.filter(filter => filter.type === 'l2');
    // const technologyFilters = allFilters.filter(
    //     filter => filter.type === 'technology'
    // );
    // const contributedFilters = allFilters.filter(
    //     filter => filter.type === 'contributed'
    // );
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
            return data.filter(({ category }) => category === contentType);
        } else {
            return data.filter(({ tags, category }) => {
                return (
                    category === contentType &&
                    tags.some(
                        tag => tag.type !== 'ContentType' && tagInFilters(tag)
                    )
                    // (!!l1Filters.find(
                    //     filter =>
                    //         filter.name ===
                    //         tags.find(tag => tag.type === 'L1Product')?.name
                    // ) ||
                    //     !!contributedFilters.find(
                    //         filter =>
                    //             filter.name ===
                    //             tags.find(tag => tag.type === 'AuthorType')
                    //                 ?.name
                    //     ) ||
                    //     l2Filters.some(
                    //         filter =>
                    //             tags
                    //                 .filter(({ type }) => type === 'L2Product')
                    //                 .map(({ name }) => name)
                    //                 .indexOf(filter.name) >= 0
                    //     ) ||
                    //     languageFilters.some(
                    //         filter =>
                    //             tags
                    //                 .filter(
                    //                     ({ type }) =>
                    //                         type === 'ProgrammingLanguage'
                    //                 )
                    //                 .map(({ name }) => name)
                    //                 .indexOf(filter.name) >= 0
                    //     ) ||
                    //     technologyFilters.some(
                    //         filter =>
                    //             tags
                    //                 .filter(({ type }) => type === 'Technology')
                    //                 .map(({ name }) => name)
                    //                 .indexOf(filter.name) >= 0
                    //     ))
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
                                key={filter.name}
                                filter={filter}
                                closeIcon={true}
                                onClick={onFilterTabClose}
                            />
                        ))}
                        <FilterTag
                            filter={{
                                name: 'Show less',
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
                flexDirection: ['column', null, 'row', 'column'],
                justifyContent: ['start', null, 'space-between', 'start'],
                alignItems: ['start', null, 'center', 'start'],
                gap: 'inc30',
            }}
        >
            {(data || isValidating) && (
                <TypographyScale variant="heading6">
                    {!allFilters.length && !searchString
                        ? `All ${contentType}s`
                        : isValidating
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
                    iconName={ESystemIconNames.HAMBURGER}
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
                        sx={desktopFiltersStyles}
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
            {mobileFiltersOpen && (
                <MobileFilters
                    onFilter={onFilter}
                    allFilters={allFilters}
                    l1Items={l1Items}
                    languageItems={languageItems}
                    technologyItems={technologyItems}
                    contributedByItems={contributedByItems}
                    closeModal={() => setMobileFiltersOpen(false)}
                />
            )}
        </>
    );
};

export default ContentTypePage;
