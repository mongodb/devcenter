import { getAllMetaInfo } from './get-all-meta-info';

export const getMetaInfoForTopic = async (topicSlug: string) => {
    const metaInfo = await getAllMetaInfo();
    const metaInfoForTopicName = metaInfo.filter(m => m.slug == topicSlug);
    return metaInfoForTopicName.length > 0 ? metaInfoForTopicName[0] : null;
};
