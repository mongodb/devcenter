import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import NextImage from 'next/image';
import useSWR from 'swr';
import {
    GridLayout,
    TypographyScale,
    TextInput,
    ESystemIconNames,
    Link,
    Button,
    ThirdPartyLogo,
    EThirdPartyLogoVariant,
} from '@mdb/flora';

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

import { ContentTypePageProps } from './types';
import {
    searchBoxStyles,
    pageWrapper,
    desktopFiltersStyles,
    resultsStringAndTagsStyles,
} from './styles';

import noResults from '../../../public/no-results.png';

import { FeaturedCardSection } from '../../components/card-section';

import ShowcaseCard from '../../components/showcase-card';
import { ShowcaseCardItem } from '../../components/showcase-card/types';
import { ITopicCard, TopicCardProps } from '../../components/topic-card/types';
import TopicCard, { TopicCardsContainer } from '../../components/topic-card';
import { iconStyles } from '../../components/topic-card/styles';
interface ProgrammingLanguageSectionProps {
    title: string;
    items: ShowcaseCardItem[];
}

interface TechnologySectionProps {
    title: string;
    items: ITopicCard[];
}

const TechnologySection: React.FunctionComponent<TechnologySectionProps> = ({
    title,
    items,
}) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, []);

    const itemsWithIcons = items.map(item => {
        const image = (
            <ThirdPartyLogo
                sx={iconStyles}
                variant={item.icon as EThirdPartyLogoVariant}
            />
        );
        return {
            ...item,
            icon: image,
        };
    });
    return (
        <div
            sx={{
                marginBottom: ['section20', null, null, 'section40'],
            }}
        >
            <div
                sx={{
                    display: 'flex',
                    gap: ['inc30', null, 'inc40'],
                }}
            >
                <TopicCardsContainer
                    topics={itemsWithIcons}
                    title={title}
                    sx={{ width: '100%' }}
                />
            </div>
        </div>
    );
};

const ProgrammingLanguageSection: React.FunctionComponent<
    ProgrammingLanguageSectionProps
> = ({ title, items }) => {
    const [itemsExpanded, setItemsExpanded] = useState(false);
    const itemsToDisplay = itemsExpanded ? undefined : 4;
    return (
        <div
            sx={{
                marginBottom: ['section20', null, null, 'section40'],
            }}
        >
            <TypographyScale variant="heading5" sx={{ marginBottom: 'inc40' }}>
                {title}
            </TypographyScale>

            <div
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: ['inc30', null, 'inc40'],
                    marginBottom: 'inc40',
                }}
            >
                {items
                    .slice(0, itemsToDisplay)
                    .map(({ titleLink, imageString }) => {
                        const image = (
                            <ThirdPartyLogo
                                variant={imageString as EThirdPartyLogoVariant}
                            />
                        );
                        return (
                            <ShowcaseCard
                                key={titleLink.text}
                                alignment="center"
                                image={image}
                                titleLink={titleLink}
                                sx={{ width: '100%' }}
                            />
                        );
                    })}
            </div>
            {items.length > 4 && (
                <Link
                    onClick={() => setItemsExpanded(!itemsExpanded)}
                    sx={{ display: 'block', mx: 'auto' }}
                >
                    {itemsExpanded ? 'Less' : 'More'} languages
                </Link>
            )}
        </div>
    );
};

const ContentTypePage: NextPage<ContentTypePageProps> = ({
    contentType,
    l1Items,
    languageItems,
    technologyItems,
    contributedByItems,
    featured,
    featuredLanguages,
    featuredTechnologies,
}) => {
    ///////////////////////////////////////
    // HOOKS
    ///////////////////////////////////////
    const [allFilters, setAllFilters] = useState<FilterItem[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [resultstoShow, setResultsToShow] = useState<number>(10);
    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');
    const { data, error, isValidating } = useSWR(
        () => `s=${searchString}&contentType=${contentType}`,
        fetcherv2,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            shouldRetryOnError: false,
        }
    );
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
                );
            });
        }
    })();

    const numberOfResults = filteredData.length;
    const shownData = filteredData.slice(0, resultstoShow);
    const fullyLoaded = resultstoShow >= numberOfResults;
    const hasExtraSections = !!featuredLanguages && !!featuredTechnologies;

    const requestButtonText = `Request ${
        /^[aeiou]/gi.test(contentType) ? 'an' : 'a'
    } ${contentType}`; // Regex to tell if it starts with a vowel.

    ///////////////////////////////////////
    // COMPUTED ELEMENTS
    ///////////////////////////////////////
    if (allFilters.length <= 5 && filterTagsExpanded) {
        setFilterTagsExpanded(false);
    }

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
                Back to all {contentType.toLowerCase()}s
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
                        ? `All ${contentType}s`
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
                        {!searchString && !hasFiltersSet && (
                            <>
                                <FeaturedCardSection
                                    content={featured}
                                    sx={{
                                        marginBottom: [
                                            'section20',
                                            null,
                                            'section50',
                                        ],
                                    }}
                                    title={`Featured ${contentType}s`}
                                />
                                {hasExtraSections && (
                                    <>
                                        <ProgrammingLanguageSection
                                            title={`${contentType}s by Programming Language`}
                                            items={featuredLanguages}
                                        />
                                        <TechnologySection
                                            title={`${contentType}s by Technology`}
                                            items={featuredTechnologies}
                                        />
                                    </>
                                )}
                            </>
                        )}
                        {resultsStringAndTags}
                        {!!filteredData.length || isValidating || error ? (
                            <>
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
                        ) : (
                            emptyState
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
