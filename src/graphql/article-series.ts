import { gql } from '@apollo/client';

const articleSeriesFields = gql`
    fragment ArticleSeriesFields on ArticleSeries {
        series_entryConnection {
            edges {
                node {
                    ... on Articles {
                        title
                        calculated_slug
                    }
                }
            }
        }
        title
    }
`;

export const getAllArticleSeriesQuery = gql`
    query get_all_article_series($skip: Int = 0) {
        article_series: all_article_series(skip: $skip) {
            total
            items {
                ...ArticleSeriesFields
            }
        }
    }
    ${articleSeriesFields}
`;
