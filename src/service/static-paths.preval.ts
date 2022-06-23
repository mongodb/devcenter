import preval from 'next-plugin-preval';
import { getDistinctTags } from '../service/get-distinct-tags';
import { getSideNav } from '../service/get-side-nav';
import { TertiaryNavItem } from '../components/tertiary-nav/types';
import { L1L2_TOPIC_PAGE_TYPES } from '../data/constants';
import { PageType } from '../types/page-type';

async function getData() {
    let pathsMapping: any = {};

    // const conflictingPaths = ['articles', 'code-examples', 'podcasts', 'quickstarts', 'tutorials', 'videos'];
    const distinctTags = await getDistinctTags();

    const distinctSlugs = distinctTags
        .filter(tag => L1L2_TOPIC_PAGE_TYPES.includes(tag.type))
        .map(tag => tag.slug);

    for (const distinctSlug of distinctSlugs) {
        // For routes with [l1_l2]/[...slug].tsx structure.
        const parsedSlug = distinctSlug.startsWith('/')
            ? distinctSlug.substring(1)
            : distinctSlug;

        const category = parsedSlug.split('/')[0];
        const slug = parsedSlug.split('/').slice(1);

        pathsMapping[parsedSlug] = {
            l1_l2: category,
            restOfSlug: slug,
            pageType: PageType.Topic,
        };

        const tertiaryNavItems = await getSideNav(distinctSlug);
        // For routes with [l1_l2]/[topic]/[...slug].tsx structure.
        // Distinct slugs = ["/product/atlas", "product/atlas/search", "language/java"]
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

            pathsMapping[parsedItemUrl] = {
                l1_l2: category,
                topic: topic,
                restOfSlug: restOfSlug,
                pageType: PageType.TopicContentType,
            };
        });
    }

    console.log(pathsMapping);

    return pathsMapping;
}

export default preval(getData());
