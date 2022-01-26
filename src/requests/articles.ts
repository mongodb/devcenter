import { gql } from '@apollo/client';

import client from '../utils/apollo-client';
import { Article } from '../interfaces/article';

export const getArticles = async (): Promise<Article[]> => {
    const { data } = await client.query({
        query: gql`
            query Articles {
                articles @rest(type: "Article", path: "/articles") {
                    name
                    description
                    slug
                }
            }
        `,
    });
    return data.articles;
};
