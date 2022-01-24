import { gql } from '@apollo/client';
import client from '../../utils/apollo-client';

import { Country } from '../../interfaces/country';

export const getCountries = async (): Promise<Country[]> => {
    const { data } = await client.query({
        query: gql`
            query Countries {
                countries(filter: { currency: { eq: "USD" } }) {
                    name
                    code
                    emoji
                }
            }
        `,
    });
    console.log(data);
    return data.countries;
};
