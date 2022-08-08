import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';

interface Props {
    session: any;
}

const Home: NextPage<Props> = props => {
    const { session } = props;
    if (session && session.user) {
        return <>Welcome {session.user.name}!</>;
    }
    return <>Logged Out Home</>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
};
