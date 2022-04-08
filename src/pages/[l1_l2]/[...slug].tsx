import type { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import getL1Content from '../../requests/get-l1-content';
import getTertiaryNavItems from '../../requests/get-tertiary-nav-items';
import { getContentTypesFromContent } from '../../utils/helpers';
import { pillCategoryToSlug, slugToPillCategory } from '../../utils/maps';
import { PillCategorySlug } from '../../types/pill-category';

import { taxonomyData } from '../../data/taxonomy-data';
import { Taxonomy } from '../../interfaces/taxonomy';
import { taxonomyToCategoryMapping } from '../../data/taxonomy-collection-types';
import getTaxonomyData from '../../requests/get-taxonomy-data';

import TopicLandingPage, {
    TopicLandingPageProps,
} from '../../page-templates/topic-landing';

import TopicContentTypePage, {
    TopicContentTypePageProps,
} from '../../page-templates/topic-content-type';

interface TopicProps {
    pageType: 'landing' | 'content-type';
    landingPageProps?: TopicLandingPageProps;
    contentTypePageProps?: TopicContentTypePageProps;
}

const Topic: NextPage<TopicProps> = ({
    pageType,
    landingPageProps,
    contentTypePageProps,
}) => {
    if (pageType === 'landing') {
        if (landingPageProps === undefined) {
            throw Error(
                'Page type was landing, but no landingPageProps were provided'
            );
        }
        return <TopicLandingPage {...landingPageProps} />;
    } else if (pageType === 'content-type') {
        if (contentTypePageProps === undefined) {
            throw Error(
                'Page type was content-type, but no topicContentTypePageProps were provided'
            );
        }
        return <TopicContentTypePage {...contentTypePageProps} />;
    }
    throw Error(`${pageType} is not a valid page type`);
};
export default Topic;

interface IParams extends ParsedUrlQuery {
    l1_l2: string;
    slug: string[];
} // Need this to avoid TS errors.

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: any[] = [];
    taxonomyData.forEach((value: Taxonomy[], key: string) => {
        const category = taxonomyToCategoryMapping[key];
        value.forEach(({ slug }) => {
            const slugList = slug.split('/');
            // Add the landing page for the topic
            const landingPage = {
                params: { l1_l2: category, slug: slugList },
            };
            paths.push(landingPage);
            // We want to have routes for all content types (Articles, Videos, etc.) that are represented in this topic.
            // For example, the landing page for the Atlas topic would be /product/atlas, and the content type page for articles would be /product/atlas/articles.
            const { content } = getL1Content(slug);
            const contentTypes = getContentTypesFromContent(content);
            contentTypes.forEach(contentType => {
                const contentTypeSlug = pillCategoryToSlug.get(contentType);
                if (contentTypeSlug === undefined) {
                    throw Error(
                        `Error mapping content type ${contentType} to slug`
                    );
                }
                paths.push({
                    params: {
                        l1_l2: category,
                        slug: slugList.concat(contentTypeSlug),
                    },
                });
            });
        });
    });
    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as IParams;
    const contentTypeSlugs = Array.from(
        pillCategoryToSlug.values()
    ) as string[];

    // Topic Content Type Pages (eg. /product/atlas/tutorials)
    const lastSlugPiece = slug[slug.length - 1];
    if (contentTypeSlugs.includes(lastSlugPiece)) {
        const topicSlug = slug.slice(0, slug.length - 1).join('/');
        const contentType = slugToPillCategory.get(
            lastSlugPiece as PillCategorySlug
        );
        const { content } = getL1Content(topicSlug);
        const { name, subTopics } = getTaxonomyData(topicSlug);
        const tertiaryNavItems = getTertiaryNavItems(content);

        const contentTypePageProps = {
            contentType,
            tertiaryNavItems,
            topicName: name,
            topicSlug,
            contentTypeSlug: lastSlugPiece as PillCategorySlug,
            subTopics: subTopics?.filter(
                topic => topic.category === contentType
            ),
        };
        return { props: { pageType: 'content-type', contentTypePageProps } };
    }

    // Topic Landing Pages (eg. /product/atlas)
    const slugString = slug.join('/');
    const product = getTaxonomyData(slugString);

    const { content, featured } = getL1Content(slugString);
    const tertiaryNavItems = getTertiaryNavItems(content);

    const variant: 'light' | 'medium' | 'heavy' =
        content.length > 15 ? 'heavy' : content.length > 5 ? 'medium' : 'light';

    const landingPageProps = {
        ...product,
        featured,
        content,
        tertiaryNavItems,
        slug: slugString,
        variant,
    };
    return { props: { pageType: 'landing', landingPageProps } };
};
