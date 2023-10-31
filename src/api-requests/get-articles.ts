import { getAllArticlesQuery, getArticleQuery } from '../graphql/articles';
import { CS_ArticleResponse } from '../interfaces/article';
import { fetchAll, getClient } from './contentstack_utils';
import { getPublishingMetadataQuery } from '../graphql/publish-metdata';
import { CS_PublishMetadataResponse } from '../interfaces/publish-metadata';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { getPublishMetadataAsMap } from './get-publish-metadata';

export const CS_getAllArticlesFromCMS = async (): Promise<
    CS_ArticleResponse[]
> => {
    const client = getClient('production');
    const articles = (await fetchAll(
        getAllArticlesQuery,
        'articles',
        client
    )) as CS_ArticleResponse[];
    const publishMetadataMap = await getPublishMetadataAsMap();
    CS_adjustOriginalPublishDateForAllArticles(articles, publishMetadataMap);
    return articles;
};

const CS_adjustOriginalPublishDateForAllArticles = (
    articles: CS_ArticleResponse[],
    publishMetadataMap: Map<string, string>
) => {
    articles.forEach(article => {
        if (article.original_publish_date == null) {
            const original_publish_date = publishMetadataMap.get(
                article.calculated_slug
            );
            if (original_publish_date) {
                article.original_publish_date = original_publish_date;
            }
        }
    });
};

const CS_adjustOriginalPublishDate = async (
    client: ApolloClient<NormalizedCacheObject>,
    calculatedSlug: string,
    articles: CS_ArticleResponse[]
) => {
    const variables = { calculatedSlug };
    const publish_metadata = (await fetchAll(
        getPublishingMetadataQuery,
        'publish_metadata',
        client,
        variables,
        'no-cache'
    )) as CS_PublishMetadataResponse[];
    if (
        publish_metadata.length > 0 &&
        articles.length > 0 &&
        articles[0].original_publish_date == null
    ) {
        articles[0].original_publish_date =
            publish_metadata[0].system.publish_details.time;
    }
};

export const CS_getArticleBySlugFromCMS = async (
    calculatedSlug: string
): Promise<CS_ArticleResponse> => {
    const client = getClient('production');
    const variables = { calculatedSlug };
    const articles = (await fetchAll(
        getArticleQuery,
        'articles',
        client,
        variables
    )) as CS_ArticleResponse[];
    await CS_adjustOriginalPublishDate(client, calculatedSlug, articles);
    return articles[0];
};

export const CS_getDraftArticleBySlugFromCMS = async (
    calculatedSlug: string
): Promise<CS_ArticleResponse | undefined> => {
    const client = getClient('staging');
    const variables = { calculatedSlug };
    const articles = (await fetchAll(
        getArticleQuery,
        'articles',
        client,
        variables,
        'no-cache'
    )) as CS_ArticleResponse[];
    await CS_adjustOriginalPublishDate(client, calculatedSlug, articles);
    return articles[0];
};
