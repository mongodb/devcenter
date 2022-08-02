import { getTopicPagePathMappings } from './get-topic-paths';
import allContent from './get-all-content.preval';

const getDynamicPaths = async () => {
    let paths: any[] = [];
    const { topicPaths, topicContentTypePaths } =
        await getTopicPagePathMappings();

    // Topic pages (e.g. /products/mongodb, /languages/python) are pre-built.
    for (const k of Object.keys(topicPaths)) {
        paths = paths.concat({
            params: { slug: topicPaths[k].fullSlug },
        });
    }
    // Topic content pages (e.g. /products/mongodb/quickstarts, /languages/python/code-examples) are pre-built.
    for (const k of Object.keys(topicContentTypePaths)) {
        paths = paths.concat({
            params: { slug: topicContentTypePaths[k].fullSlug },
        });
    }

    for (const content of allContent) {
        paths = paths.concat({
            params: { slug: content.slug.split('/') },
        });
    }

    return paths;
};

export default getDynamicPaths;
