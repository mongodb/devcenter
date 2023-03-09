import type { GetServerSidePropsContext, NextPage } from 'next';
import { Session } from 'next-auth';
import { unstable_getServerSession } from 'next-auth/next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { nextAuthOptions } from '../api/auth/[...nextauth]';
import { getURLPath } from '../../utils/format-url-path';

interface SigninProps {
    session: Session;
}

const SigninPage: NextPage<SigninProps> = ({ session }) => {
    const router = useRouter();
    const { query } = router;
    const { status } = useSession();
    const fromPagePath =
        query.fromPagePath && typeof query.fromPagePath == 'string'
            ? query.fromPagePath
            : '/';

    // The sign in has to be done client-side since next-auth does not
    // support a way to log in server side. This page will "render"
    // the login process and then redirect the client to either the
    // account portal or the previously visited page (if already logged in).
    useEffect(() => {
        // We must scope this to the host url to prevent on open redirect.
        const isSameOrigin =
            new URL(document.baseURI).origin ===
            new URL(fromPagePath, document.baseURI).origin;
        const redirectURL = isSameOrigin ? fromPagePath : '/';

        if (status === 'unauthenticated') {
            const callbackUrl = getURLPath(redirectURL);
            // https://github.com/nextauthjs/next-auth/issues/45
            // Note: next-auth currently has no way of doing a server side signIn()
            signIn('okta', { callbackUrl });
        } else if (status === 'authenticated' || session) {
            // Redirect to prior page if already authenticated.
            router.push(redirectURL);
        }
    }, [fromPagePath, router, session, status]);

    const isLoading = status !== 'authenticated';
    return (
        <div
            style={{
                textAlign: 'center',
                padding: '5%',
            }}
        >
            {isLoading && (
                <Image
                    alt="Loading..."
                    width={116}
                    height={116}
                    src={getURLPath('/loading-animation.gif', false) as string}
                />
            )}
            <div
                style={{
                    fontSize: 'inc20',
                }}
            >
                Signing in...
            </div>
        </div>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await unstable_getServerSession(
        context.req,
        context.res,
        nextAuthOptions
    );
    return { props: { session: JSON.parse(JSON.stringify(session)) } };
}

export default SigninPage;
