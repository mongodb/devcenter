import allMetaInfoPreval from '../service/get-all-meta-info.preval';
import { MetaInfo } from '../interfaces/meta-info';

export const getMetaInfoForTopic = (
    topicSlug: string,
    allMetaInfoResponse?: MetaInfo[]
) => {
    const allMetaInfo = allMetaInfoResponse ?? allMetaInfoPreval;
    const metaInfoForTopicName = allMetaInfo.filter(m => m.slug == topicSlug);
    return metaInfoForTopicName.length > 0 ? metaInfoForTopicName[0] : null;
};
