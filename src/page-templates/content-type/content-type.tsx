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
import FilterGroup from '../../components/filter-group';
import { fetcherv2 } from '../../components/search/utils';
import Results from '../../components/search/results';
import Hero from '../../components/hero';
import RequestContentModal, {
    requestContentModalStages,
} from '../../components/request-content-modal';
import { CTAContainerStyles } from '../../components/hero/styles';

import FilterTag from './filter-tag';
import { FilterItem } from '../../components/filter-group';

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

const productItems = [
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

    const [productFilters, setProductFilters] = useState<string[]>([]);
    const [languageFilters, setLanguageFilters] = useState<string[]>([]);
    const [technologyFilters, setTechnologyFilters] = useState<string[]>([]);
    // const [expertiseLevelFilters, setExpertiseLevelFilters] = useState<
    //     string[]
    // >([]);
    const [contributedByFilters, setContributedByFilters] = useState<string[]>(
        []
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

    ///////////////////////////////////////
    // HANDLERS
    ///////////////////////////////////////
    const clearFilters = () => {
        setLanguageFilters([]);
        setTechnologyFilters([]);
        // setExpertiseLevelFilters([])
        setContributedByFilters([]);
    };

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setResultsToShow(10);
        setSearchString(event.target.value);
    };

    const onFilter = (
        setFilter: (filters: string[]) => void,
        filters: string[]
    ) => {
        setResultsToShow(10);
        setFilter(filters);
    };

    const onLangFilterClose = (lang: string) => {
        setLanguageFilters(languageFilters.filter(filter => filter !== lang));
    };
    const onTechFilterClose = (lang: string) => {
        setTechnologyFilters(
            technologyFilters.filter(filter => filter !== lang)
        );
    };

    const onContribFilterClose = (lang: string) => {
        setContributedByFilters(
            contributedByFilters.filter(filter => filter !== lang)
        );
    };

    ///////////////////////////////////////
    // COMPUTED VALUES
    ///////////////////////////////////////
    const hasFiltersSet =
        !!languageFilters.length ||
        !!technologyFilters.length ||
        // expertiseLevelFilters.length ||
        !!contributedByFilters.length;

    const filteredData = (() => {
        if (!data) {
            return [];
        } else if (!hasFiltersSet) {
            return data.filter(({ tags }) => tags.contentType === contentType);
        } else {
            return data.filter(
                ({ tags }) =>
                    tags.contentType === contentType &&
                    (languageFilters.some(
                        filter => tags.programmingLanguage.indexOf(filter) >= 0
                    ) ||
                        technologyFilters.some(
                            filter => tags.technology.indexOf(filter) >= 0
                        ) ||
                        contributedByFilters.includes(tags.authorType))
            );
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

    const filterTags = (
        <div
            sx={{
                display: 'flex',
                gap: 'inc30',
            }}
        >
            {languageFilters.map(lang => (
                <FilterTag key={lang} text={lang} onClose={onLangFilterClose} />
            ))}
            {technologyFilters.map(tech => (
                <FilterTag key={tech} text={tech} onClose={onTechFilterClose} />
            ))}
            {contributedByFilters.map(contrib => (
                <FilterTag
                    key={contrib}
                    text={contrib}
                    onClose={onContribFilterClose}
                />
            ))}
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
                    <div sx={filterGroupContainer}>
                        <FilterGroup
                            title="Products"
                            items={productItems}
                            filters={productFilters}
                            setFilters={filters =>
                                onFilter(setProductFilters, filters)
                            }
                        />
                        <FilterGroup
                            title="Language"
                            items={languageItems}
                            filters={languageFilters}
                            setFilters={filters =>
                                onFilter(setLanguageFilters, filters)
                            }
                        />
                        <FilterGroup
                            title="Technology"
                            items={technologyItems}
                            filters={technologyFilters}
                            setFilters={filters =>
                                onFilter(setTechnologyFilters, filters)
                            }
                        />
                        {/* <FilterGroup
                        title="Expertise Level"
                        items={expertiseLevelItems}
                        filters={expertiseLevelFilters}
                        setFilters={setExpertiseLevelFilters}
                    /> */}
                        <FilterGroup
                            title="Contributed By"
                            items={contributedByItems}
                            filters={contributedByFilters}
                            setFilters={filters =>
                                onFilter(setContributedByFilters, filters)
                            }
                        />
                    </div>
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
                                {data && (
                                    <TypographyScale
                                        variant="heading6"
                                        sx={{ marginBottom: 'inc30' }}
                                    >
                                        {numberOfResults === 0
                                            ? 'No Results'
                                            : numberOfResults === 1
                                            ? '1 Result'
                                            : `${numberOfResults} Results`}
                                    </TypographyScale>
                                )}
                                {hasFiltersSet && (
                                    <div
                                        sx={{
                                            display: 'flex',
                                            gap: 'inc30',
                                            marginBottom: 'inc50',
                                        }}
                                    >
                                        {filterTags}
                                        <Link onClick={clearFilters}>
                                            Clear Filters
                                        </Link>
                                    </div>
                                )}
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
