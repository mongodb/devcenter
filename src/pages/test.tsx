import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

interface Props {
    session: any;
}

const Home: NextPage<Props> = props => {
    const { session } = props;

    return <>This is home</>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await getSession(context);
    console.log(session);
    return {
        props: {
            session,
        },
    };
};
