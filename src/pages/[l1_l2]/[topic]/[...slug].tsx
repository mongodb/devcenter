import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { TertiaryNavItem } from '../../../components/tertiary-nav/types';
import { getSideNav } from '../../../service/get-side-nav';
import TertiaryNav from '../../../components/tertiary-nav';
import React, { useState } from 'react';
import {
    SideNav,
    GridLayout,
    Eyebrow,
    TypographyScale,
    Button,
    HorizontalRule,
    BrandedIcon,
} from '@mdb/flora';
import { getDistinctTags } from '../../../service/get-distinct-tags';
import { CTAContainerStyles } from '../../../components/hero/styles';
import RequestContentModal, {
    requestContentModalStages,
} from '../../../components/request-content-modal';
import Search from '../../../components/search';
import { TopicCardsContainer } from '../../../components/topic-card';
import { ITopicCard } from '../../../components/topic-card/types';
import { PillCategory, pillCategoryToSlug } from '../../../types/pill-category';
import { getAllContentTypes } from '../../../service/get-all-content-types';
import { ContentTypeTag } from '../../../interfaces/tag-type-response';
import { L1L2_TOPIC_PAGE_TYPES } from '../../../data/constants';
import { sideNavTitleStyles } from '../../../components/tertiary-nav/styles';

import { iconStyles } from '../../../components/topic-card/styles';
import {
    getURLPath,
    setURLPathForNavItems,
} from '../../../utils/format-url-path';
import { getMetaInfoForTopic } from '../../../service/get-meta-info-for-topic';
import { getAllContentItems } from '../../../service/get-all-content';
import { productToLogo } from '../../../utils/product-to-logo';

const spanAllColumns = {
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 9'],
};

const sideNavStyles = (rowCount: number) => ({
    display: ['none', null, null, null, 'block'],
    gridColumn: ['span 6', null, 'span 8', 'span 12', 'span 3'],
    nav: {
        position: 'static' as 'static',
    },
    // We have a variable amount of rows, but should have at least 3. If this is problematic, maybe we calculate the rows
    // before render and update this accordingly.
    gridRow: [null, null, null, null, `span ${rowCount}`],
});

let pluralize = require('pluralize');

export interface TopicContentTypePageProps {
    // crumbs: Crumb[]
    contentType: PillCategory;
    tertiaryNavItems: TertiaryNavItem[];
    topicName: string;
    topicSlug: string;
    contentTypeSlug: string;
    contentTypeAggregateSlug: string;
    description: string;
    subTopics: ITopicCard[];
}

const getSearchTitleLink = (
    contentType: PillCategory,
    contentTypeAggregateSlug: string
) => {
    if (contentType === 'News & Announcements') {
        return undefined;
    }
    return {
        href: contentTypeAggregateSlug,
        text: `All ${pluralize(contentType)}`,
    };
};

const TopicContentTypePage: NextPage<TopicContentTypePageProps> = ({
    // crumbs,
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

    setURLPathForNavItems(tertiaryNavItems);

    const header = (
        <GridLayout
            sx={{
                rowGap: 'inc30',
                width: '100%',
                ...spanAllColumns,
            }}
        >
            <div sx={{ gridColumn: ['span 6', null, 'span 5'] }}>
                <Eyebrow sx={{ marginBottom: 'inc30' }}>{topicName}</Eyebrow>
                <TypographyScale
                    variant="heading2"
                    sx={{
                        marginBottom: ['inc20', null, null, 'inc40'],
                    }}
                >
                    {contentType}s
                </TypographyScale>
                <TypographyScale variant="body2">{description}</TypographyScale>
            </div>
            <div sx={CTAContainerStyles}>
                <Button
                    onClick={() => setRequestContentModalStage('text')}
                    variant="secondary"
                >
                    {requestButtonText}
                </Button>
            </div>
        </GridLayout>
    );

    return (
        <>
            <TertiaryNav items={tertiaryNavItems} topic={topicName} />
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
                        <a
                            href={getURLPath(topicSlug)}
                            sx={{
                                '&:hover': {
                                    textDecoration: 'underline',
                                },
                            }}
                        >
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
                    <HorizontalRule sx={spanAllColumns} spacing="xlarge" />
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
                        title={`All ${topicName} ${pluralize(contentType)}`}
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
            <RequestContentModal
                setModalStage={setRequestContentModalStage}
                modalStage={requestContentModalStage}
                contentCategory={contentType}
            />
        </>
    );
};

export default TopicContentTypePage;

interface IParams extends ParsedUrlQuery {
    l1_l2: string;
    topic: string;
    slug: string[];
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: any[] = [];

    const distinctTags = await getDistinctTags();

    const distinctSlugs = distinctTags
        .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
        .map(tag => tag.slug);

    //distinct slugs = ["/product/atlas", "product/atlas/full-text-search", "language/java"]
    for (const distinctSlug of distinctSlugs) {
        const tertiaryNavItems = await getSideNav(distinctSlug);

        tertiaryNavItems.forEach((item: TertiaryNavItem) => {
            const parsedItemUrl = item.url.startsWith('/')
                ? item.url.substring(1)
                : item.url;

            /*
            eg: tertiary nav item url /product/atlas/article
            /product/atlas/video etc
             */
            const category = parsedItemUrl.split('/')[0];
            const topic = parsedItemUrl.split('/')[1];
            const restOfSlug = parsedItemUrl.split('/').slice(2);

            paths = paths.concat({
                params: { l1_l2: category, topic: topic, slug: restOfSlug },
            });
        });
    }

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { l1_l2, topic, slug } = params as IParams;

    /*
    eg:
    pathComponents = ['product','atlas','article']
    pathComponents = ['product','atlas','full-text-search','article'] etc
    */

    const pathComponents = [l1_l2, topic].concat(slug);

    const contentTypeSlug = '/' + pathComponents[pathComponents.length - 1];
    const topicSlug =
        '/' + pathComponents.slice(0, pathComponents.length - 1).join('/');

    const allContentTypesInStrapi = await getAllContentTypes();

    const contentType: PillCategory = allContentTypesInStrapi
        .filter((contentTypeTag: ContentTypeTag) => {
            return (
                contentTypeSlug.toLowerCase() ===
                contentTypeTag.calculatedSlug.toLowerCase()
            );
        })
        .map((contentTypeTag: ContentTypeTag) => contentTypeTag.contentType)[0];

    const tertiaryNavItems = await getSideNav(topicSlug);

    const metaInfoForTopic = await getMetaInfoForTopic(topicSlug);

    const metaInfoForContentType = await getMetaInfoForTopic(contentTypeSlug);

    const contentTypeAggregateSlug = pillCategoryToSlug.get(contentType);

    const subTopics = metaInfoForTopic?.topics;
    let subTopicsWithContentType: ITopicCard[] = [];
    // This is super annoying, but we need to only show the subtopics that have the content type we are looking at.
    if (subTopics) {
        const allContent = await getAllContentItems();
        const allRelevantContent = allContent.filter(
            item =>
                item.tags.find(
                    tag =>
                        tag.type === 'ContentType' && tag.name === contentType
                ) &&
                item.tags.find(
                    tag =>
                        tag.type === 'L1Product' &&
                        tag.name === metaInfoForTopic?.tagName
                )
        );
        subTopicsWithContentType = subTopics.filter(subTopic =>
            allRelevantContent.find(item =>
                item.tags.find(
                    tag =>
                        tag.type === 'L2Product' && tag.name === subTopic.title
                )
            )
        );
    }

    const data = {
        // crumbs,
        contentType: contentType,
        tertiaryNavItems: tertiaryNavItems,
        topicName: metaInfoForTopic?.tagName ? metaInfoForTopic.tagName : '',
        topicSlug: topicSlug,
        contentTypeSlug: contentTypeSlug,
        contentTypeAggregateSlug: contentTypeAggregateSlug,
        description: metaInfoForContentType?.description
            ? metaInfoForContentType.description
            : '',
        subTopics: subTopicsWithContentType,
    };
    return { props: data };
};
