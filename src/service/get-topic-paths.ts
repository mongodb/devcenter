import distinctTags from '../service/get-distinct-tags.preval';
import allContentPreval from '../service/get-all-content.preval';

import { getSideNav } from '../service/get-side-nav';
import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { L1L2_TOPIC_PAGE_TYPES } from '../data/constants';

export const getTopicPagePathMappings = async () => {
    const distinctSlugs = distinctTags
        .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
        .map(tag => tag.slug);

    const topicContentTypePaths: any = {};
    const topicPaths: any = {};

    for (const distinctSlug of distinctSlugs) {
        const parsedSlug = distinctSlug.startsWith('/')
            ? distinctSlug.substring(1)
            : distinctSlug;

        const fullSlug = parsedSlug.split('/');
        const category = fullSlug[0];
        const slug = fullSlug.slice(1);
        topicPaths[parsedSlug] = {
            l1_l2: category,
            slug: slug,
            fullSlug: fullSlug,
        };

        const tertiaryNavItems = await getSideNav(
            distinctSlug,
            allContentPreval
        );

        tertiaryNavItems.forEach((item: TertiaryNavItem) => {
            const parsedItemUrl = item.url.startsWith('/')
                ? item.url.substring(1)
                : item.url;

            /*
            eg: tertiary nav item url /product/atlas/article
            /product/atlas/video etc
                */
            const slug = parsedItemUrl.split('/');
            const category = slug[0];
            const topic = slug[1];
            const restOfSlug = slug.slice(2);

            topicContentTypePaths[parsedItemUrl] = {
                l1_l2: category,
                topic: topic,
                slug: restOfSlug,
                fullSlug: slug,
            };
        });
    }

    return { topicContentTypePaths, topicPaths };
};
