import { getAllMetaInfo } from './get-all-meta-info';

export const getSubtopics = async (topic: string) => {
    const metaInfo = await getAllMetaInfo();
    const metaInfoForTopicName = metaInfo.filter(
        m => m.tagName.toLowerCase() === topic.toLowerCase()
    );
    return metaInfoForTopicName.length > 0
        ? metaInfoForTopicName[0].topics
        : [];
};
