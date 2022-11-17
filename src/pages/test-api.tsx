import { NextPage } from 'next';

interface PageProps {
    data: string;
}

const Page: NextPage<PageProps> = ({ data }) => {
    return <h1>{data}</h1>;
};

// This gets called on every request
export async function getServerSideProps() {
    //Fetch data from external API
    const res = await fetch(
        `https://devcenter-backend.devrel.staging.corp.mongodb.com/api/test`
    );

    let data = "couldn't make call to kanopy";
    if (res.status >= 200 && res.status <= 299) {
        data = await res.json();
    }
    // Pass data to the page via props
    return { props: { data } };
}

export default Page;
