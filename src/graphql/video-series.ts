import { gql } from '@apollo/client';

const videoSeriesFields = gql`
    fragment VideoSeriesFields on VideoSeries {
        series_entryConnection {
            edges {
                node {
                    ... on Videos {
                        title
                        calculated_slug: slug
                    }
                }
            }
        }
        title
    }
`;

export const getAllVideoSeriesQuery = gql`
    query get_all_video_series($skip: Int = 0) {
        videoSeries: all_video_series(skip: $skip) {
            total
            items {
                ...VideoSeriesFields
            }
        }
    }
    ${videoSeriesFields}
`;
