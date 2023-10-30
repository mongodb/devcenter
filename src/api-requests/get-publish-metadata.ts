import { fetchAll, getClient } from './contentstack_utils';
import { getAllPublishingMetadataQuery } from '../graphql/publish-metdata';
import { CS_PublishMetadataResponse } from '../interfaces/publish-metadata';

export const getPublishMetadata = async () => {
    const client = getClient('production');
    let publishMetadata: CS_PublishMetadataResponse[] = [];
    publishMetadata = (await fetchAll(
        getAllPublishingMetadataQuery,
        'publish_metadata',
        client
    )) as CS_PublishMetadataResponse[];
    return publishMetadata;
};

export const getPublishMetadataAsMap = async () => {
    const publishMetadata = await getPublishMetadata();
    const metadataMap = new Map<string, string>();
    publishMetadata.forEach(m => {
        const publishTime = m.system.publish_details.time;
        const article = m.articleConnection?.edges[0];
        if (article) {
            metadataMap.set(article.node.calculated_slug, publishTime);
        }
    });
    return metadataMap;
};
