import { ApolloQueryResult, gql } from '@apollo/client';

import { UnderlyingClient } from '../types/client-factory';
import { l1Products } from '../data/l1-products';
import { languages } from '../data/languages';
import { technologies } from '../data/technologies';

interface Taxonomy {
    name: string;
    description: string;
    primary_cta: string;
    secondary_cta: string;
}

/**
 * Returns a list of items in each taxonomy collection type
 * @param client -  The Apollo REST client that will be used to make the request.
 * @param collectionType - different collection types in taxonomy
 */
const getTaxonomyByCollectionType = async (
    client: UnderlyingClient<'ApolloREST'>,
    collectionType: string
): Promise<Taxonomy> => {
    const query = gql`
        query Taxonomy {
            taxonomy @rest(type: "Taxonomy", path: ${collectionType}) {
                name
                description
                primary_cta
                secondary_cta
            }
        }
    `;
    const { data }: ApolloQueryResult<{ taxonomy: Taxonomy }> =
        await client.query({ query });

    return data.taxonomy;
};

export default getTaxonomyByCollectionType;
