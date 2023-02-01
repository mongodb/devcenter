import { useMemo } from 'react';
import {
    Button,
    Checkbox,
    GridLayout,
    HorizontalRule,
    SideNav,
    TypographyScale,
} from '@mdb/flora';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Breadcrumbs from '../../components/breadcrumbs';
import { Crumb } from '../../components/breadcrumbs/types';
import { CTAContainerStyles } from '../../components/hero/styles';
import RequestContentModal from '../../components/modal/request-content';
import {
    LocationBox,
    SearchBox,
    SearchResults,
    SortBox,
} from '../../components/search';
import { SearchItem } from '../../components/search/types';
import {
    sideNavStyles,
    sideNavTitleStyles,
    titleFollowTopicStyles,
} from '../../components/tertiary-nav/styles';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { TopicCardsContainer } from '../../components/topic-cards-container';
import { PillCategory } from '../../types/pill-category';
import { getURLPath, setURLPathForNavItems } from '../../utils/format-url-path';
import useSearch from '../../hooks/search';
import { useSearchMeta } from '../../hooks/search/meta';
import {
    linkStyleOverride,
    searchWrapperStyles,
    titleStyles,
} from '../../components/search/styles';
import ExpandingLink from '../../components/expanding-link';
import { FilterItem, TopicCardProps } from '@mdb/devcenter-components';
import {
    getRequestBtnText,
    addExternalIconToSideNav,
} from '../../utils/page-template-helpers';
import { useModalContext } from '../../contexts/modal';
import { Tag } from '../../interfaces/tag';
import { tagToTopic } from '../../utils/tag-to-topic';
import { LocationOptions } from '../../hooks/search/types';
import EventResults from '../../components/event-results';
import FollowLink from '../../components/follow-link';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pluralize = require('pluralize');

interface TopicContentTypePageProps {
    crumbs: Crumb[];
    contentType: PillCategory;
    tertiaryNavItems: TertiaryNavItem[];
    topic: Tag;
    contentTypeSlug: string;
    contentTypeAggregateSlug: string;
    description: string;
    subTopics: Tag[];
    pageNumber: number;
    initialSearchContent: SearchItem[];
}

const spanAllColumns = {
    gridColumn: ['span 12', null, null, 'span 12', 'span 9'],
};

const extraSearchBoxStyles = {
    marginBottom: '0',
};
const extraSortBoxStyles = {
    display: 'block',
    flexBasis: ['100%', null, 'calc(33% - 12px)'],
};
const extraSearchWrapperStyles = {
    ...searchWrapperStyles,
    gridColumn: ['span 12', null, null, null, 'span 9'],
};

const getSearchTitleLink = (
    contentType: PillCategory,
    contentTypeAggregateSlug: string
) => {
    if (contentType === 'Podcast') {
        return {
            href: 'https://podcasts.mongodb.com/public/115/The-MongoDB-Podcast-b02cf624',
            text: 'All Podcasts',
        };
    }
    return {
        href: contentTypeAggregateSlug,
        text: `All ${pluralize(contentType)}`,
    };
};

const buildPageTitle =
    (contentType: string, topicName: string) => (pageNumber: number) => {
        const titlePageNo = pageNumber > 1 ? `- Page ${pageNumber}` : '';
        return `${topicName} ${pluralize(
            contentType
        )} ${titlePageNo} | MongoDB`;
    };

const ExtraCodeExampleCheckboxes = ({
    filters,
    onFilter,
}: {
    filters: FilterItem[];
    onFilter: (filters: FilterItem[]) => void;
}) => {
    const onToggle = (name: string) => (checked: boolean) => {
        const filterItem = checked
            ? [{ name, type: 'CodeLevel', count: 0 }]
            : [];

        onFilter(filterItem);
    };

    return (
        <div
            sx={{
                display: 'flex',
                gap: 'inc40',
                marginBottom: ['inc30', null, 'inc50'],
            }}
        >
            <Checkbox
                name="Snippet"
                label="Code Snippets"
                onToggle={onToggle('Snippet')}
                checked={!!filters.find((filt: any) => filt.name === 'Snippet')}
            />
            <Checkbox
                name="Full Application"
                label="Full Applications"
                onToggle={onToggle('Full Application')}
                checked={
                    !!filters.find(
                        (filt: any) => filt.name === 'Full Application'
                    )
                }
            />
        </div>
    );
};

const TopicContentTypePageTemplate: NextPage<TopicContentTypePageProps> = ({
    crumbs,
    contentType,
    tertiaryNavItems,
    topic,
    contentTypeSlug,
    contentTypeAggregateSlug,
    description,
    subTopics,
    initialSearchContent,
    pageNumber,
}) => {
    const { name: topicName, slug: topicSlug } = topic;
    const requestButtonText = getRequestBtnText(contentType);

    const { openModal } = useModalContext();

    const searchMetaProps = useSearchMeta(
        pageNumber,
        topicSlug + contentTypeSlug,
        contentType,
        buildPageTitle(contentType, topicName)
    );
    const { pageTitle, metaDescr, canonicalUrl, updatePageMeta } =
        searchMetaProps;

    const searchProps = useSearch(
        initialSearchContent,
        updatePageMeta,
        contentType,
        topicSlug
    );
    const {
        searchStringProps,
        sortProps,
        filterProps,
        resultsProps,
        locationProps,
    } = searchProps;

    const mainGridDesktopRowsCount = subTopics.length > 0 ? 4 : 3;

    const subTopicItems: TopicCardProps[] = subTopics.map(subTopic => {
        const topicItem = tagToTopic(subTopic);
        topicItem.href = getURLPath(
            topicItem.href + contentTypeSlug.replace('/', '')
        ) as string;
        return topicItem;
    });

    const locationDisplayOptions = useMemo(
        () =>
            locationProps.displayOptions.filter(
                option => option.label !== 'Virtual'
            ),
        [locationProps.displayOptions]
    ) as LocationOptions[];

    tertiaryNavItems = addExternalIconToSideNav(
        tertiaryNavItems,
        'documentation'
    );

    setURLPathForNavItems(tertiaryNavItems);

    const header = (
        <GridLayout
            sx={{
                rowGap: 'inc30',
                width: '100%',
                ...spanAllColumns,
            }}
        >
            <Breadcrumbs
                crumbs={crumbs}
                sx={{
                    marginBottom: 'inc30',
                    gridColumn: ['span 6', null, 'span 8', 'span 12'],
                }}
            />
            <div sx={{ gridColumn: ['span 6', null, 'span 5'] }}>
                <TypographyScale
                    variant="heading2"
                    sx={{
                        marginBottom: ['inc20', null, null, 'inc40'],
                    }}
                >
                    {pluralize(contentType)}
                </TypographyScale>
                <TypographyScale variant="body2">{description}</TypographyScale>
            </div>
            {contentType !== 'News & Announcements' && contentType !== 'Event' && (
                <div sx={CTAContainerStyles}>
                    <Button
                        variant="secondary"
                        onClick={() =>
                            openModal(
                                <RequestContentModal
                                    contentCategory={contentType}
                                />
                            )
                        }
                    >
                        {requestButtonText}
                    </Button>
                </div>
            )}
        </GridLayout>
    );

    return (
        <>
            <NextSeo
                title={pageTitle}
                canonical={canonicalUrl}
                {...(metaDescr ? { description: metaDescr } : {})}
            />
            <div
                sx={{
                    paddingBottom: 'inc160',
                    px: ['inc40', null, 'inc50', 'inc70'],
                    paddingTop: ['inc40', null, 'inc50', 'inc70'],
                }}
            >
                <GridLayout
                    sx={{
                        rowGap: 0,
                    }}
                >
                    <div sx={sideNavStyles(mainGridDesktopRowsCount)}>
                        <div sx={titleFollowTopicStyles}>
                            <a href={getURLPath(topicSlug)}>
                                <TypographyScale
                                    variant="heading6"
                                    sx={sideNavTitleStyles}
                                >
                                    {topicName}
                                </TypographyScale>
                            </a>
                            <FollowLink topic={topic} iconsOnly />
                        </div>

                        <SideNav currentUrl="#" items={tertiaryNavItems} />
                    </div>
                    {header}
                    <HorizontalRule sx={spanAllColumns} spacing="large" />
                    {subTopics.length > 0 && (
                        <TopicCardsContainer
                            topics={subTopicItems}
                            title="By Category"
                            sx={{
                                marginBottom: [
                                    'section30',
                                    null,
                                    null,
                                    'section50',
                                ],
                            }}
                        />
                    )}

                    <div
                        sx={{
                            ...extraSearchWrapperStyles,
                            ...(contentType === 'Event'
                                ? {
                                      rowGap: ['inc40', null, 'inc70'],
                                      columnGap: 'inc40',
                                  }
                                : {}),
                        }}
                    >
                        <div sx={titleStyles}>
                            <TypographyScale
                                variant="heading5"
                                customElement="h5"
                            >
                                All {topicName} {pluralize(contentType)}
                            </TypographyScale>

                            <ExpandingLink
                                {...getSearchTitleLink(
                                    contentType,
                                    contentTypeAggregateSlug
                                )}
                                hoverStyleOverrides={linkStyleOverride}
                            />
                        </div>

                        <SearchBox
                            {...searchStringProps}
                            placeholder={`Search ${topicName} ${pluralize(
                                contentType
                            )}`}
                            extraStyles={extraSearchBoxStyles}
                        />

                        {contentType === 'Event' && (
                            <>
                                <LocationBox
                                    {...locationProps}
                                    displayOptions={locationDisplayOptions}
                                />

                                <EventResults
                                    searchProps={searchProps}
                                    searchMetaProps={searchMetaProps}
                                    hideHeader
                                    gridLayout
                                />
                            </>
                        )}

                        {contentType !== 'Event' && (
                            <>
                                <SortBox
                                    {...sortProps}
                                    extraStyles={extraSortBoxStyles}
                                />

                                {contentType === 'Code Example' && (
                                    <ExtraCodeExampleCheckboxes
                                        {...filterProps}
                                    />
                                )}

                                <SearchResults
                                    {...resultsProps}
                                    {...searchMetaProps}
                                    layout="grid"
                                    extraStyles={{
                                        marginTop: 'inc30',
                                    }}
                                />
                            </>
                        )}
                    </div>
                </GridLayout>
            </div>
        </>
    );
};

export default TopicContentTypePageTemplate;
