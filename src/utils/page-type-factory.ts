import { getTopicPagePathMappings } from '../service/get-topic-paths';
import { PageType } from '../types/page-type';
import { DynamicPageType } from '../types/page-type-factory';

export const pageTypeFactory = async (
    slug: string[]
): Promise<DynamicPageType> => {
    const slugStr = slug.join('/');
    let pageType = null;
    let pageParams = null;

    const { topicPaths, topicContentTypePaths } =
        await getTopicPagePathMappings();

    if (slugStr in topicPaths) {
        pageType = PageType.Topic;
        pageParams = topicPaths[slugStr];
    } else if (slugStr in topicContentTypePaths) {
        pageType = PageType.TopicContentType;
        pageParams = topicContentTypePaths[slugStr];
    } else {
        pageType = PageType.Content;
    }

    const dynamicPageType: DynamicPageType = {
        pageType: pageType,
        pageParams: pageParams,
    };

    return dynamicPageType;
};
