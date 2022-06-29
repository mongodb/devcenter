import allMetaInfo from '../service/get-all-meta-info.preval';

export const getMetaInfoForTopic = async (topicSlug: string) => {
    const metaInfoForTopicName = allMetaInfo.filter(m => m.slug == topicSlug);
    return metaInfoForTopicName.length > 0 ? metaInfoForTopicName[0] : null;
};
