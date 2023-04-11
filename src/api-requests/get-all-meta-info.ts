import { ContentTypeUID, MetaInfoResponse } from '../interfaces/meta-info';
import axios from 'axios';

import { CS_GRAPHQL_LIMIT, CS_HEADERS } from '../data/constants';

export const getMetaInfoQuery = (
    contentTypeID: string,
    skip: number
) => `        
    query get_all_${contentTypeID} {
        all_${contentTypeID}(limit: ${CS_GRAPHQL_LIMIT}, skip: ${skip})  {
            total
            items {
                title
                description
                primary_cta
                secondary_cta
                documentation_link
                slug: calculated_slug
                system {
                    content_type_uid
                }
                ${
                    contentTypeID === 'l2_products'
                        ? `l1_productConnection {
                    edges {
                      node {
                        ... on L1Products {
                          title
                        }
                      }
                    }
                  }`
                        : ''
                }
            }
        }
    }
`;

export const getMetaInfoFromCMS = async (
    contentTypeID: ContentTypeUID
): Promise<MetaInfoResponse[]> => {
    const url = `${
        process.env.CS_GRAPHQL_URL
    }?environment=production&query=${getMetaInfoQuery(contentTypeID, 0)}`;

    const { data } = await axios.get(url, { headers: CS_HEADERS });
    const { total, items } = data.data[`all_${contentTypeID}`];

    while (items.length < total) {
        const url = `${
            process.env.CS_GRAPHQL_URL
        }?environment=production&query=${getMetaInfoQuery(
            contentTypeID,
            items.length
        )}`;
        const { data: extraData } = await axios.get(url, {
            headers: CS_HEADERS,
        });
        items.push(...extraData.data[`all_${contentTypeID}`].items);
    }

    return items;
};
