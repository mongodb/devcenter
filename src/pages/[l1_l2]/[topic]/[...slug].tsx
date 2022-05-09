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
import { capitalizeFirstLetter } from '../../../utils/format-string';
import { L1L2_TOPIC_PAGE_TYPES } from '../../../data/constants';

import { iconStyles } from '../../../components/topic-card/styles';

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

const sideNavTitleStyles = {
    borderLeft: 'solid',
    borderWidth: '2px',
    borderColor: 'black20',
    paddingBottom: 'inc30',
    px: 'inc60',
};

export interface TopicContentTypePageProps {
    contentType: PillCategory;
    tertiaryNavItems: TertiaryNavItem[];
    topicName: string;
    topicSlug: string;
    contentTypeSlug: string;
    contentTypeAggregateSlug: string;
    subTopics: ITopicCard[];
}

const TopicContentTypePage: NextPage<TopicContentTypePageProps> = ({
    contentType,
    tertiaryNavItems,
    topicName,
    topicSlug,
    contentTypeSlug,
    contentTypeAggregateSlug,
    subTopics,
}) => {
    const requestButtonText = `Request ${
        /^[aeiou]/gi.test(contentType) ? 'an' : 'a'
    } ${contentType}`; // Regex to tell if it starts with a vowel.

    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');

    const mainGridDesktopRowsCount = subTopics.length > 0 ? 4 : 3;

    const subTopicItems = subTopics.map(subTopic => {
        const icon = <BrandedIcon sx={iconStyles} name={subTopic.icon} />;
        return { ...subTopic, icon };
    });

    const header = (
        <GridLayout
            sx={{
                rowGap: 'inc30',
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
                <TypographyScale variant="body2">
                    Blurb consisting of a description of the title or tag for
                    the page. No more than 2 - 3 lines, and 4 column max
                </TypographyScale>
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
                        <TypographyScale
                            variant="heading6"
                            sx={sideNavTitleStyles}
                        >
                            {topicName}
                        </TypographyScale>

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
                        title={`All ${topicName} ${contentType}s`}
                        tagSlug={topicSlug}
                        contentType={contentType}
                        resultsLayout="grid"
                        titleLink={{
                            text: `All ${contentType}s`,
                            href: contentTypeAggregateSlug,
                        }}
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
    //
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

    const topicName = capitalizeFirstLetter(
        pathComponents[pathComponents.length - 2]
    );

    const contentTypeAggregateSlug = pillCategoryToSlug.get(contentType);

    const data = {
        contentType: contentType,
        tertiaryNavItems: tertiaryNavItems,
        topicName: topicName,
        topicSlug: topicSlug,
        contentTypeSlug: contentTypeSlug,
        contentTypeAggregateSlug: contentTypeAggregateSlug,
        //TODO
        subTopics: [],
    };
    return { props: data };
};
