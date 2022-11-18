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
    let data = "couldn't make call to kanopy";

    await fetch(`https://devcenter-backend-web-app/api/test`)
        .then(async res => {
            console.log(res);
            data = await res.json();
        })
        .catch(err => console.log(err));

    // if (res.status >= 200 && res.status <= 299) {
    //     data = await res.json();
    // }
    // Pass data to the page via props
    return { props: { data } };
}

export default Page;
