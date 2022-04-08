import { useState } from 'react';
import type { NextPage } from 'next';
import {
    SideNav,
    GridLayout,
    Eyebrow,
    TypographyScale,
    Button,
    HorizontalRule,
} from '@mdb/flora';

import { TopicContentTypePageProps } from './types';
import TertiaryNav from '../../components/tertiary-nav';
import { CTAContainerStyles } from '../../components/hero/styles';

import RequestContentModal, {
    requestContentModalStages,
} from '../../components/request-content-modal';

import { TopicCardsContainer } from '../../components/topic-card';

import Search from '../../components/search';

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

const TopicContentTypePage: NextPage<TopicContentTypePageProps> = ({
    contentType,
    tertiaryNavItems,
    topicName,
    topicSlug,
    contentTypeSlug,
    subTopics,
}) => {
    const requestButtonText = `Request ${
        /^[aeiou]/gi.test(contentType) ? 'an' : 'a'
    } ${contentType}`; // Regex to tell if it starts with a vowel.

    const [requestContentModalStage, setRequestContentModalStage] =
        useState<requestContentModalStages>('closed');

    const mainGridDesktopRowsCount = subTopics.length > 0 ? 4 : 3;

    const subTopicsWithHrefs = subTopics.map(
        ({ name, icon, slug, category }) => ({
            name,
            icon,
            href: `/${category}/${slug}/${contentTypeSlug}`,
        })
    );

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
                            topics={subTopicsWithHrefs}
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
                        slug={topicSlug}
                        contentType={contentType}
                        resultsLayout="grid"
                        titleLink={{
                            text: `All ${contentType}s`,
                            href: `/${contentTypeSlug}`,
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
