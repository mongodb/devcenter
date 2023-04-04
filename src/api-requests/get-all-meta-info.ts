import { ContentTypeUID, MetaInfoResponse } from '../interfaces/meta-info';
import axios from 'axios';

const CS_GRAPHQL_URL = process.env.CS_GRAPHQL_URL;

const headers = {
    access_token: process.env.CS_DELIVERY_TOKEN || '',
    branch: 'prod',
};

const getQuery = (contentTypeID: string, skip: number) => `        {
        all_${contentTypeID}(limit: 100, skip: ${skip})  {
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
                        ? `l1_productsConnection {
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
    const url = `${CS_GRAPHQL_URL}?environment=production&query=${getQuery(
        contentTypeID,
        0
    )}`;

    const { data } = await axios.get(url, { headers });
    const { total, items } = data.data[`all_${contentTypeID}`];

    while (items.length < total) {
        const url = `${CS_GRAPHQL_URL}?environment=production&query=${getQuery(
            contentTypeID,
            items.length
        )}`;
        const { data: extraData } = await axios.get(url, { headers });
        items.push(...extraData.data[`all_${contentTypeID}`].items);
    }

    return items;
};
