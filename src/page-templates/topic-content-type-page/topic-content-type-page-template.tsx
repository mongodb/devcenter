import {
    BrandedIcon,
    Button,
    GridLayout,
    HorizontalRule,
    SideNav,
    TypographyScale,
} from '@mdb/flora';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useState } from 'react';
import Breadcrumbs from '../../components/breadcrumbs';
import { Crumb } from '../../components/breadcrumbs/types';
import { CTAContainerStyles } from '../../components/hero/styles';
import RequestContentModal, {
    requestContentModalStages,
} from '../../components/request-content-modal';
import Search from '../../components/search';
import {
    sideNavStyles,
    sideNavTitleStyles,
} from '../../components/tertiary-nav/styles';
import { TertiaryNavItem } from '../../components/tertiary-nav/types';
import { TopicCardsContainer } from '../../components/topic-card';
import { iconStyles } from '../../components/topic-card/styles';
import { ITopicCard } from '../../components/topic-card/types';
import { PillCategory } from '../../types/pill-category';
import { addExternalIconToSideNav } from '../../utils/add-documentation-link-to-side-nav';
import { getURLPath, setURLPathForNavItems } from '../../utils/format-url-path';
import { productToLogo } from '../../utils/product-to-logo';

export interface TopicContentTypePageProps {
    crumbs: Crumb[];
    contentType: PillCategory;
    tertiaryNavItems: TertiaryNavItem[];
    topicName: string;
    topicSlug: string;
    contentTypeSlug: string;
    contentTypeAggregateSlug: string;
    description: string;
    subTopics: ITopicCard[];
}

const spanAllColumns = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 9'],
};

const getSearchTitleLink = (
    contentType: PillCategory,
    contentTypeAggregateSlug: string
) => {
    if (contentType === 'News & Announcements') {
        return undefined;
    }
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

let pluralize = require('pluralize');

export const TopicContentTypePageTemplate: NextPage<
    TopicContentTypePageProps
> = ({
    crumbs,
    contentType,
    tertiaryNavItems,
    topicName,
    topicSlug,
    contentTypeSlug,
    contentTypeAggregateSlug,
    description,
    subTopics,
}) => {
    const requestButtonText = `Request ${
        /^[aeiou]/gi.test(contentType) ? 'an' : 'a'
    } ${contentType}`; // Regex to tell if it starts with a vowel.

    const pageTitle = `${topicName} ${pluralize(contentType)} | MongoDB`;

    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');

    const mainGridDesktopRowsCount = subTopics.length > 0 ? 4 : 3;

    const subTopicItems = subTopics.map(subTopic => {
        const iconName = productToLogo[subTopic.title];
        const icon = iconName ? (
            <BrandedIcon sx={iconStyles} name={iconName} />
        ) : null;
        const href = subTopic.href + contentTypeSlug;
        return { ...subTopic, href, icon };
    });

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
            {contentType !== 'News & Announcements' && (
                <div sx={CTAContainerStyles}>
                    <Button
                        onClick={() => setRequestContentModalStage('text')}
                        variant="secondary"
                    >
                        {requestButtonText}
                    </Button>
                </div>
            )}
        </GridLayout>
    );

    return (
        <>
            <NextSeo title={pageTitle} />
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
                        <a href={getURLPath(topicSlug)}>
                            <TypographyScale
                                variant="heading6"
                                sx={sideNavTitleStyles}
                            >
                                {topicName}
                            </TypographyScale>
                        </a>

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
                    <Search
                        titleElement="h1"
                        title={`All ${topicName} ${pluralize(contentType)}`}
                        placeholder={`Search ${topicName} ${pluralize(
                            contentType
                        )}`}
                        tagSlug={topicSlug}
                        contentType={contentType}
                        resultsLayout="grid"
                        titleLink={getSearchTitleLink(
                            contentType,
                            contentTypeAggregateSlug
                        )}
                        sx={spanAllColumns}
                    />
                </GridLayout>
            </div>
            {contentType !== 'News & Announcements' && (
                <RequestContentModal
                    setModalStage={setRequestContentModalStage}
                    modalStage={requestContentModalStage}
                    contentCategory={contentType}
                />
            )}
        </>
    );
};

export default TopicContentTypePageTemplate;
