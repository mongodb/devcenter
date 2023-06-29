import { gql } from '@apollo/client';

const podcastSeriesFields = gql`
    fragment PodcastSeriesFields on PodcastSeries {
        series_entryConnection {
            edges {
                node {
                    ... on Podcasts {
                        title
                        calculated_slug: slug
                    }
                }
            }
        }
        title
    }
`;

export const getAllPodcastSeriesQuery = gql`
    query get_all_podcast_series($skip: Int = 0) {
        podcast_series: all_podcast_series(skip: $skip) {
            total
            items {
                ...PodcastSeriesFields
            }
        }
    }
    ${podcastSeriesFields}
`;
