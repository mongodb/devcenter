import allMetaInfoPreval from '../service/get-all-meta-info.preval';
import { MetaInfo } from '../interfaces/meta-info';

export const getMetaInfoForTopic = async (
    topicSlug: string,
    allMetaInfoResponse?: MetaInfo[]
) => {
    let allMetaInfo = allMetaInfoResponse
        ? allMetaInfoResponse
        : allMetaInfoPreval;
    const metaInfoForTopicName = allMetaInfo.filter(m => m.slug == topicSlug);
    return metaInfoForTopicName.length > 0 ? metaInfoForTopicName[0] : null;
};
