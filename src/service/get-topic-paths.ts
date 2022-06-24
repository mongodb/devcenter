import distinctTags from '../service/get-distinct-tags.preval';
import { getSideNav } from '../service/get-side-nav';
import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { L1L2_TOPIC_PAGE_TYPES } from '../data/constants';

export const getTopicPagePathMappings = async () => {
    const distinctSlugs = distinctTags
        .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
        .map(tag => tag.slug);

    let topicContentTypePaths: any = {};
    let topicPaths: any = {};

    for (const distinctSlug of distinctSlugs) {
        const parsedSlug = distinctSlug.startsWith('/')
            ? distinctSlug.substring(1)
            : distinctSlug;
        const category = parsedSlug.split('/')[0];
        const slug = parsedSlug.split('/').slice(1);
        topicPaths[parsedSlug] = { l1_l2: category, slug: slug };

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

            topicContentTypePaths[parsedItemUrl] = {
                l1_l2: category,
                topic: topic,
                slug: restOfSlug,
            };
        });
    }

    return { topicContentTypePaths, topicPaths };
};
