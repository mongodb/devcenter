import allMetaInfoPreval from '../service/get-all-meta-info.preval';

export const getSubtopics = async (topic: string) => {
    const metaInfoForTopicName = allMetaInfoPreval.filter(
        m => m.tagName.toLowerCase() === topic.toLowerCase()
    );
    return metaInfoForTopicName.length > 0
        ? metaInfoForTopicName[0].topics
        : [];
};
