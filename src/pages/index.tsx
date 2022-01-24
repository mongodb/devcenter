import type { NextPage } from 'next';

import { getCountries } from '../requests/graphql/example';
import { Country } from '../interfaces/country';

interface HomeProps {
    countries: Country[];
}

const Home: NextPage<HomeProps> = ({ countries }) => (
    <>
        <h1>MongoDB Developer Center</h1>
        <ul>
            {countries.map(c => (
                <li key={c.code}>
                    {c.name} | {c.code} | {c.emoji}
                </li>
            ))}
        </ul>
    </>
);

export default Home;

export async function getServerSideProps({}) {
    const countries = await getCountries();
    return {
        props: { countries },
    };
}
