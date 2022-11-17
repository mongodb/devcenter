function Page({ data }) {
    return <h1>{data}</h1>;
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(
        `https://devcenter-backend.devrel.staging.corp.mongodb.com/api/test`
    );
    const data = await res.json();

    // Pass data to the page via props
    return { props: { data } };
}

export default Page;
