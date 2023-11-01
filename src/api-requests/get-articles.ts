import { getAllArticlesQuery, getArticleQuery } from '../graphql/articles';
import { CS_ArticleResponse } from '../interfaces/article';
import { fetchAll, getClient } from './contentstack_utils';

export const CS_getAllArticlesFromCMS = async (): Promise<
    CS_ArticleResponse[]
> => {
    const client = getClient('production');
    const articles = (await fetchAll(
        getAllArticlesQuery,
        'articles',
        client
    )) as CS_ArticleResponse[];
    console.log('harika "' + process.env.NEXT_IMAGE_HOSTS + '"');
    return articles;
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

    return articles[0];
};
