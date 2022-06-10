import { ContentItem } from '../interfaces/content-item';
import { getAllDraftArticlesFromAPI } from '../api-requests/get-articles';
import { STRAPI_CLIENT } from '../config/api-client';
import { mapArticlesToContentItems } from './get-all-content';
import { Article } from '../interfaces/article';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { RestLink } from 'apollo-link-rest';
import { UnderlyingClient } from '../types/client-factory';

export const getPreviewContent: (
    calculatedSlug: string
) => Promise<ContentItem[]> = async calculatedSlug => {
    const uri = process.env.STRAPI_URL;

    const allArticles = await getAllDraftArticlesFromAPI(
        STRAPI_CLIENT,
        calculatedSlug
    );

    return mapArticlesToContentItems(allArticles, [], []);
};
