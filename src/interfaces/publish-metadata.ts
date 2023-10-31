interface ArticlesConnection {
    edges: { node: { calculated_slug: string } }[];
}
export interface CS_PublishMetadataResponse {
    articleConnection?: ArticlesConnection;
    system: { publish_details: { time: string } };
}
